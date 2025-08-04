'use client'
import clsx from 'clsx'
import { BarricietoFontClass } from '@/lib/config';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
export default function FourOhFour() {
	const {theme, } = useTheme()
	const [mounted, setMounted] = useState(false)
	
	useEffect( () => setMounted(true), [])

	if (!mounted) return

	return (
		// size, position etc set by parent
		<div className='w-full h-full'>
			<div className={clsx(
				`${BarricietoFontClass}`,
				'h-full',
				'flex flex-col items-center',
				'justify-center text-center px-4',
				theme === 'dark' ? 'text-icdb' : 'text-black'
			)}>
				<h1 className={clsx(
					'text-6xl md:text-9xl',
				)}>
					400
				</h1>
				<p className={clsx(
					'mt-4 max-w-xl drop-shadow-md',
					'text-2xl sm:text-3xl: md:text-4xl',
					theme === 'dark' ? 'text-pyellow' : 'text-black'
				)}>
					he has NOT aged well
				</p>
			</div>
		</div>
	)
}
