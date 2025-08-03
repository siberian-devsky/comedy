'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function ThemeSlider() {
	const { theme, setTheme } = useTheme() // Get theme context
	const [mounted, setMounted] = useState(false) // Track hydration state

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null // avoid SSR mismatch

	const isDark = theme === 'dark' // Determine current theme

	return (
		<div
			role='switch'
			aria-checked={isDark}
			onClick={() => setTheme(isDark ? 'light' : 'dark')} // Toggle theme on click
			className={clsx(
				'flex flex-row items-center justify-start',
				'w-12 h-auto',
				'translate-y-1 overflow-hidden',
				'rounded-full cursor-pointer',
				'border-2 border-pyellow',
				isDark ? 'bg-slate-800' : 'bg-white'
			)}
		>
			{/* pill container*/}
			<div
				className={clsx(
					'w-full flex flex-row items-center justify-start',
					'min-w-[42px]' //! prevent pill squish on mobile
				)}
			>
				{/* toggle dot */}
				<div
					className={clsx(
						'w-3',
						'h-3',
						'rounded-full',
						isDark
							? 'bg-white translate-x-1 duration-200 ease-in'
							: 'bg-black translate-x-[230%] scale-110 duration-200 ease-in'
					)}
				></div>
			</div>
		</div>
	)
}
