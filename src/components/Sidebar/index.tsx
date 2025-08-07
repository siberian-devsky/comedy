'use client'
import { Comic } from '@/types'
import { useComicContext } from '@/context/ComicContext'
import NamePill from '../NamePill'
import clsx from 'clsx'

export default function Sidebar() {
	const { searchHistory } = useComicContext()

	console.log(searchHistory)

	return (
		//> sidebar container
		<aside
			id='sidebarAside'
			className={clsx(
				'h-full overflow-y-scroll'
			)}
		>
			{/*//> search history */}
			{searchHistory && (
				<ul
					id='history'
					className={clsx(
						'list-none',
						'flex flex-col items-center gap-8 p-4',
						// theme === 'dark' && '
					)}
				>
					{searchHistory.map((comic: Comic, index: number) => (
						<NamePill key={index} comic={comic}/>
					))}
				</ul>
			)}
		</aside>
	)
}
