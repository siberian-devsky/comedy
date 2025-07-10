'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function ThemeSlider() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid SSR mismatch

  const isDark = theme === 'dark'

  return (
    <div
      role='switch'
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        'justify-start',
        'w-12',
        'h-6',
        'overflow-hidden',
        'rounded-full',
        'cursor-pointer',
        'border',
        'border-purple-500',
        isDark ? 'bg-slate-800' : 'bg-white'
      )}
    >
      <div className={clsx(
        'w-full',
        'flex',
        'flex-row',
        'items-center',
        'justify-start',
      )}>
        <div className={clsx(
          'w-3',
          'h-3',
          'rounded-full',
          isDark
            ? 'bg-white translate-x-1 duration-200 ease-in'
            : 'bg-black translate-x-[260%] duration-200 ease-in'
        )}
        ></div>
      </div>
    </div>
  )
}
