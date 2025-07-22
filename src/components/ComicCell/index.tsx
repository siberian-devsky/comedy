'use client'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Comic } from '@/types'

type CellProps = Comic & {
	setSelectedComicId?: Dispatch<SetStateAction<number>>
}

export default function ComicCell({
	id,
	name,
	hometown,
	setSelectedComicId,
}: CellProps) {
	function handleClick() {
		setSelectedComicId?.(id)
	}

	return (
		<div
			id={id.toString()}
			className={clsx(
				'w-2/3 h-48 rounded-xl flex flex-col items-center justify-center',
				'mx-2 shadow-md shadow-icdb/25',
				'hover:shadow-icdb hover:shadow-lg duration-500'
			)}
		>
			{hometown}
			<button
				onClick={handleClick}
				className={clsx(
					'px-3 sm:px-4 py-2 rounded-md font-extrabold text-slate-800 bg-icdb',
					'transition-transform hover:scale-[1.02] cursor-pointer',
					'text-sm sm:text-base md:text-lg'
				)}
			>
				{name}
			</button>
		</div>
	)
}
