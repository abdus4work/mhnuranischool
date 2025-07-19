
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect } from 'react'

import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'

import { useTheme } from '../../store/useThemeStore.js'

export const ThemeToggle = ({className}) => {
  const { theme, toggleTheme, initTheme } = useTheme()

  useEffect(() => {
    initTheme()
  }, [])

  useEffect(() => {
    
    document.documentElement.className = theme
  }, [theme])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Switch
        className={'cursor-pointer'}
        onCheckedChange={toggleTheme}
        id="airplane-mode"
      />
      <Label htmlFor="airplane-mode">
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </Label>
    </div>
  )
}
