'use client'

import Image from 'next/image'
import { Barriecito } from 'next/font/google';

const barricieto = Barriecito({
	weight: '400',
	style: 'normal',
	subsets: ['latin'],
	display: 'swap'
})

export default function Hero() {
	return (
		<div className='relative w-full h-full isolate'>
			{/* Background image */}
			<Image
				src='/club-marquis.png'
				alt='Comedy Club Marquee'
				fill
				className='object-cover brightness-75'
				priority
			/>

			{/* Frosted glass / blur overlay */}
			<div className='absolute inset-0 z-10 bg-black/10 backdrop-blur-sm' />

			{/* Text Content */}
			<div className={`${barricieto.className} absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 text-white`}>
				<h1 className='text-4xl sm:text-5xl: md:text-8xl font-extrabold text-yellow-400 drop-shadow-lg'>
					i hate it here
				</h1>
				<p className='mt-4 text-white/50 max-w-xl drop-shadow-md'>
					you might like it though
				</p>
			</div>
		</div>
	)
}
