/* eslint-disable react-hooks/exhaustive-deps */
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
import { useRouter } from 'next/router'
import ButtonIcom from '../../components/ButtonIcom'
import Link from 'next/link'

export default function Checkout(data: Props) {
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant, shippingAddress, shippingPrice } = useAppContext()

  const formatter = useFormatter()
  const route = useRouter()
  const api = useApi(data.tenant.slug)

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart)

  // Shipping
  function handleChangeAddress() {
    route.push(`/${data?.tenant.slug}/my-addresses`)
  }

  // Resume
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    let newSubTotal = 0
    for (let item in cart) {
      newSubTotal += cart[item].product.price * cart[item].quantity
    }
    setSubTotal(newSubTotal)
  }, [cart])

  // Payment
  const [paymentType, setPaymentType] = useState('money')
  const [paymentChange, setPaymentChange] = useState(0)
  function handleChangePayment() {
    paymentType === 'money' ? setPaymentType('card') : setPaymentType('money')
  }

  //CUPOM
  const [cupom, setCupom] = useState('')
  const [cupomDiscount, setCupomDiscount] = useState(0)
  const [cupomInput, setCupomInput] = useState('')
  function handleSetCupom() {
    setCupom(cupomInput)
    setCupomDiscount(5)
  }

  useEffect(() => {
    setTenant(data?.tenant)
    setToken(data?.token)
    data?.user && setUser(data?.user)
  }, [])

  async function handleFinish() {
    if(shippingAddress){
      const order = await api.createOrder(
        shippingAddress,
        paymentType,
        paymentChange,
        cupom,
        data.cart
      )
      if(order){
        setCookie('cart', '', { expires: new Date(0) })
        route.push(`/${data?.tenant.slug}/order/${order.id}`)
      } else {
        alert('Erro ao finalizar o pedido')
      }
    }
  }

  return (
    <div className="flex flex-col justify-center px-6 pb-12">
      <Head>
        <title>Checkout | {data?.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}`}
        color={`${data?.tenant.primaryColor}`}
        title="Checkout"
      />
      <div className="flex flex-col gap-6 pb-10 pt-6">
        <div className="endereco flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">Endereço</span>
         
          <ButtonIcom
            color={data.tenant.primaryColor}
            label={'Ok'}
            leftIcon={'location'}
            rightIcon={'rightArrow'}
            value={
              shippingAddress
                ? `${shippingAddress.street}, ${shippingAddress.number} ${shippingAddress.neighborhood}`
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
              fill={paymentType === 'money'}
              color={data.tenant.primaryColor}
              leftIcon={'money'}
              value={'Dinheiro'}
              onClick={handleChangePayment}
            />
            <ButtonIcom
              fill={paymentType === 'card'}
              color={data.tenant.primaryColor}
              leftIcon={'card'}
              value={'Cartão'}
              onClick={handleChangePayment}
            />
          </div>
        </div>
        {paymentType === 'money' && (
          <div className="troco flex flex-col">
            <span className="mb-2 font-semibold text-zinc-500">Troco</span>
            <InputField
              placeholder="Troco para"
              color={data.tenant.primaryColor}
              onChange={(newValue) => setPaymentChange(Number(newValue))}
              value={paymentChange ? paymentChange.toString() : ''}
              className={'flex-1 bg-transparent outline-none'}
            />
          </div>
        )}
        <div className="cupom flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">
            Cupom de desconto
          </span>
          {cupom && (
            <ButtonIcom
              color={data.tenant.primaryColor}
              leftIcon={'cupom'}
              rightIcon={'checked'}
              value={cupom.toUpperCase()}
            />
          )}
          {!cupom && (
            <div className="flex items-center justify-between gap-2">
              <InputField
                placeholder="Cupom"
                color={data.tenant.primaryColor}
                value={cupomInput}
                onChange={(newValue) => setCupomInput(newValue)}
                className={'flex-1 bg-transparent outline-none'}
              />
              <Button
                color={data.tenant.primaryColor}
                label={'Aplicar'}
                onClick={handleSetCupom}
              />
            </div>
          )}
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
            onChange={() => {}}
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
        {cupomDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className=" text-zinc-900">Desconto</span>
            <span className=" font-semibold text-zinc-900">
              - {formatter.formatPrice(cupomDiscount)}
            </span>
          </div>
        )}
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
            {formatter.formatPrice(shippingPrice + subTotal - cupomDiscount)}
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
