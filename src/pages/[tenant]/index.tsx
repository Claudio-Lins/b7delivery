import type { NextPage } from 'next'
import { IoMdMenu } from 'react-icons/io'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'

const Home: NextPage = () => {
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
            <IoMdMenu size={30} color="#FB9400" />
          </div>
        </div>
        <div className="">
          <SearchInput onSearch={handleSearch} mainColor="#FB9400" />
        </div>
      </header>
      <Banner />
      <div className="m-6 grid grid-cols-2 gap-6">
        <ProductItem
          data={{
            id: 1,
            image: '/productItem/burger.png',
            category: 'Tradicional',
            name: 'Texas Burger',
            price: '€15,00',
          }}
          mainColor={'#FB9400'}
          secondaryColor={'#fff9f2'}
        />
        <ProductItem
          data={{
            id: 2,
            image: '/productItem/burger.png',
            category: 'Especial',
            name: 'Tamandaré Burger',
            price: '€55,00',
          }}
          mainColor={'#FB9400'}
          secondaryColor={'#fff9f2'}
        />
      </div>
    </div>
  )
}

export default Home
