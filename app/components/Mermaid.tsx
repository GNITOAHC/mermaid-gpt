import React, { useEffect } from 'react'
import mermaid from 'mermaid'

export default function Mermaid({
  text,
  mermaidId,
  theme,
}: {
  text: string
  mermaidId: string
  theme: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  let mermaidTheme = 'default'

  switch (theme) {
    case 'dark':
      mermaidTheme = 'dark'
  }

  useEffect(() => {
    mermaid.mermaidAPI.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: mermaidTheme,
      logLevel: 5,
    })
    setMounted(true)
  })

  useEffect(() => {
    if (!mounted) return
    const render = async () => {
      if (!ref.current) return
      if (text === '') return

      const parseResult = await mermaid.mermaidAPI.parse(text).catch((_) => {
        return
      })
      if (!parseResult) return

      const { svg } = await mermaid.mermaidAPI.render(
        `preview${mermaidId}`,
        text
      )
      // console.log(svg)
      // const { svg } = await mermaid.mermaidAPI.render('preview', text)
      ref.current.innerHTML = svg
    }
    render()
  }, [text, mounted])

  return <div key={`preview${mermaidId}`} ref={ref} />
}
