'use client'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

export default function Cell({
	id,
	name,
	// getUpOnStage,
}: {
	id: number
	name: string
	// getUpOnStage: () => void
}) {
	const [mounted, setMounted] = useState(false)
	
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return
		
	return (
		<div
			id={id.toString()}
			className={clsx(
				'w-2/3 h-48 rounded-xl flex items-center justify-center',
				'mx-2 shadow-md shadow-icdb/25',
				'hover:shadow-icdb hover:shadow-lg duration-500'
			)}
		>
			<button
				// onClick={getUpOnStage} // put profile in main window
				className='
            px-3 sm:px-4 py-2 rounded-md font-extrabold text-slate-800 bg-icdb
            transition-transform hover:scale-[1.02] cursor-pointer
            text-sm sm:text-base md:text-lg' // Responsive text sizing
			>
				{name}
			</button>
		</div>
	)
}
