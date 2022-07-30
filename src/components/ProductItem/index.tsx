import React from 'react'
import { Product } from '../../../types/Product'
import Link from 'next/link'
import { useAppContext } from '../../../contexts/AppContext'
import { useFormatter } from '../../../libs/useFormatter'

type ProductItemProps = {
  data: Product
}

export function ProductItem({ data }: ProductItemProps) {
  const { tenant } = useAppContext()
  const formatter = useFormatter()
  return (
    <Link href={`/${tenant?.slug}/product/${data.id}`}>
      <a className="overflow-hidden rounded-lg bg-white shadow-md">
        <div
          className={`h-[90px] w-full`}
          style={{ backgroundColor: tenant?.secondaryColor }}
        ></div>
        <div className="flex flex-col justify-between p-4">
          <div className="flex w-full justify-center">
            <img className="-mt-20" src={data.image} alt="burger" />
          </div>
          <span className="mt-2 text-[8px] font-medium">{data.category}</span>
          <div className="flex h-16 flex-col justify-between">
            <div className="text-lg font-bold leading-tight">{data.name}</div>
            <div
              className={`text-base font-semibold`}
              style={{ color: tenant?.primaryColor }}
            >
              {formatter.formatPrice(data.price)}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
