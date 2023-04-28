import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../contexts/app'
import { useApi } from '../../../../libs/useApi'
import { Tenant } from '../../../../types/Tenant'
import { getCookie } from 'cookies-next'
import { User } from '../../../../types/User'
import { useAuthContext } from '../../../../contexts/auth'
import Head from 'next/head'
import { Header } from '../../../components'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'
import { useFormatter } from '../../../../libs/useFormatter'
import { useRouter } from 'next/navigation'
import { AddressProps } from '../../../../types/Address'
import { AddressItem } from '../../../components/AddressItem'

export default function EditAddress(data: Props) {
  const [address, setAddress] = useState<AddressProps>(data.address)

  const [errorFields, setErrorFields] = useState<string[]>([])
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant, setShippingAddress, setShippingPrice } =
    useAppContext()

  const formatter = useFormatter()
  const route = useRouter()
  const api = useApi(data.tenant.slug)

  function verifyAddress() {
    let newErrorFields = []
    let approved = true

    if (address.zipCode.replace(/[^0-9]/g, '').length !== 7) {
      newErrorFields.push('addressZip')
      approved = false
    }
    if (address.street.length <= 2) {
      newErrorFields.push('addressStreet')
      approved = false
    }
    if (address.neighborhood.length <= 2) {
      newErrorFields.push('addressNeighborhood')
      approved = false
    }
    if (address.city.length <= 2) {
      newErrorFields.push('addressCity')
      approved = false
    }
    if (address.state.length <= 1) {
      newErrorFields.push('addressState')
      approved = false
    }
    setErrorFields(newErrorFields)
    return approved
  }

  useEffect(() => {
    setTenant(data?.tenant)
    setToken(data?.token)
    data?.user && setUser(data?.user)
  }, [])

  function changeAddressField(
    field: keyof AddressProps,
    value: typeof address[keyof AddressProps]
  ) {
    setAddress({
      ...address,
      [field]: value,
    })
  }

  async function handleSaveAddress() {
    if (verifyAddress()) {
      await api.editUserAddress(address)
      route.push(`/${data?.tenant.slug}/address`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 pb-12">
      <Head>
        <title>Editar Endereço | {data?.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}/checkout`}
        color={`${data?.tenant.primaryColor}`}
        title="Editar Endereço"
      />
      <div className="flex w-full flex-1 flex-col justify-between gap-6">
        <div className="mt-6">
          <div className="">
            <span className="mb-2 text-zinc-500">Código postal</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="00000-000"
              value={address.zipCode}
              onChange={(value) =>
                setAddress({
                  ...address,
                  zipCode: value,
                })
              }
              warning={errorFields.includes('addressZip')}
            />
          </div>
          <div className="mt-6 flex w-full items-center justify-between gap-6">
            <div className="w-2/3">
              <span className="mb-2 text-zinc-500">Rua</span>
              <InputField
                className={'w-full bg-transparent outline-none'}
                color={data.tenant.primaryColor}
                placeholder="Rua tal"
                value={address.street}
                onChange={(value) => changeAddressField('street', value)}
                warning={errorFields.includes('addressStreet')}
              />
            </div>
            <div className="w-1/3">
              <span className="mb-2 text-zinc-500">Número</span>
              <InputField
                className={'w-full bg-transparent outline-none'}
                color={data.tenant.primaryColor}
                placeholder="123"
                value={address.number}
                onChange={(value) => changeAddressField('number', value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Bairro</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="Bairro"
              value={address.neighborhood}
              onChange={(value) => changeAddressField('neighborhood', value)}
              warning={errorFields.includes('addressNeighborhood')}
            />
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Concelho</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="Sintra"
              value={address.city}
              onChange={(value) => changeAddressField('city', value)}
              warning={errorFields.includes('addressCity')}
            />
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Distrito</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="LX"
              value={address.state}
              onChange={(value) => changeAddressField('state', value)}
              warning={errorFields.includes('addressState')}
            />
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Complemento</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="Casa A"
              value={address.complement ?? ''}
              onChange={(value) => changeAddressField('complement', value)}
            />
          </div>
        </div>
        <Button
          color={`${data?.tenant.primaryColor}`}
          onClick={handleSaveAddress}
          label="Atualizar"
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
  address: AddressProps
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, addressId } = context.query
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
        destination: `/login`,
        permanent: false,
      },
    }
  }

  // GET ADDRESS BY ID
  const address = await api.getUserAddressById(parseInt(addressId as string))
  if (!address) {
    return {
      redirect: {
        destination: '/address',
        permanent: false,
      },
    }
  }

  return {
    props: {
      tenant: JSON.parse(JSON.stringify(tenant)),
      user: JSON.parse(JSON.stringify(user)),
      token,
      address,
    },
  }
}
