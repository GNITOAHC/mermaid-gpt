import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'

import ThemeProvider from './components/providers/ThemeProvider'
import APIProvider from './components/providers/APIProvider'

import Topbar from './components/Topbar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mermaid GPT',
  description: 'Built on top of OpenAI & NextJs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen relative">
        <APIProvider>
          <ThemeProvider>
            <Topbar />
            <div className="h-[calc(100%-64px)]">{children}</div>
          </ThemeProvider>
        </APIProvider>
      </body>
    </html>
  )
}
