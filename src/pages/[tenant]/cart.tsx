import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { Tenant } from '../../../types/Tenant'
import {setCookie} from 'cookies-next'
import { getCookie } from 'cookies-next'
import { User } from '../../../types/User'
import { useAuthContext } from '../../../contexts/auth'
import Head from 'next/head'
import { Header } from '../../components'
import { SelectedProduct } from '../../components/Cart/SelectedProduct'
import { InputField } from '../../components/InputField'
import { Button } from '../../components/Button'
import { useFormatter } from '../../../libs/useFormatter'
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/navigation'
import { CartCookie } from '../../../types/CartCookie'

export default function Cart(data: Props) {
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant } = useAppContext()

  const formatter = useFormatter()
  const route = useRouter()

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart)
  function handleCartChange(newCount: number, id: number) {
    const tmpCart: CartItem[] = [...cart]
    const cartIndex = tmpCart.findIndex(item => item.product.id === id)
    if (newCount > 0) {
      tmpCart[cartIndex].quantity = newCount
    } else {
      delete tmpCart[cartIndex]
    }
    let newCart: CartItem[] = tmpCart.filter(item => item)
    setCart(newCart)

    // update Cookie
    let cartCookie: CartCookie[] = []
    for (let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        quantity: newCart[i].quantity
      })
    }
    setCookie('cart', JSON.stringify(cartCookie))
    console.log(cartIndex);
  }

  // Shipping
  const [shippingInput, setShippingInput] = useState('')
  const [shippingPrice, setShippingPrice] = useState(0)
  const [shippingTime, setShippingTime] = useState(0)
  const [shippingAddress, setShippingAddress] = useState('')

  function handleShippingCalc() {
    setShippingAddress('Estrada de Me Martins, 168A - Sintra')
    setShippingPrice(9.5)
    setShippingTime(23)
  }

  // Resume
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let newSubTotal = 0
    for (let item of cart) {
      newSubTotal += item.product.price * item.quantity
    }
    setSubTotal(newSubTotal)
  }, [cart])

  function handleFinish() {
    route.push(`
      /${data?.tenant.slug}/checkout
    `)
  }

  //

  useEffect(() => {
    setTenant(data?.tenant)
    setToken(data?.token)
    data?.user && setUser(data?.user)
  }, [])

 

  return (
    <div className="flex flex-col justify-center px-6 py-12">
      <Head>
        <title>Sacola | {data?.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}`}
        color={`${data?.tenant.primaryColor}`}
        title="Sacola"
      />
      <div className="mt-4 border-t border-b p-6">
        <span>
          {cart.length} ite{cart.length >= 2 ? 'ns' : 'm'}
        </span>
      </div>
      <div className="">
        {cart.map((cartItem, i) => (
          <SelectedProduct
            key={i}
            color={data.tenant.primaryColor}
            quantity={cartItem.quantity}
            product={cartItem.product}
            onChange={handleCartChange}         />
        ))}
      </div>
      <div className="frete mt-6">
        <span className="font-semibold text-zinc-500">
          Calcular frete e prazo
        </span>
        <div className="form mt-2 flex items-center gap-2">
          <InputField
            placeholder="CEP"
            color={data.tenant.primaryColor}
            value={shippingInput}
            onChange={(newValue) => setShippingInput(newValue)}
            className={'flex-1 bg-transparent outline-none'}
          />
          <Button
            color={data.tenant.primaryColor}
            label={'Ok'}
            onClick={handleShippingCalc}
          />
        </div>
        {shippingTime > 0 && (
          <>
            <div className="shipping-info mt-4 rounded-md bg-zinc-100 p-6">
              <span className="text-xs text-zinc-500">{shippingAddress}</span>
              <div className="mt-2 flex items-center justify-between">
                <span className=" text-zinc-900">
                  Prazo de entrega {shippingTime} minutos
                </span>
                <span
                  className=" font-bold"
                  style={{ color: data.tenant.primaryColor }}
                >
                  {formatter.formatPrice(shippingPrice)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="resume mt-4 flex flex-col gap-6 rounded-md bg-zinc-100 p-6">
        <div className="flex items-center justify-between">
          <span className=" text-zinc-900">Subtotal</span>
          <span className=" font-semibold text-zinc-900">
            {formatter.formatPrice(subTotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className=" text-zinc-900">Frete</span>
          <span className=" font-semibold text-zinc-900">
            {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
          </span>
        </div>
        <div className="border border-dashed" />
        <div className="flex items-center justify-between">
          <span className=" text-zinc-900">Total</span>
          <span
            className="text-2xl font-semibold"
            style={{ color: data.tenant.primaryColor }}
          >
            {formatter.formatPrice(shippingPrice + subTotal)}
          </span>
        </div>
        <Button
          fill
          color={data.tenant.primaryColor}
          label={'Continuar'}
          onClick={handleFinish}
        />
      </div>
    </div>
  )
}

type Props = {
  tenant: Tenant
  token: string
  user: User | null
  cart: CartItem[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string)

  // GET TENANT
  const tenant = await api.getTenant()
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // GET LOGGED USER
  const token = getCookie('token', context)
  const user = await api.authorizeToken(token as string)
  console.log({ user })

  // GET CART
  const cartCookie = getCookie('cart', context)
  const cart = await api.getCartProduct(cartCookie as string)

  return {
    props: {
      tenant: JSON.parse(JSON.stringify(tenant)),
      user: JSON.parse(JSON.stringify(user)),
      cart,
      token,
    },
  }
}
