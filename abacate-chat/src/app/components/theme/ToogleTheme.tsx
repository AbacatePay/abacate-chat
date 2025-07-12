'use client'


import { useTheme } from "./theme-provider"

export function ToogleTheme() {
  const { theme, toggleTheme } = useTheme()

  return (
   
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded border border-border hover:bg-accent transition-colors"
    >
      {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
    </button>
    
  )
}
