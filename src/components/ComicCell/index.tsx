'use client'
import clsx from 'clsx'
import { useComicContext } from '@/context/ComicContext'
import Image from 'next/image'

export default function ComicCell() {
	const { onStage } = useComicContext()
	if (!onStage) return

	const imgUrl = `https://image.tmdb.org/t/p/original${onStage.profile_path}`

	return (
		<div
			id={onStage.id.toString()}
			className={clsx(
				'flex flex-row w-[750px] h-96 mx-2 rounded-md p-4',
				'border border-pyellow transition-all duration-100'
			)}
		>
			{/* id + profile pic */}
			<div className={clsx('flex flex-col w-full h-full gap-4 mr-4')}>
				<div>
					<Image
						src={imgUrl}
						alt={onStage.name}
						width={400}
						height={400}
						className='rounded-md'
					/>
				</div>
			</div>
			{/* details */}
			<div className='items-center justify-center overflow-scroll'>
				<table>
					<tbody>
						{/* name */}
						<tr>
							<td
								className={clsx('sticky top-0 pb-4')}
							>
								{onStage.name}
								<span>
									<a href={onStage.imdb_id} target='_blank'>
										<button className={clsx(
											'ml-2 px-1 text-xs h-auto rounded-md',
											'bg-pyellow text-black cursor-pointer'
										)}
										>
											IMDb
										</button>
									</a>
								</span>
							</td>
						</tr>
						{/* home */}
						<tr>
							<td className='pb-4'>{onStage.place_of_birth}</td>
						</tr>
						{/* bio */}
						<tr>
							<td className='pb-4'>{onStage.biography}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
