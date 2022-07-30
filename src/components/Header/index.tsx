import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'

import styles from './styles.module.css'

type Props = {
  backHref: string
  color: string
  title?: string
  subtitle?: string
  invert?: boolean
}

export function Header({ backHref, color, title, subtitle, invert }: Props) {
  return (
    <div className="flex h-12">
      <div className="flex h-12 items-center justify-center">
        <Link href={backHref}>
          <a
            className={`
              p-2
              ${invert ? 'rounded-md bg-black bg-opacity-10 hover:shadow-md' : ''}
            `}>
            <ArrowLeft size={28} color={invert ? '#FFF' : color} />
          </a>
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        {title && (
          <div
            className="text-2xl font-semibold text-[#1b1b1b]"
            style={{ color: invert ? '#FFF' : '#000' }}
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div className="text-[13px] font-normal text-[#6A7D8B]">
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex h-12 items-center justify-center"></div>
    </div>
  )
}
