'use client'
import clsx from 'clsx'
import { useComicContext } from '@/context/ComicContext'


export default function ComicCell() {
	const { onStage } = useComicContext()

	if (!onStage) return 

	const nameParts = onStage.name.split(' ')

	return (
		<div
			id={onStage.id.toString()}
			className={clsx(
				'relative w-full h-48 mx-2 rounded-xl flex flex-col items-center justify-center',
				'border-2 transition-all duration-100'
			)}
		>
			<div className={clsx(
			'absolute left-8 top-8'
			)}>
				<span className='h-10 text-slate-800 bg-icdb pl-3 pr-1 rounded-l-md'>{nameParts[0]}</span>
				<span className='h-10 text-icdb bg-slate-800 pr-3 pl-1 rounded-r-md'>{nameParts[1]}</span>
			</div>
		</div>
	)
}
