'use client'
import clsx from 'clsx'
import { useComicContext } from '@/context/ComicContext'
import Image from 'next/image'


export default function ComicCell() {
	const { onStage } = useComicContext()

	if (!onStage) return 

	const nameParts = onStage.name.split(' ')
	const imgUrl = `https://image.tmdb.org/t/p/w92${onStage.profile_path}`

	return (
		<div
			id={onStage.id.toString()}
			className={clsx(
				'flex flex-row w-[750px] h-96 mx-2 rounded-md p-4',
				'border border-icdb transition-all duration-100'
			)}
		>	
			{/* id + profile pic */}
			<div className={clsx('flex flex-col h-full')}>
				<div>
					<span className='h-10 text-slate-800 bg-icdb p-1 pr-1.5 rounded-l-md'>{nameParts[0]}</span>
					<span className='h-10 text-icdb bg-slate-800 p-1 pl-1.5 rounded-r-md'>{nameParts[1]}</span>
				</div>
				<div>
					<Image
						src={imgUrl}
						alt={onStage.name}
						width={92}
						height={0}
						className='rounded-md'
					/>
				</div>
			</div>
			{/* details */}
			<div className='items-center justify-center overflow-scroll'>
				<table>
						<tbody>
							{Object.entries(onStage).map( ([key, val]) => (
								<tr key={key}>
									<td>{key}</td>
									<td>{String(val)}</td>
								</tr>
								))
							}
						</tbody>
				</table>
			</div>
		</div>
	)
}
