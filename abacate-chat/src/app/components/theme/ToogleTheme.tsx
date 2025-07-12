'use client'

import { Suspense } from "react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>}>
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded border border-border hover:bg-accent transition-colors"
    >
      {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
    </button>
    </Suspense>
  )
}
