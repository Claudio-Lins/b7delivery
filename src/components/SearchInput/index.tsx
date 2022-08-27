import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im'
import { useAppContext } from '../../../contexts/app'

interface SearchInputProps {
  onSearch: (searchValue: string) => void
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const { tenant }  = useAppContext()
  const [focused, setFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onSearch(searchValue)
    }
  }

  return (
    <div
      className={`
      flex rounded-md bg-white p-2
      ${focused ? `border border-[${tenant?.primaryColor}]` : 'border border-white'}
    `}
    >
      <button
        onClick={() => onSearch(searchValue)}
        className="mr-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#F9F9FB]"
      >
        <ImSearch size={20} color={tenant?.primaryColor} />
      </button>
      <input
        className="flex-1 border-0 bg-transparent outline-none"
        type="text"
        placeholder="Digite o produto"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}
