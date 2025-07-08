'use client'
import { useEffect } from "react"
import { useTheme } from "next-themes"

export default function KeyHandler() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 't' && (e.ctrlKey)) {
                setTheme(theme === 'light' ? 'dark' : 'light')
            }
        }

        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [setTheme, theme, resolvedTheme])

    return null
}