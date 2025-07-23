'use client'
import { useState, useEffect } from 'react'
import { Comic } from '@/types'
import { useTheme } from 'next-themes'
import ComicCell from '@/components/ComicCell'
import { useComicContext } from '@/context/ComicContext'
import clsx from 'clsx'

export default function Sidebar() {
	const { comics, setSelectedComicId, dataLoading } = useComicContext()

	const [mounted, setMounted] = useState(false)
	const { theme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	// Fetch data,
	// useEffect(() => {
	// 	setDataLoading(true)
	// 	const cache = localStorage.getItem('cache')
	// 	if (cache) {
	// 		setComics(JSON.parse(cache))
	// 		setDataLoading(false)
	// 	} else {
	// 		;(async () => {
	// 			try {
	// 				const res = await fetch(
	// 					'http://localhost:8080/api/v1/cells/all'
	// 				)
	// 				const data = await res.json()
	// 				setComics(data.comics)
	// 				localStorage.setItem('cache', JSON.stringify(data.comics))
	// 			} catch (err) {
	// 				console.error('fetch error:', err)
	// 			} finally {
	// 				setDataLoading(false)
	// 			}
	// 		})()
	// 	}
	// }, [setComics])

	if (!mounted) return

	return (
		//> sidebar container
		<aside id='sidebarAside'>
			{/*//> loading message */}
			{dataLoading && (
				<div className='w-full h-full flex items-center justify-center'>
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
