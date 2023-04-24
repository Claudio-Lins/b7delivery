import React from 'react'
import { X } from 'lucide-react'
import { useAuthContext } from '../../../contexts/auth'
import { Button } from '../Button'
import { Tenant } from '../../../types/Tenant'
import { MenuItem } from './MenuItem'
import { useRouter } from 'next/router'

interface SidebarProps {
  tenant: Tenant
  onClose: () => void
  open: boolean
}

export function Sidebar({ tenant, open, onClose }: SidebarProps) {
  const { user, setToken } = useAuthContext()
  const router = useRouter()

  return (
    <div
      className={`
      fixed top-0 bottom-0 right-0 z-10 overflow-hidden bg-white transition-all duration-500
      ${open ? 'w-full' : 'w-0'}
      `}
    >
      <div className="mt-20 flex h-screen w-full flex-col px-6">
        <div className="flex justify-between">
          <div
            className="relative ml-6 min-w-[230px] border-b-2 pb-12 "
            style={{ borderColor: tenant?.primaryColor }}
          >
            {user && (
              <div className="flex flex-col items-start justify-center">
                <strong className="text-4xl">{`user.name`}</strong>
                <span className="mt-2 text-xs text-zinc-400">
                  Último pedido há x semanas
                </span>
              </div>
            )}
            {!user && (
              <Button
                color={tenant?.primaryColor}
                label="Fazer login"
                onClick={() => router.push(`/${tenant.slug}/login`)}
                fill
              />
            )}
          </div>
          <div onClick={onClose} className="flex h-8 w-8 cursor-pointer">
            <X size={32} color={tenant?.primaryColor} />
          </div>
        </div>
        <div className="-mt-[1px] w-full border-b border-gray-300" />
        <div className="flex flex-col p-6">
          <MenuItem
            color="#575454ce"
            label="Cardápio"
            icon="menu"
            onClick={onClose}
          />
          <MenuItem
            color="#575454ce"
            label="Sacola"
            icon="bag"
            onClick={() => router.push(`/${tenant.slug}/cart`)}
          />
          <MenuItem
            color="#575454ce"
            label="Favotiros"
            icon="favorito"
            disabled
          />
          <MenuItem
            color="#575454ce"
            label="Meus pedidos"
            icon="list"
            onClick={() => router.push(`/${tenant.slug}/orders`)}
          />
          <MenuItem
            color="#575454ce"
            label="Configurações"
            icon="settings"
            disabled
          />
        </div>
        <div className="flex p-6">
          {user && (
            <MenuItem
              color="#575454ce"
              label="Sair"
              icon="sair"
              onClick={() => {
                setToken('')
                onClose()
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
