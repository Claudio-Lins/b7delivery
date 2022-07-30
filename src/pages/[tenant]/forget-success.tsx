import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { EnvelopeOpen } from 'phosphor-react'

import { useEffect } from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useApi } from '../../../libs/useApi'
import styles from '../../../styles/ForgetSuccess.module.css'
import { Tenant } from '../../../types/Tenant'
import { Header } from '../../components'
import { Button } from '../../components/Button'

export default function ForgetSuccess(data: Props) {
  const { tenant, setTenant } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  async function handleSubmit() {
    router.push(`/${data.tenant.slug}/login`)
  }

  return (
    <div className="bg-white px-6 py-12">
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>
      <Header
        backHref={`/${data.tenant.slug}/forget`}
        color={data.tenant.primaryColor}
      />

      <div
        className={`
      mt-24  flex justify-center
      ${styles.iconArea}
    `}
      >
        <EnvelopeOpen
          size={120}
          color={data.tenant.primaryColor}
          weight="fill"
        />
      </div>

      <div
        className={`
      relative mx-auto mb-6 w-fit text-center text-3xl font-semibold
      ${styles.title}
    `}
        style={{
          borderBottomColor: `${data.tenant.primaryColor}`,
        }}
      >
        Verifique seu email!
      </div>
      <div
        className={`
      relative mx-auto w-[85%] text-center text-lg font-normal leading-[21px] text-[#bbb]
      ${styles.subtitle}
    `}
        style={{
          borderBottomColor: `${data.tenant.primaryColor}`,
        }}
      >
        Enviamos as instruções para recuperação de senha para o seu e-mail.
      </div>

      <div
        className={`
          mt-8
        ${styles.formArea}
    `}
      >
        <div
          className={`
          
        ${styles.inputArea}
    `}
        >
          <Button
            color={data.tenant.primaryColor}
            label="Fazer login"
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
