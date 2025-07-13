'use client'


import { Suspense } from "react"
import { useTheme } from "./theme-provider"
import { MoonIcon, SunIcon } from "lucide-react"

export function ToogleTheme() {
  const { theme, toggleTheme } = useTheme()

  return (
   <Suspense>
    <div className="flex justify-end w-full mt-1 mr-6">
    <button 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      className="p-2 rounded hover:bg-accent transition-colors cursor-pointer"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
    </div>
    </Suspense>
  )
}
