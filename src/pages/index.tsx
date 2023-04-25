import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="">
      <header className="flex h-screen w-full flex-col items-center justify-center gap-10">
        <Link
          href={`
          /b7pizza
          `}
          className="w-full max-w-xs rounded-md bg-[#6AB70A] p-4 text-center text-2xl font-bold shadow-sm hover:shadow-none hover:brightness-90"
        >
          B7Pizza
        </Link>
        <Link
          href={`
          /b7burger
          `}
          className="w-full max-w-xs rounded-md bg-[#FB9400] p-4 text-center text-2xl font-bold shadow-sm hover:shadow-none hover:brightness-90"
        >
          B7Burger
        </Link>
      </header>
    </div>
  )
}

export default Home
