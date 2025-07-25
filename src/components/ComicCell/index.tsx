'use client'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Comic } from '@/types'
import { useComicContext } from '@/context/ComicContext'

type CellProps = Comic & {
	setSelectedComicId?: Dispatch<SetStateAction<number>>
}

export default function ComicCell({
	id,
	name,
	hometown
}: CellProps) {
	const { comicOnStage, setSelectedComicId } = useComicContext()
	const nameParts = name.split(' ')
	
	function handleClick() {
		setSelectedComicId(id)
	}

	console.debug(`comicOnStage: ${comicOnStage?.id}; id: ${id}`)

	return (
		<div
			id={id.toString()}
			className={clsx(
				'w-full h-48 mx-2 rounded-xl flex flex-col items-center justify-center',
				'border-2 transition-all duration-100',
				(comicOnStage?.id === id) 
					&& 'shadow-lg shadow-orange-500 border border-orange-500/50'
			)}
		>
			<button
				onClick={handleClick}
				className={clsx(
					'p-2 rounded-md font-semibold ',
					'transition-transform hover:scale-[1.02] cursor-pointer',
					// 'text-sm md:text-lg'
				)}
				>
				<span className='text-slate-800 bg-icdb pl-3 pr-1 rounded-l-md'>{nameParts[0]}</span>
				<span className='text-icdb bg-slate-800 pr-3 pl-1 rounded-r-md'>{nameParts[1]}</span>
			</button>
			{hometown}
		</div>
	)
}
