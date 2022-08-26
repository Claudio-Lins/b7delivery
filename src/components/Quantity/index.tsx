import { ReactNode, useEffect, useState } from 'react'
import { useFormatter } from '../../../libs/useFormatter'

import styles from './styles.module.css'

interface QuantityProps {
  color: string
  count: number
  onUpdateCount: (newCount: number) => void
  min?: number
  max?: number
  small?: boolean
}

export function Quantity({
  color,
  count,
  onUpdateCount,
  min,
  max,
  small
}: QuantityProps) {
  const formatter = useFormatter()
  const [canRemove, setCanRemove] = useState(false)
  const [canAdd, setCanAdd] = useState(false)

  useEffect(() => {
      setCanRemove((!min || (min && count > min)) ? true : false)
      setCanAdd((!max || (max && count < max)) ? true : false)
    
  }, [count, min, max])

  async function handleRemove() {
    if (canRemove) {
      onUpdateCount(count - 1)
    }
  }
  async function handleAdd() {
    if (canAdd) {
      onUpdateCount(count + 1)
    }
  }
  return (
    <div className="flex items-center divide-x-[1px] overflow-hidden rounded-md border">
      <div
        className="text-center text-2xl font-medium leading-10"
        style={{
          color: canRemove ? "#fff" : "#96A3AB",
          backgroundColor: canRemove ? color : '#F2F4F5',
          width: small ? 36 : 40,
          height: small ? 36 : 40,
        }}
        onClick={handleRemove}
      >
        -
      </div>
      <div 
      className="py-2 text-center font-bold leading-8"
      style={{
        fontSize: small ? 16 : 18,
        width: small ? 36 : 40,
        height: small ? 36 : 40,
      }}
      >{formatter.formatQauntity(count, 2)}</div>
      <div
        className="text-center text-2xl font-medium leading-10"
        style={{
          color: canAdd ? "#fff" : "#96A3AB",
          backgroundColor: canAdd ? color : '#F2F4F5',
          width: small ? 36 : 40,
          height: small ? 36 : 40,
        }}
        onClick={handleAdd}
      >
        +
      </div>
    </div>
  )
}
