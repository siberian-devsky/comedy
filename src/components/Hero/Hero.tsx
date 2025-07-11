'use client'

import Image from "next/image"
export default function Hero() {
    return (
        <div id='hero' className='relative w-full h-screen'>
            <Image
                src='/club-marquis.png'
                alt='Comedy Club Marquee'
                fill
                className='object-cover blur-[14px] brightness-40'
                priority
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10'>
                <div className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-imdb drop-shadow-lg'>
                    comedy
                </div>
                <div className="flex flex-row gap-8">
                    <button className="w-8 h-12 border-red-600"></button>
                    <button className="w-8 h-12 border-red-600"></button>
                </div>
            </div>
        </div>
    )
}