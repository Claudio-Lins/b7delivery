
import { createContext, useContext, useState } from 'react'
import { Tenant } from '../types/Tenant'

type appContextType = {
  tenant: Tenant | null
  setTenant: (newTenant: Tenant) => void
}

const defaultValues: appContextType = {
  tenant: null,
  setTenant: () => {},
}

const appContext = createContext<appContextType>(defaultValues)
export const useAppContext = () => useContext(appContext)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  return (
    <appContext.Provider value={{ tenant, setTenant }}>
      {children}
    </appContext.Provider>
  )
}
