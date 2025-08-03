'use client'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useComicContext } from '@/context/ComicContext'
import NamePill from '../NamePill'
import Image from 'next/image'

export default function ComicCell() {
	const { onStage } = useComicContext()
	const { theme } = useTheme()

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
			<div className={clsx('flex flex-col w-full h-full gap-4 mr-8')}>
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
								className={clsx(
									'sticky top-0 pb-4',
									theme === 'dark' ? 'bg-black' : 'bg-white'
								)}
							>
								<div
									id='imdbLink'
									className='max-h-8 w-1/4 flex flex-row items-center justify-start'
								>
									<NamePill comic={onStage}/>
								</div>
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
