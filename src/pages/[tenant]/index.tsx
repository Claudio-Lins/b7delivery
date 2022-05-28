import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { IoMdMenu } from 'react-icons/io'
import { Banner } from '../../Banner'
import { SearchInput } from '../../components/SearchInput'

const Home: NextPage = () => {

  const handleSearch = (searchValue: string) => {
    console.log(`Busca por ${searchValue}`)
  }

  return (
    <div className="">
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
          <SearchInput 
            onSearch={handleSearch}
             mainColor="#FB9400" />
        </div>
      </header>
      <Banner />
    </div>

  )
}

export default Home
