'use client'
import { useTheme } from "next-themes"
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'
import { useState, useEffect } from "react"

function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button onClick={toggleTheme}>
            {theme === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
        </button>
    )
}

export default ThemeToggleButton