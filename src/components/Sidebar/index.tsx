'use client'
import { Comic } from '@/types'
import { useTheme } from 'next-themes'
import ComicCell from '@/components/ComicCell'
import { useComicContext } from '@/context/ComicContext'
import clsx from 'clsx'

export default function Sidebar() {
	const { comics, setSelectedComicId, dataLoading } = useComicContext()
	const { theme } = useTheme()

	return (
		//> sidebar container
		<aside id='sidebarAside'>
			{/*//> loading message */}
			{dataLoading && (
				<div className='w-24 h-full flex items-center justify-center'>
					<span>Loading...</span>
				</div>
			)}

			{/*//> degenerate cards */}
			{comics && !dataLoading && (
				<div
					id='comedyStack'
					className={clsx(
						'flex flex-col items-center gap-8 p-4',
						theme === 'dark' && 'bg-black/70'
					)}
				>
					{comics.map((comic: Comic) => (
						<ComicCell
							key={comic.id}
							setSelectedComicId={setSelectedComicId}
							{...comic}
						/>
					))}
				</div>
			)}
		</aside>
	)
}
