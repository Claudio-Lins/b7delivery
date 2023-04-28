/* eslint-disable react-hooks/exhaustive-deps */
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

export default function NewAddress(data: Props) {
  const [addressZip, setAddressZip] = useState<string>('')
  const [addressStreet, setAddressStreet] = useState<string>('')
  const [addressNumber, setAddressNumber] = useState<string>('')
  const [addressNeighborhood, setAddressNeighborhood] = useState<string>('')
  const [addressCity, setAddressCity] = useState<string>('')
  const [addressState, setAddressState] = useState<string>('')
  const [addressComplement, setAddressComplement] = useState<string>('')
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

    if (addressZip.replace(/[^0-9]/g, '').length !== 7) {
      newErrorFields.push('addressZip')
      approved = false
    }
    if (addressStreet.length <= 2) {
      newErrorFields.push('addressStreet')
      approved = false
    }
    if (addressNeighborhood.length <= 2) {
      newErrorFields.push('addressNeighborhood')
      approved = false
    }
    if (addressCity.length <= 2) {
      newErrorFields.push('addressCity')
      approved = false
    }
    if (addressState.length <= 1) {
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

  async function handleNewAddress() {
    if (verifyAddress()) {
      const address: AddressProps = {
        id: 10,
        zipCode: addressZip,
        street: addressStreet,
        number: addressNumber,
        neighborhood: addressNeighborhood,
        city: addressCity,
        state: addressState,
        complement: addressComplement,
      }
      let newAddress = await api.addUserAddress(address)
      if (newAddress.id > 0) {
        route.push(`/${data?.tenant.slug}/address`)
      } else {
        alert('Erro ao cadastrar endereço')
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 pb-12">
      <Head>
        <title>Novo Endereço | {data?.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data?.tenant.slug}/checkout`}
        color={`${data?.tenant.primaryColor}`}
        title="Novo Endereço"
      />
      <div className="flex w-full flex-1 flex-col justify-between gap-6">
        <div className="mt-6">
          <div className="">
            <span className="mb-2 text-zinc-500">Código postal</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="00000-000"
              value={addressZip}
              onChange={(value) => setAddressZip(value)}
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
                value={addressStreet}
                onChange={(value) => setAddressStreet(value)}
                warning={errorFields.includes('addressStreet')}
              />
            </div>
            <div className="w-1/3">
              <span className="mb-2 text-zinc-500">Número</span>
              <InputField
                className={'w-full bg-transparent outline-none'}
                color={data.tenant.primaryColor}
                placeholder="123"
                value={addressNumber}
                onChange={(value) => setAddressNumber(value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Bairro</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="Bairro"
              value={addressNeighborhood}
              onChange={(value) => setAddressNeighborhood(value)}
              warning={errorFields.includes('addressNeighborhood')}
            />
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Concelho</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="Sintra"
              value={addressCity}
              onChange={(value) => setAddressCity(value)}
              warning={errorFields.includes('addressCity')}
            />
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Distrito</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="LX"
              value={addressState}
              onChange={(value) => setAddressState(value)}
              warning={errorFields.includes('addressState')}
            />
          </div>
          <div className="mt-6">
            <span className="mb-2 text-zinc-500">Complemento</span>
            <InputField
              className={'flex-1 bg-transparent outline-none'}
              color={data.tenant.primaryColor}
              placeholder="Casa A"
              value={addressComplement}
              onChange={(value) => setAddressComplement(value)}
            />
          </div>
        </div>
        <Button
          color={`${data?.tenant.primaryColor}`}
          onClick={handleNewAddress}
          label="Adicionar"
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
        destination: `/login`,
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
      token,
      addresses,
    },
  }
}
