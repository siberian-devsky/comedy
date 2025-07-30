'use client'

// import Image from 'next/image'
import { useState, useEffect } from 'react';
import clsx from 'clsx'
import { BarricietoFontClass } from '@/lib/config';
import { useTheme } from 'next-themes';
import Image from 'next/image';
export default function Hero() {
	const {theme, } = useTheme()
	const [mounted, setMounted] = useState(false)
	
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return
	
	return (
		// size, position etc set by parent
		// <div>
			<div className='relative w-full h-full'>
			{/*//> Background image */}
				{/* <Image
					src='/club-marquis.png'
					alt='Comedy Club Marquee'
					fill
					className='object-cover brightness-75'
					priority
				/> */}

				{/*//> blur overlay for the image */}
				<div className='absolute inset-0 z-10 bg-black/10 backdrop-blur-lg' />

				{/*//> Text Content */}
				<div className='absolute inset-0 z-10'>
					<div className={clsx(
						`${BarricietoFontClass}`,
						'h-full',
						'flex flex-col items-center',
						'justify-center text-center px-4 text-white'
					)}>
						<h1 className={clsx(
							'text-6xl md:text-9xl',
							'text-yellow-400 drop-shadow-lg'
						)}>
							i hate it here
						</h1>
						<p className={clsx(
							'mt-4 max-w-xl drop-shadow-md',
							'text-2xl sm:text-3xl: md:text-4xl',
							theme === 'dark' ? 'text-white/75' : 'text-black'
						)}>
						</p>
					</div>
				</div>
			</div>
		// </div>
	)
}
