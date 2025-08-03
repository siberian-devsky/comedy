'use client'
import { Comic } from '@/types'
import { useTheme } from 'next-themes'
import { useComicContext } from '@/context/ComicContext'
import NamePill from '../NamePill'
import clsx from 'clsx'

export default function Sidebar() {
	const { searchHistory } = useComicContext()
	const { theme, } = useTheme()

	console.log(searchHistory)

	return (
		//> sidebar container
		<aside
			id='sidebarAside'
			className={clsx(
				'h-full overflow-y-scroll',
				'transition-all duration-300 ease-in-out'
			)}
		>
			{/*//> search history */}
			{searchHistory && (
				<ul
					id='history'
					className={clsx(
						'list-none',
						'flex flex-col items-center gap-8 p-4',
						theme === 'dark' && 'bg-black'
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
