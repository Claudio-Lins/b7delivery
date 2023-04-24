import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { Product } from '../../../types/Product'
import { Tenant } from '../../../types/Tenant'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { Sidebar } from '../../components/Sidebar'
import { getCookie } from 'cookies-next'
import { User } from '../../../types/User'
import { useAuthContext } from '../../../contexts/auth'

const Home = (data: Props) => {
  const { setToken, setUser } = useAuthContext()
  const { tenant, setTenant } = useAppContext()
  const [products, setProducts] = useState<Product[]>(data.products)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredProducts, setFilteredProducst] = useState<Product[]>([])

  useEffect(() => {
    setTenant(data?.tenant)
    setToken(data?.token)
    data?.user && setUser(data?.user)
  }, [])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
  }

  useEffect(() => {
    let newFilteredProducts: Product[] = []
    for (let product of data.products) {
      if (product?.name.toLowerCase().includes(searchText.toLowerCase())) {
        newFilteredProducts.push(product)
      }
    }
    setFilteredProducst(newFilteredProducts)
  }, [searchText])

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
          <div className="cursor-pointer">
            <IoMdMenu
              onClick={() => setSidebarOpen(true)}
              size={30}
              color={data?.tenant.primaryColor}
            />
          </div>
          <Sidebar
            tenant={data?.tenant}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
        <div className="p-6">
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      {!searchText && (
        <>
          <Banner />
          <div className="m-6 grid grid-cols-2 gap-6">
            {products.map((product, index) => (
              <ProductItem key={index} data={product} />
            ))}
          </div>
        </>
      )}
      {searchText && (
        <>
          <div className="p-6">
            <strong>Procurando: {searchText}</strong>
          </div>
          {filteredProducts.length > 0 && (
            <>
              <div className="m-6 grid grid-cols-2 gap-6">
                {filteredProducts?.map((product, index) => (
                  <ProductItem key={index} data={product} />
                ))}
              </div>
            </>
          )}
          {filteredProducts.length === 0 && (
            <div className="w-full flex flex-col justify-center items-center"> 
              <span className='text-[220px]'>🍽️</span>
              <div className="text-2xl font-medium text-zinc-500">
                Nenhum produto encontrado
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home

type Props = {
  tenant: Tenant
  products: Product[]
  token: string
  user: User | null
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
  console.log({ user })

  // GET PRODUCTS
  const products = await api.getAllProducts()

  return {
    props: {
      tenant,
      products,
      user,
      token,
    },
  }
}
