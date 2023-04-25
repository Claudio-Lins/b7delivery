import { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'

type Props = {
  color: string
  placeholder?: string
  value: string
  onChange: (newValue: string) => void
  password?: boolean
  className?: string
}

export function InputField({
  color,
  placeholder,
  value,
  onChange,
  password,
  className,
}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div
      className="flex h-14 w-full items-center justify-start rounded border-2 bg-[#F9F9FB] px-4"
      style={{
        borderColor: focused ? color : '#F9F9FB',
        backgroundColor: focused ? '#FFF' : '#F9F9FB',
      }}
    >
      <input
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {password && (
        <div className="" onClick={toggleShowPassword}>
          {showPassword && <Eye size={24} color="#CCC" />}
          {!showPassword && <EyeSlash size={24} color="#BBB" />}
        </div>
      )}
    </div>
  )
}
