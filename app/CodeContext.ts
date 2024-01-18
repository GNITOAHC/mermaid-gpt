import React from 'react'

type codeContextType = {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}
const codeContextDefault: codeContextType = {
  code: '',
  setCode: () => {},
}
const CodeContext = React.createContext<codeContextType>(codeContextDefault)

function useCode() {
  return React.useContext(CodeContext)
}

export { CodeContext, useCode }
