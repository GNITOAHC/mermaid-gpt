import React from 'react'
import Mermaid from './components/Mermaid'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import { useCode } from './CodeContext'

export default function MermaidEditor({ className }: { className?: string }) {
  const [input, setInput] = React.useState('')
  const { theme } = useTheme()
  const { code, setCode } = useCode()

  React.useEffect(() => {
    if (code != '') {
      setInput(code)
      setCode('')
    }
  }, [code])

  return (
    <main className={className}>
      <div className="flex flex-col">
        <Mermaid
          text={input}
          mermaidId="mermaid-editor"
          theme={theme ?? 'default'}
        />
        <Textarea
          className="w-full h-64"
          value={input}
          placeholder="Type mermaid code here..."
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </main>
  )
}
