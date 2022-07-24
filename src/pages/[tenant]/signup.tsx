import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useApi } from '../../../libs/useApi'
import { Tenant } from '../../../types/Tenant'
import { Header } from '../../components'
import { Button } from '../../components/Button'
import { InputField } from '../../components/InputField'
import styles from '../../../styles/Signup.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Signup(data: Props) {
  const { tenant, setTenant } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {}
  async function handleSignUp() {
    router.push(`/${data.tenant.slug}/signup`)
  }

  return (
    <div className="bg-white px-6 py-12">
      <Head>
        <title>Cadastro | {data.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data.tenant.slug}/login`}
        color={data.tenant.primaryColor}
      />

      <div
        className={`
        mt-5 mb-10 text-center text-4xl font-bold
      ${styles.header}
      `}
      >
        {data.tenant.name}
      </div>

      <div
        className={`
      relative mx-auto w-56 border-b-[1.5px] pb-10 text-center text-lg font-normal leading-[21px] text-[#bbb]
      ${styles.subtitle}
    `}
        style={{
          borderBottomColor: `${data.tenant.primaryColor}`,
        }}
      >
        Preencha os campos para criar seu cadastro.
      </div>
      <div
        className={`
       -mt-[1.5px] border-t-[1.5px]
      ${styles.line}
    `}
      />

      <div
        className={`
          mt-14
        ${styles.formArea}
    `}
      >
        <div
          className={`
          
        ${styles.inputArea}
    `}
        >
          <InputField
            className={`
          flex-1 bg-transparent outline-none
        `}
            color={data.tenant.primaryColor}
            placeholder="Digite seu nome"
            value={name}
            onChange={setName}
          />
        </div>
        <div
          className={`
          
        ${styles.inputArea}
    `}
        >
          <InputField
            className={`
          flex-1 bg-transparent outline-none
        `}
            color={data.tenant.primaryColor}
            placeholder="Digite seu emial"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div
          className={`
          
        ${styles.inputArea}
    `}
        >
          <InputField
            className={`
          flex-1 bg-transparent outline-none
        `}
            color={data.tenant.primaryColor}
            placeholder="Digite seu Password"
            value={password}
            onChange={setPassword}
            password
          />
        </div>
        <div
          className={`
          
        ${styles.inputArea}
    `}
        >
          <Button
            color={data.tenant.primaryColor}
            label="Cadastrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
      <div
        className={`
          relative mx-auto w-fit text-center
        ${styles.forgetArea}
    `}
        style={{
          borderBottomColor: `${data.tenant.primaryColor}`,
        }}
      >
        Já tem cadastro?
        <Link href={`/${data.tenant.slug}/login`}>
          <a
            className="ml-2 font-semibold"
            style={{
              color: data.tenant.primaryColor,
            }}
          >
            Fazer login
          </a>
        </Link>
      </div>
    </div>
  )
}

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const { tenant: tenantSlug } = constext.query
  const api = useApi()

  const tenant = api.getTenant(tenantSlug as string)
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
