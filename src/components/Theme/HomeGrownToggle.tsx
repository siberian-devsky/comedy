'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'

export default function HomeGrownToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid SSR mismatch

  const isDark = theme === 'dark'

  return (
    <div
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex w-12 h-4 rounded-full cursor-pointer transition-all duration-300
        ${isDark ? 'bg-white justify-end' : 'bg-slate-800 justify-start'}`}
    >
      <div className="w-6 h-6 rounded-full bg-emerald-500 transition-transform -translate-y-1">
        {theme === 'dark' ? <LightModeOutlined  /> : <DarkModeOutlined />}
      </div>
    </div>
  )
}
