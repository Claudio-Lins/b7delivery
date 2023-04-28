import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../contexts/app'
import { useApi } from '../../../../libs/useApi'
import { Tenant } from '../../../../types/Tenant'
import { setCookie } from 'cookies-next'
import { getCookie } from 'cookies-next'
import { User } from '../../../../types/User'
import { useAuthContext } from '../../../../contexts/auth'
import Head from 'next/head'
import { Header } from '../../../components'
import { SelectedProduct } from '../../../components/Cart/SelectedProduct'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'
import { useFormatter } from '../../../../libs/useFormatter'
import { CartItem } from '../../../../types/CartItem'
import { useRouter } from 'next/navigation'
import { CartCookie } from '../../../../types/CartCookie'
import ButtonIcom from '../../../components/ButtonIcom'
import { AddressProps } from '../../../../types/Address'
import { OrderProps } from '../../../../types/Order'

export default function Order(data: Props) {
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant } = useAppContext()
  const [delivered, setDelivered] = useState(false)

  const formatter = useFormatter()
  const route = useRouter()
  const api = useApi(data.tenant.slug)

  // Shipping
  function handleChangeAddress() {
    route.push(`/${data?.tenant.slug}/address`)
  }

  useEffect(() => {
    setTenant(data?.tenant)
    setToken(data?.token)
    data?.user && setUser(data?.user)
  }, [])

  const orderStatusList = {
    preparing: {
      label: 'Preparando',
      longLabel: 'Preparando o seu pedido...',
      bgColor: '#FEFAE6',
      textColor: '#D4BC34',
      progress: 33
    },
    sent: {
      label: 'Enviado',
      longLabel: 'Enviando o seu pedido...',
      bgColor: '#F1F3F8',
      textColor: '#758CBD',
      progress: 70
    },
    delivered: {
      label: 'Entregue',
      longLabel: 'Seu pedido foi entregue',
      bgColor: '#F1F8F6',
      textColor: '#6Ab709',
      progress: 100
    }
  }
