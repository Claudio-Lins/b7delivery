import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useApi } from '../../../libs/useApi'
import styles from '../../../styles/Forget.module.css'
import { Tenant } from '../../../types/Tenant'
import { Header } from '../../components'
import { Button } from '../../components/Button'
import { InputField } from '../../components/InputField'

export default function Forget(data: Props) {
  const { tenant, setTenant } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const [email, setEmail] = useState('')

  async function handleSubmit() {
    router.push(`/${data.tenant.slug}/forget-success`)
  }

  return (
    <div className="bg-white px-6 py-12">
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
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
      relative mx-auto w-fit mb-6 text-center text-2xl font-bold
      ${styles.title}
    `}
        style={{
          borderBottomColor: `${data.tenant.primaryColor}`,
        }}
      >
        Esqueceu sua senha?
      </div>
      <div
        className={`
      relative mx-auto w-[85%] border-b-[1.5px] pb-10 text-center text-lg font-normal leading-[21px] text-[#bbb]
      ${styles.subtitle}
    `}
        style={{
          borderBottomColor: `${data.tenant.primaryColor}`,
        }}
      >
        Preencha o campo com seu email e recebaas instruções necessárias para
        redefinir a sua senha.
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
          <Button
            color={data.tenant.primaryColor}
            label="Enviar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
    </div>
  )
}

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const { tenant: tenantSlug } = constext.query
  const api = useApi(tenantSlug as string)

  const tenant = await api.getTenant()
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
