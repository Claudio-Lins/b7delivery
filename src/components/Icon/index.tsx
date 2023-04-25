import React from 'react'
import { CurrencyCircleDollar, MapPin, CreditCard, Ticket,  Envelope, CaretRight, CheckCircle  } from 'phosphor-react'

interface IconProps {
  color: string
  widht?: number
  height?: number
  size?: number
  svg: string
}

export default function Icon({color, height, svg, widht, size}: IconProps) {
  return (
    <div>
      {svg === 'card' && <CreditCard color={color} size={size} />}
      {svg === 'checked' && <CheckCircle color={color} size={size} weight='bold' />}
      {svg === 'cupom' && <Ticket color={color} size={size} />}
      {svg === 'location' && <MapPin color={color} size={size} />}
      {svg === 'mailSent' && <Envelope color={color} size={size} />}
      {svg === 'money' && <CurrencyCircleDollar color={color} size={size} />}
      {svg === 'rightArrow' && <CaretRight color={color} size={size} />}
    </div>
  )
}
