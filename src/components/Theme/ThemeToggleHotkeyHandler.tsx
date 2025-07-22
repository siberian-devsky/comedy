'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function KeyHandler() {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
		
	useEffect(() => {
		setMounted(true)
	}, [])

	
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 't' && e.ctrlKey) {
				setTheme(theme === 'light' ? 'dark' : 'light')
			}
		}
		
		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [setTheme, theme, resolvedTheme])
	
	if (!mounted) return
	
	return null
}
