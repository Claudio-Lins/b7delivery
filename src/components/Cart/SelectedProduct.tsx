import Image from 'next/image'
import React, { useState } from 'react'
import { Quantity } from '../Quantity'
import { useFormatter } from '../../../libs/useFormatter'
import { Product } from '../../../types/Product'

interface SelectedProductProps {
  color: string
  product: Product
  quantity: number
  editabled?: boolean
  onChange: (newCount: number, id: number) => void
}

export function SelectedProduct({
  color,
  product,
  quantity,
  onChange,
  editabled,
}: SelectedProductProps) {
  const [qtCount, setQtCount] = useState(1)
  const formatter = useFormatter()

  function handleUpdateQt(newCount: number) {
    setQtCount(newCount)
  }

  function handleCartChange() {}

  return (
    <div className="flex items-center justify-between border-b px-2 py-4">
      <div className="flex items-center gap-2">
        <Image src={product.image} alt="Golden Burger" width={80} height={80} />
        <div className="flex flex-col">
          <span className="text-[10px] font-light text-zinc-500">
            {product.category}
          </span>
          <span className="font-medium">{product.name}</span>
          <span className="font-semibold" style={{ color: color }}>
            {formatter.formatPrice(product.price)}
          </span>
        </div>
      </div>
      {editabled ? (
      <Quantity
        color={color}
        count={quantity}
        onUpdateCount={(newCount: number) => onChange(newCount, product.id)}
        min={0}
        // max={11}
        small
      />
      ): (
        <div className="text-center flex flex-col">
          <div className="text-xs text-orange-500">Qnt.</div>
          <div className="font-semibold p-2 rounded w-12 border" style={{ color: color }}>
            {quantity < 9 ? `0${quantity}` : quantity }
          </div>
        </div>
      )}
    </div>
  )
}
