import React from 'react'
import { Product } from '../../../types/Product'
import Link from 'next/link'

type ProductItemProps = {
  data: Product
  mainColor: string
  secondaryColor: string
}

export function ProductItem({
  data,
  mainColor,
  secondaryColor,
}: ProductItemProps) {
  return (
    <Link href={`/b7burger/products/${data.id}`}>
    <a className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className={`h-[90px] w-full`} style={{backgroundColor: secondaryColor}}></div>
      <div className="p-4">
        <div className="flex w-full justify-center">
          <img className="-mt-20" src={data.image} alt="burger" />
        </div>
        <div className="mt-2 text-[8px] font-medium">{data.category}</div>
        <div className="text-lg font-bold">{data.name}</div>
        <div
          className={`text-base font-semibold`} style={{color: mainColor}}
        >
          {data.price}
        </div>
      </div>
    </a>
    </Link>
  )
}
