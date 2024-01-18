'use client'
import React from 'react'
import Script from 'next/script'
import Chat from './Chat'
import MermaidEditor from './MermaidEditor'

type codeContextType = {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}
const codeContextDefault: codeContextType = {
  code: '',
  setCode: () => {},
}
const CodeContext = React.createContext<codeContextType>(codeContextDefault)

export function useCode() {
  return React.useContext(CodeContext)
}

export default function Home() {
  const [code, setCode] = React.useState('')

  return (
    <main className="flex flex-col h-full items-center justify-between p-12">
      <Script
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
         import mermaid from "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs";
         mermaid.initialize({startOnLoad: true});
         mermaid.contentLoaded();`,
        }}
      />

      <div className="flex flex-row w-full gap-3 h-full">
        <CodeContext.Provider value={{ code, setCode }}>
          <Chat className="basis-1/2 h-full relative overflow-scroll" />
          <MermaidEditor className="basis-1/2" />
        </CodeContext.Provider>
      </div>
    </main>
  )
}
