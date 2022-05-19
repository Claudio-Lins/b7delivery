import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im'

interface SearchInputProps {
  mainColor: string
  onSearch: (searchValue: string) => void
}

export function SearchInput({ mainColor, onSearch }: SearchInputProps) {
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
      ${focused ? `border border-[${mainColor}]` : 'border border-white'}
    `}
    >
      <button
        onClick={() => onSearch(searchValue)}
        className="mr-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#F9F9FB]"
      >
        <ImSearch size={20} color="#FB9400" />
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
