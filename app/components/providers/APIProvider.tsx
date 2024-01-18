'use client'
import React from 'react'

type API = {
  api: string
  setAPI: React.Dispatch<React.SetStateAction<string>>
}

const defaultAPI: API = { api: '', setAPI: () => {} }

const APIContext = React.createContext<API>(defaultAPI)

export function useAPI() {
  return React.useContext(APIContext)
}

export default function APIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [api, setAPI] = React.useState<string>('')
  return (
    <APIContext.Provider value={{ api, setAPI }}>
      {children}
    </APIContext.Provider>
  )
}
