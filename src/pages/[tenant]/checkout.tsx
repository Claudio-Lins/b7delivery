import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { Tenant } from '../../../types/Tenant'
import { setCookie } from 'cookies-next'
import { getCookie } from 'cookies-next'
import { User } from '../../../types/User'
import { useAuthContext } from '../../../contexts/auth'
import Head from 'next/head'
import { Header } from '../../components'
import { SelectedProduct } from '../../components/Cart/SelectedProduct'
import { InputField } from '../../components/InputField'
import { Button } from '../../components/Button'
import { useFormatter } from '../../../libs/useFormatter'
import { CartItem } from '../../../types/CartItem'
import { useRouter } from 'next/navigation'
import { CartCookie } from '../../../types/CartCookie'
import ButtonIcom from '../../components/ButtonIcom'
import { AddressProps } from '../../../types/Address'

export default function Checkout(data: Props) {
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant } = useAppContext()

  const formatter = useFormatter()
  const route = useRouter()

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart)
  function handleCartChange(newCount: number, id: number) {
    const tmpCart: CartItem[] = [...cart]
    const cartIndex = tmpCart.findIndex((item) => item.product.id === id)
    if (newCount > 0) {
      tmpCart[cartIndex].quantity = newCount
    } else {
      delete tmpCart[cartIndex]
    }
    let newCart: CartItem[] = tmpCart.filter((item) => item)
    setCart(newCart)

    // update Cookie
    let cartCookie: CartCookie[] = []
    for (let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        quantity: newCart[i].quantity,
      })
    }
    setCookie('cart', JSON.stringify(cartCookie))
    console.log(cartIndex)
  }

  // Shipping
  const [shippingPrice, setShippingPrice] = useState(0)
  const [shippingAddress, setShippingAddress] = useState<AddressProps>()
  function handleChangeAddress() {
    // route.push(`/${data?.tenant.slug}/address`)
    setShippingAddress({
      id: 1,
      street: 'Estrada de Me Martins',
      number: '168A',
      complement: 'Casa',
      neigborhood: 'Mem Martins',
      city: 'Sintra',
      state: 'Lisboa',
      zipCode: '2725-000',
    })
    setShippingPrice(5.69)
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
        <title>Checkout | {data?.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}`}
        color={`${data?.tenant.primaryColor}`}
        title="Checkout"
      />
      <div className="flex flex-col gap-6 border-t pb-10 pt-6">
        <div className="endereco flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">Endereço</span>
          <ButtonIcom
            color={data.tenant.primaryColor}
            label={'Ok'}
            leftIcon={'location'}
            rightIcon={'rightArrow'}
            value={
              shippingAddress
                ? `${shippingAddress.street}, ${shippingAddress.number} ${shippingAddress.neigborhood}`
                : 'Escolha um endereço'
            }
            onClick={handleChangeAddress}
          />
        </div>
        <div className="pagament flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">
            Tipos de pagamentos
          </span>
          <div className="flex items-center justify-between gap-2">
            <ButtonIcom
              fill
              color={data.tenant.primaryColor}
              leftIcon={'money'}
              value={'Dinheiro'}
              onClick={handleChangeAddress}
            />
            <ButtonIcom
              color={data.tenant.primaryColor}
              leftIcon={'card'}
              value={'Cartão'}
              onClick={handleChangeAddress}
            />
          </div>
        </div>
        <div className="troco flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">Troco</span>
          <InputField
            placeholder="Troco para"
            color={data.tenant.primaryColor}
            onChange={() => {}}
            value="50,00 €"
            className={'flex-1 bg-transparent outline-none'}
          />
        </div>
        <div className="cupom flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">
            Cupom de desconto
          </span>
          <ButtonIcom
            color={data.tenant.primaryColor}
            leftIcon={'cupom'}
            rightIcon={'checked'}
            value={'BURGER10'}
            onClick={handleChangeAddress}
          />
        </div>
      </div>
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
            onChange={handleCartChange}
          />
        ))}
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
          label={'Finalizar pedido'}
          onClick={handleFinish}
          disabled={!shippingAddress}
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
