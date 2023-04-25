import React from 'react'
import Icon from '../Icon'

interface ButtonIcomProps {
  color: string
  leftIcon?: string
  rightIcon?: string
  value: string
  onClick: () => void
  fill?: boolean
  label?: string
}

export default function ButtonIcom({
  color,
  label,
  onClick,
  value,
  fill,
  leftIcon,
  rightIcon,
}: ButtonIcomProps) {
  return (
    <div
      className="flex items-center justify-between p-2 rounded cursor-pointer w-full transition-all duration-500"
      style={{ backgroundColor: fill ? color : '#f9f9fb' }}
      onClick={onClick}
    >
      {leftIcon && (
        <div
          className={`
          p-2 w-12 h-12 rounded flex justify-center items-center
          ${fill ? 'bg-zinc-50/10' : 'bg-white/80'}
        `}
        >
          <Icon color={fill ? '#ffffff' : color} svg={leftIcon} size={24} />
        </div>
      )}
      <div
        className={`
          px-4 whitespace-nowrap overflow-hidden text-ellipsis w-full
          ${fill ? 'text-zinc-50' : '#1b1b1b'}
        `}
      >
        {value}
      </div>
      <div className="px-3">
        {rightIcon && (
          <div className="">
            <Icon color={fill ? '#ffffff' : color} svg={rightIcon} size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
