'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'

interface Props {
  children: React.ReactNode
}

const Provider = (props: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      themes={['light', 'dark']}
    >
      {props.children}
    </ThemeProvider>
  )
}

export default Provider
