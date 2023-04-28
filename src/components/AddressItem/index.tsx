import React from 'react'
import { AddressProps } from '../../../types/Address'
import Icon from '../Icon'

interface AddressItemProps {
  color: string
  address: AddressProps
  onSelect: (address: AddressProps) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  menuOpened: number
  setMenuOpened: (id: number) => void
}

export function AddressItem({
  color,
  address,
  onDelete,
  onEdit,
  onSelect,
  menuOpened,
  setMenuOpened,
}: AddressItemProps) {
  return (
    <div className="flex w-full items-center justify-between rounded p-2 transition-all duration-500">
      <div className={`flex h-12 w-12 items-center justify-center rounded p-2`}>
        <Icon color={color} svg={'location'} size={24} />
      </div>

      <div
        onClick={() => onSelect(address)}
        className={`w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-4`}
      >
        {`${address.street}, ${address.number} - ${address.neighborhood}`}
      </div>
      <div className="cursor-pointer px-3">
        <div
          onClick={() => {
            setMenuOpened(address.id)
          }}
        >
          <Icon color={color} svg={'dots'} size={24} />
        </div>
        {menuOpened === address.id && (
          <div className="popup absolute right-12 flex flex-col gap-4 rounded-sm border-2 bg-white p-5 shadow-lg">
            <div
              onClick={() => onEdit(address.id)} 
              className="flex items-center gap-2">
              <Icon color={color} svg={'edit'} size={24}/>
              <span>Editar</span>
            </div>
            <div
              onClick={() => onDelete(address.id)}
              className="flex items-center gap-2">
              <Icon color={color} svg={'trash'} size={24}/>
              <span>Deletar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
