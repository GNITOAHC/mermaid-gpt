'use client'
import * as React from 'react'
// import { useAPI } from './providers/APIProvider'
import { useTheme } from 'next-themes'
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

// function ApiForm() {
//   const { api, setAPI } = useAPI()
//   const [val, setVal] = React.useState<string>('')
//
//   const handleSubmit = (e: string) => {
//     setAPI(e)
//   }
//
//   return (
//     <div className="p-5">
//       <p>Your API key: </p>
//       <div className="flex flex-row">
//         <input
//           type="text"
//           placeholder={api == '' ? 'Enter your API key' : api}
//           className="bg-accent w-96"
//           onChange={(e) => setVal(e.target.value)}
//         />
//         <Button onClick={() => handleSubmit(val)}>Confirm</Button>
//       </div>
//     </div>
//   )
// }

export default function Topbar() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-gray-800 sticky top-0">
      {/*
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>API key settings</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-max">
                <ApiForm />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      */}
      <h1 className="text-2xl font-bold text-white">Mermaid GPT</h1>
      <div className="flex items-center justify-end">
        <ModeToggle />
      </div>
    </header>
  )
}
