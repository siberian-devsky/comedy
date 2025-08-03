'use client'
import { useEffect, useState } from 'react'
import { useComicContext } from '@/context/ComicContext'
import { useUiContext } from '@/context/UiContext'
import { Comic } from '@/types'
import clsx from 'clsx'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'
import ComicCell from '@/components/ComicCell'

export default function App() {
	const { onStage, setonStage, dataLoading, setSearchHistory } = useComicContext()
	const { sidebarIsOpen, deviceIsMobile } = useUiContext()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// check cache, set UI, history
	useEffect(() => {
	const history = sessionStorage.getItem('history');
	const latest = sessionStorage.getItem('latest')

	if (history) {
		const parsed: Comic[] = JSON.parse(history);

		// restore the history UI
		setSearchHistory(parsed);

		// restore the stage UI
		if (latest) setonStage(JSON.parse(latest))

	} else { // init cache
		sessionStorage.setItem('history', JSON.stringify([]));
	}
	}, [setSearchHistory, setonStage]);


	// punch out to prevent hydration mismatch
	if (!mounted) return null

	return (
		<main
			id='mainContainer'
			className='flex flex-row h-full w-full overflow-hidden'
		>
			{/* sidebar */}
			<section
			id='sidebarContainer'
			className={clsx(
				deviceIsMobile
				? sidebarIsOpen
					? 'w-48 translate-x-0'
					: 'w-0 -translate-x-full'
				: 'w-48 translate-x-0' // always open on desktop
			)}
			>
			<Sidebar />
			</section>

			{/* main content */}
			<section
			id='contentContainer'
			className={clsx(
				'flex flex-col flex-1 max-w-screen h-full items-center justify-center'
			)}
			>
			{dataLoading && (
				<div className='w-24 h-full flex items-center justify-center'>
				<span>Loading...</span>
				</div>
			)}

			{onStage ? (
				<div className='flex flex-row justify-center w-full'>
				<ComicCell key={onStage.id} {...onStage} />
				</div>
			) : (
				<Hero />
			)}
			</section>
		</main>
	)

}
