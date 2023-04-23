import React from 'react'
import { X } from 'lucide-react'
import { useAuthContext } from '../../../contexts/auth'
import { Button } from '../Button'
import { Tenant } from '../../../types/Tenant'

interface SidebarProps {
  tenant: Tenant
  onClose: () => void
  open: boolean
}

export function Sidebar({ tenant, open, onClose }: SidebarProps) {
  const { user } = useAuthContext()

  
  return (
    <div className={`
      fixed top-0 bottom-0 right-0 z-10 transition-all duration-500 overflow-hidden bg-white
      ${open ? 'w-full' : 'w-0'}
      `}>
      <div className="relative mt-20 flex h-screen w-full flex-col px-6">
        <div className="flex justify-between">
          <div
            className="ml-6 min-w-[230px] border-b-2 pb-12"
            style={{ borderColor: tenant?.primaryColor }}
          >
            {user && (
              <div className="flex items-center justify-center">
                <strong className="text-lg">{user.name}</strong>
                <span>Último pedido há x semanas</span>
              </div>
            )}
            {!user && (
              <Button
                color={tenant?.primaryColor}
                label="Fazer login"
                onClick={() => console.log('Fazer login')}
                fill
              />
            )}
          </div>
          <div
            onClick={onClose} 
            className="flex h-8 w-8 cursor-pointer">
            <X size={32} color={tenant?.primaryColor} />
          </div>
        </div>
        <div className="mx-6 -mt-[1.5px] border-b-2 border-gray-300" />
        <div className="">Menu</div>
      </div>
    </div>
  )
}
