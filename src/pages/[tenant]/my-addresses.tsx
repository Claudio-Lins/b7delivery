/* eslint-disable react-hooks/exhaustive-deps */

import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { Tenant } from '../../../types/Tenant'
import { getCookie } from 'cookies-next'
import { User } from '../../../types/User'
import { useAuthContext } from '../../../contexts/auth'
import Head from 'next/head'
import { Header } from '../../components'
import { Button } from '../../components/Button'
import { useRouter } from 'next/navigation'
import { AddressProps } from '../../../types/Address'
import { AddressItem } from '../../components/AddressItem'

export default function MyAddresses(data: Props) {
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext()

  const route = useRouter()
  const api = useApi(data.tenant.slug)

  useEffect(() => {
    setTenant(data?.tenant)
    setToken(data?.token)
    data?.user && setUser(data?.user)
  }, [])

  async function handleAddressSelect(address: AddressProps) {
    const price = await api.getShippingPrice(address)
    if (price) {
      setShippingAddress(address)
      setShippingPrice(price)
      route.push(`/${data?.tenant.slug}/checkout`)
    }
  }

  function handleAddressEdit(id: number) {
    route.push(`/${data?.tenant.slug}/address/${id}`)
  }

  async function hamdleAddressDelete(id: number) {
    await api.deleteUserAddress(id)
    route.refresh()
  }

  function handleNewAddress() {
    route.push(`/${data?.tenant.slug}/address/new`)
  }


  // Menu Events
  const [menuOpened, setMenuOpened] = useState(0)
  function handleMenuevent(event: MouseEvent) {
    const tagName = (event.target as HTMLElement).tagName
    if (tagName !== 'svg' && tagName !== 'popup') {
      setMenuOpened(0)
    }
  }

  useEffect(() => {
    window.removeEventListener('click', handleMenuevent)
    window.addEventListener('click', handleMenuevent)
    return () => {
      window.removeEventListener('click', handleMenuevent)
    }
  }, [menuOpened])

  return (
    <div className="flex h-screen flex-col justify-center px-6 pb-12">
      <Head>
        <title>Endereços | {data?.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}/checkout`}
        color={`${data?.tenant.primaryColor}`}
        title="Endereços"
      />
      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="">
          {data?.addresses?.map((address) => (
            <div
              key={address.id}
              className="flex w-full flex-col justify-between border-b py-6"
            >
              <AddressItem
                color={data.tenant.primaryColor}
                address={address}
                onSelect={handleAddressSelect}
                onEdit={handleAddressEdit}
                onDelete={hamdleAddressDelete}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
              />
            </div>
          ))}
        </div>
        <Button
          color={`${data?.tenant.primaryColor}`}
          onClick={handleNewAddress}
          label="Novo endereço"
          fill
        />
      </div>
    </div>
  )
}

type Props = {
  tenant: Tenant
  token: string
  user: User | null
  addresses: AddressProps[]
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
  if (!user) {
    return {
      redirect: {
        destination: `/${tenantSlug}/login`,
        permanent: false,
      },
    }
  }

  // GET ADDRESS
  const addresses = await api.getUserAddress(user.email)

  return {
    props: {
      tenant: JSON.parse(JSON.stringify(tenant)),
      user: JSON.parse(JSON.stringify(user)),
      token: token ?? null,
      addresses,
    },
  }
}
