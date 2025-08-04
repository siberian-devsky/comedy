'use client'
import clsx from 'clsx'
import { BarricietoFontClass } from '@/lib/config';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
					'text-lg md:text-6xl',
				)}>
					this person must be a c-lister
				</h1>
				<p className={clsx(
					'mt-4 max-w-xl drop-shadow-md',
					'text-2xl sm:text-3xl: md:text-4xl',
					theme === 'dark' ? 'text-pyellow' : 'text-black'
				)}>
					go back to the alleys...
				</p>
				<Link  href='/'
					className={clsx(
					'cursor-pointer',
					'mt-4 max-w-xl drop-shadow-md',
					'text-md md:text-lg',
					theme === 'dark' ? 'text-slate-400' : 'text-black'
				)}>
					go back to the method one clinic
				</Link>
			</div>
		</div>
	)
}
