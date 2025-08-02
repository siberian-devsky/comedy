'use client'
// import { Comic } from '@/types'
import { useTheme } from 'next-themes'
// import ComicCell from '@/components/ComicCell'
import { useComicContext } from '@/context/ComicContext'
import clsx from 'clsx'

export default function Sidebar() {
	const {
		searchHistory,
		// setSelectedComicId,
	} = useComicContext()
	
	const { theme } = useTheme()

	return (
		//> sidebar container
		<aside id='sidebarAside'
		className={clsx(
			'bg-green-300 h-full overflow-y-scroll transition-all duration-300 ease-in-out'
		)}>
			{/*//> degenerate cards */}
			{searchHistory && (
				<div
					id='comedyStack'
					className={clsx(
						'flex flex-col items-center gap-8 p-4',
						theme === 'dark' && 'bg-black/70'
					)}
				>
					{/* {searchHistory.map((comic: Comic) => (
						<ComicCell
							key={comic.id}
							setSelectedComicId={setSelectedComicId}
							{...comic}
						/>
					))} */}
					<p>ad;akd;lakd;alkda;lskd</p>
				</div>
			)}
		</aside>
	)
}
