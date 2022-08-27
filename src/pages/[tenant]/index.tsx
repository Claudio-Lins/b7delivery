import type { GetServerSideProps, NextPage } from 'next'
import { type } from 'os'
import { useEffect, useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import {  useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { Product } from '../../../types/Product'
import { Tenant } from '../../../types/Tenant'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'

const Home = (data: Props) => {

  const { tenant, setTenant } = useAppContext()
  const [products, setProducts] = useState<Product[]>(data.products)

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const handleSearch = (searchValue: string) => {
    console.log(`Busca por ${searchValue}`)
  }

  return (
    <div className="flex flex-col justify-center">
      <header className="bg-[#F9F9FB] px-6 pt-12 pb-8">
        <div className="items-top flex justify-between">
          <div className="">
            <div className="mb-1 text-2xl font-medium text-[#1b1b1b]">
              Seja Bem-vindo(a) 👋
            </div>
            <div className="mb-10 text-base font-normal text-[#BFBABA]">
              O que deseja para hoje?
            </div>
          </div>
          <div className="">
            <IoMdMenu size={30} color={data.tenant.primaryColor} />
          </div>
        </div>
        <div className="">
          <SearchInput onSearch={handleSearch}/>
        </div>
      </header>
      <Banner />
      <div className="m-6 grid grid-cols-2 gap-6">
        {products.map((product, index) => (
          <ProductItem
          key={index}
          data={product}
          />
        ))}
      </div>
    </div>
  )
}

export default Home

type Props = {
  tenant: Tenant
  products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (constext) => {
  const { tenant: tenantSlug } = constext.query
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

  // GET PRODUCTS
  const products = await api.getAllProducts()

  return {
    props: {
      tenant,
      products
    },
  }
}
