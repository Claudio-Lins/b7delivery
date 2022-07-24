import MailSent from './MailSent.svg'
import React from 'react';


interface IconProps {
  icon: string
  color: string
  width: number
  height: number
}

export default function Icon ({ icon, color, width, height }: IconProps) {
  return (
    <div style={{ width, height }}>
      {icon === 'mailSent' && <MailSent color={color} />}
    </div>
  )
}