// setTimeou 3 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      if(orderStatusList[data.order.status].progress === 100)
        setDelivered(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col justify-center px-6 pb-12">
      <Head>
        <title>
          Pedido #{data.order.id} | {data?.tenant.name}
        </title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}`}
        color={`${data?.tenant.primaryColor}`}
        title={`Pedido #${data.order.id}`}
      />
      {!delivered && (<>
      <div
        className="flex flex-col gap-2 rounded bg-orange-200 p-6"
        style={{ backgroundColor: data?.tenant.secondaryColor }}
      >
        <strong 
          style={{
            color: orderStatusList[data.order.status].textColor
          }}
        >
        {orderStatusList[data.order.status].label}
        </strong>
        <div className="w-full h-2 bg-zinc-400 rounded-full">
          <div className={`
          h-2 bg-red-500 rounded-full
          `}
          style={{ 
            width: `${orderStatusList[data.order.status].progress}%`,
            backgroundColor: orderStatusList[data.order.status].textColor
          }}
          />
        </div>
        <span 
        style={{
          color: orderStatusList[data.order.status].textColor
        }}
        className="text-xs">
          {orderStatusList[data.order.status].longLabel}
        </span>
      </div>
      </>)}

      <div className="mt-4 flex items-center justify-between border-t border-b p-6">
        <div className="flex items-center gap-4">
          <span 
            className="font-semibold text-xs py-1 px-4 rounded-full"
            style={{ 
              backgroundColor: orderStatusList[data.order.status].bgColor,
              color: orderStatusList[data.order.status].textColor
            }} 
            >
            {orderStatusList[data.order.status].label}
          </span>
          <span>
            {data.order.products.length} ite
            {data.order.products.length >= 2 ? 'ns' : 'm'}
          </span>
        </div>
        <span className="font-light text-zinc-500">
          {formatter.formatDate(data.order.orderDate)}
        </span>
      </div>
      <div className="">
        {data.order.products.map((cartItem, i) => (
          <SelectedProduct
            key={i}
            color={data.tenant.primaryColor}
            quantity={cartItem.quantity}
            product={cartItem.product}
            onChange={() => {}}
          />
        ))}
      </div>

      <div className="flex flex-col gap-6 pb-10 pt-6">
        <div className="endereco flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">Endereço</span>
          <ButtonIcom
            color={data.tenant.primaryColor}
            label={'Ok'}
            leftIcon={'location'}
            rightIcon={'rightArrow'}
            value={`
              ${data.order.shippingAddress.street}, ${data.order.shippingAddress.number} ${data.order.shippingAddress.neighborhood}
            `}
            onClick={() => {}}
            className={'cursor-none'}
          />
        </div>
        <div className="pagament flex flex-col">
          <span className="mb-2 font-semibold text-zinc-500">
            Tipos de pagamentos
          </span>
          <div className="flex items-center justify-between gap-2">
            <ButtonIcom
              fill={data.order.paymentType === 'money'}
              color={data.tenant.primaryColor}
              leftIcon={'money'}
              value={'Dinheiro'}
              onClick={() => {}}
              className={'cursor-none'}
            />
            <ButtonIcom
              color={data.tenant.primaryColor}
              leftIcon={'card'}
              value={'Cartão'}
              fill={data.order.paymentType === 'card'}
              onClick={() => {}}
              className={'cursor-none'}
            />
          </div>
        </div>
        {data.order.paymentType === 'money' && (
          <div className="troco flex flex-col">
            <span className="mb-2 font-semibold text-zinc-500">Troco</span>
            <InputField
              placeholder="Troco para"
              color={data.tenant.primaryColor}
              value={data.order.paymentChange?.toString() ?? ''}
              onChange={() => {}}
              className={'flex-1 bg-transparent outline-none'}
            />
          </div>
        )}
        {data.order.cupom && (
          <div className="cupom flex flex-col">
            <span className="mb-2 font-semibold text-zinc-500">
              Cupom de desconto
            </span>
            <ButtonIcom
              color={data.tenant.primaryColor}
              leftIcon={'cupom'}
              rightIcon={'checked'}
              value={data.order.cupom.toUpperCase()}
              className={'cursor-none'}
            />
          </div>
        )}
      </div>

      <div className="resume mt-4 flex flex-col gap-6 rounded-md bg-zinc-100 p-6">
        <div className="flex items-center justify-between">
          <span className=" text-zinc-900">Subtotal</span>
          <span className=" font-semibold text-zinc-900">
            {formatter.formatPrice(data.order.subtotal)}
          </span>
        </div>
        {data.order?.cupomDiscount && (
          <div className="flex items-center justify-between">
            <span className=" text-zinc-900">Desconto</span>
            <span className=" font-semibold text-zinc-900">
              - {formatter.formatPrice(data.order.cupomDiscount)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className=" text-zinc-900">Frete</span>
          <span className=" font-semibold text-zinc-900">
            {data.order.shippingPrice > 0
              ? formatter.formatPrice(data.order.shippingPrice)
              : '--'}
          </span>
        </div>
        <div className="border border-dashed" />
        <div className="flex items-center justify-between">
          <span className=" text-zinc-900">Total</span>
          <span
            className="text-2xl font-semibold"
            style={{ color: data.tenant.primaryColor }}
          >
            {formatter.formatPrice(data.order.total)}
          </span>
        </div>
      </div>
    </div>
  )
}

type Props = {
  tenant: Tenant
  token: string
  user: User | null
  order: OrderProps
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, orderId } = context.query
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

  // GET ORDER
  const order = await api.getOrder(parseInt(orderId as string))

  return {
    props: {
      tenant: JSON.parse(JSON.stringify(tenant)),
      user: JSON.parse(JSON.stringify(user)),
      token,
      order,
    },
  }
}
