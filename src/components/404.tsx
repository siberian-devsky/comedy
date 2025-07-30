'use client'

import clsx from 'clsx'
import { BarricietoFontClass } from '@/lib/config';
import { useTheme } from 'next-themes';
export default function FourOhFour() {
	const {theme, } = useTheme()
	
	return (
		// size, position etc set by parent
			<div className='relative w-full h-full'>
				{/*//> Text Content */}
				<div className='absolute inset-0 z-10'>
					<div className={clsx(
						`${BarricietoFontClass}`,
						'h-full',
						'flex flex-col items-center',
						'justify-center text-center px-4',
                        theme === 'dark' ? 'text-icdb' : 'text-black'
					)}>
						<h1 className={clsx(
							'text-6xl md:text-9xl',
							// 'text-icdb drop-shadow-lg'
						)}>
							404
						</h1>
						<p className={clsx(
							'mt-4 max-w-xl drop-shadow-md',
							'text-2xl sm:text-3xl: md:text-4xl',
							// theme === 'dark' ? 'text-icdb' : 'text-black'
						)}>
                            dude you bombed last night...
						</p>
					</div>
				</div>
			</div>
	)
}
