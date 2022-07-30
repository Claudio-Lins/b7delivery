import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../contexts/AppContext'
import { useApi } from '../../../../libs/useApi'
import { useFormatter } from '../../../../libs/useFormatter'
import { Product } from '../../../../types/Product'
import { Tenant } from '../../../../types/Tenant'
import { Header } from '../../../components'
import { Button } from '../../../components/Button'
import { Quantity } from '../../../components/Quantity'
import handler from '../../api/hello'
import styles from './styles.module.css'

const Product = (data: Props) => {
  const [qtCount, setQtCount] = useState(1)
  const { tenant, setTenant } = useAppContext()
  const formatter = useFormatter()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  async function handleAddToCart() {}
  async function handleUpdateQt(newCount: number) {
    setQtCount(newCount)
  }


  return (
    <div className=" bg-white">
      <Head>
        <title>
          {data.product.name} | {data.tenant.name}
        </title>
      </Head>
      <div
        className={`
       absolute left-6 top-16 right-6
    ${styles.headerArea}
    `}
      >
        <Header
          color={data.tenant.primaryColor}
          backHref={`/${data.tenant.slug}`}
          title="Produto"
          invert
        />
      </div>
      <div
        className={`
        top-0 h-96 w-full bg-bg-efeito bg-no-repeat text-center
      ${styles.headerBg}
      `}
        style={{ backgroundColor: data.tenant.primaryColor }}
      ></div>
      <div
        className={`
        -mt-60 flex justify-center
      ${styles.productImg}
      `}
      >
        <Image
          src={data.product.image}
          alt={data.product.name}
          width={300}
          height={282}
        />
      </div>
      <div className="mx-6">
        <div
          className={`
        mt-3 font-medium text-[#1b1b1b]
      ${styles.category}
      `}
        >
          {data.product.category}
        </div>
        <div
          className={`
        relative w-fit border-b-[1.5px] pb-6 text-[40px] font-bold leading-[48px]
        `}
          style={{ borderColor: data.tenant.primaryColor }}
        >
          {data.product.name}
        </div>
        <div
          className={`
       -mt-[1.5px] border-t-[1.5px] border-[#e2e2e2]
      ${styles.line}
    `}
        />
        <div
          className={`
        my-6 font-normal leading-[24px] text-gray-500
        `}
        >
          {data.product.description}
        </div>
        <div className={`mb-2 text-[#1b1b1b]`}>Quantidade</div>
        <div className="flex items-center justify-between">
          <div className="">
            <Quantity 
              color={data.tenant.primaryColor}
              count={qtCount}
              onUpdateCount={handleUpdateQt}
              min={1}
              // max={11}
              // small
            />
          </div>
          <div
            className="flex-1 text-right text-4xl font-semibold tracking-tighter"
            style={{ color: data.tenant.primaryColor }}
          >
            {formatter.formatPrice(data.product.price)}
          </div>
        </div>
        <div className=" my-12">
          <Button
            color={data.tenant.primaryColor}
            label="Adicionar à sacola"
            onClick={handleAddToCart}
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default Product

type Props = {
  tenant: Tenant
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const { tenant: tenantSlug, id } = constext.query
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

  // GET PRODUCTS
  const product = await api.getProduct(id as string)

  return {
    props: {
      tenant,
      product,
    },
  }
}
