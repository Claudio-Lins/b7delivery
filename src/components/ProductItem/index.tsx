import React from 'react'

export function ProductItem() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="h-[90px] w-full bg-yellow-100"></div>
      <div className="p-4">
        <div className="mx-auto w-full">
          <img className="-mt-20" src="/productItem/burger.png" alt="burger" />
        </div>
        <div className="text-[8px] font-medium mt-2">Tadicional</div>
        <div className="text-lg font-bold">Texas Burger</div>
        <div className="text-base font-semibold text-[#FB9400]">€ 25,50</div>
      </div>
    </div>
  )
}
