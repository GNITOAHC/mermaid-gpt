'use client'
import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Topbar() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-gray-800 sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-white">Mermaid GPT</h1>
      <div>
        <Link
          href="https://youtu.be/OBMBfCFALGI"
          target="_blank"
          rel="noreferrer"
          className="gap-1 flex items-center text-white hover:underline"
        >
          IJCAI-2024 Demo Track Link
          <ExternalLinkIcon className="h-4 w-4" />
        </Link>
        <Link
          href="/_IJCAI_24_Demo__Infographics_Generation.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="gap-1 flex items-center text-white hover:underline"
        >
          IJCAI-2024 Demo Paper
        </Link>
      </div>
      <div className="flex items-center justify-end">
        <ModeToggle />
      </div>
    </header>
  )
}
