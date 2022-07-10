import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useApi } from '../../../libs/useApi'
import { Tenant } from '../../../types/Tenant'
import { Header } from '../../components'
import { InputField } from '../../components/InputField'

export default function Login(data: Props) {
  const { tenant, setTenant } = useAppContext()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div className="bg-white px-4 pt-12">
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.primaryColor}
      />
      <InputField
        className={`
          bg-transparent flex-1 outline-none
        `}
        color={data.tenant.primaryColor}
        placeholder="Digite seu emial"
        value={email}
        onChange={setEmail}
      />
      <InputField
        className={`
          bg-transparent flex-1 outline-none
        `}
        color={data.tenant.primaryColor}
        placeholder="Digite seu Password"
        value={password}
        onChange={setPassword}
        password
      />
    </div>
  )
}

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const { tenant: tenantSlug } = constext.query
  const api = useApi()

  const tenant = await api.getTenant(tenantSlug as string)
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      tenant,
    },
  }
}
