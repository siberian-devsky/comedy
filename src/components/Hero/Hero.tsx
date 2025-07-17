'use client'

import Image from "next/image"
export default function Hero() {
    return (
        <div id='hero' className='w-full h-full relative'>
            <Image
                src='/club-marquis.png'
                alt='Comedy Club Marquee'
                fill
                className='object-center blur-[9px] brightness-75'
                priority
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10'>
                <div className="relative w-full h-1/2">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
                            i hate it here
                        </h1>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-white/30 max-w-sm sm:max-w-md md:max-w-xl drop-shadow-md">
                            you might like it though
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}