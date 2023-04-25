interface ButtonProps {
  color: string
  label: string
  onClick?: () => void
  fill?: boolean
  disabled?: boolean
  className?: string
}

export function Button({
  color,
  label,
  onClick,
  fill,
  disabled,
  className,
}: ButtonProps) {
  return (
    <div
      className={`
        flex
        h-14 cursor-pointer items-center justify-center rounded border-2 px-4 font-semibold
        ${className}
        `}
      onClick={!disabled ? onClick : () => {}}
      style={{
        color: fill ? '#FFF' : color,
        borderColor: color,
        backgroundColor: fill ? color : 'transparent',
        opacity: disabled ? .4 : 1
      }}
    >
      {label}
    </div>
  )
}
