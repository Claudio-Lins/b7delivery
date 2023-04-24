import React from 'react'
import { Utensils, ShoppingBag, Heart, ClipboardList, Settings, LogOut } from 'lucide-react'

interface MenuItemProps {
  icon: 'bag' | 'favorito' | 'list' | 'menu' | 'settings' | 'sair'
  color?: string
  label?: string
  onClick?: () => void
  disabled?: boolean
}

export function MenuItem({ color, icon, label, onClick, disabled }:MenuItemProps) {
  return (
    <div 
      className='flex items-center space-x-4 cursor-pointer py-6'
      onClick={onClick}
    >
      {icon === "bag" && <ShoppingBag color={color}/>}
      {icon === "favorito" && <Heart color={color}/>}
      {icon === "list" && <ClipboardList color={color}/>}
      {icon === "menu" && <Utensils color={color}/>}
      {icon === "settings" && <Settings color={color}/>}
      {icon === "sair" && <LogOut color={color}/>}
      <span className={`
      text-zinc-500
        ${disabled ? 'line-through cursor-not-allowed' : ''}
      `} >{label}</span>
    </div>
  )
}
