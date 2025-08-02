'use client'
import { useEffect, useState } from 'react'
import { useComicContext } from '@/context/ComicContext'
import { useUiContext } from '@/context/UiContext'
import clsx from 'clsx'
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'
import ComicCell from '@/components/ComicCell'
import FourOhFour from '@/components/404'

export default function App() {
	const { onStage, dataLoading } = useComicContext()
	const { sidebarIsOpen, deviceIsMobile, is404 } = useUiContext()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// punch out to prevent hydration mismatch
	if (!mounted) return null

	return (
		<div
			id='mainPage'
			className={clsx('flex flex-col h-screen w-screen')}
		>
			{/*//> header */}
			<nav
				id='headerContainer'
				className={clsx('fixed top-0 left-0 z-50 h-auto w-screen')}
			>
				{/* mobile header is in here too */}
				<Header />
			</nav>

			<main
				id='mainContainer'
				className='flex flex-row h-full w-full overflow-hidden'
			>
				{/*//> sidebar */}
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

				{/*//> main content */}
				<section
					id='contentContainer'
					className={clsx(
						'flex flex-col flex-1 max-w-screen max-h-screen items-center justify-center'
					)}
				>
					{/*//> loading */}
					{dataLoading && (
						<div className='w-24 h-full flex items-center justify-center'>
							<span>Loading...</span>
						</div>
					)}

					{/*//> stage */}
					{onStage ? (
						<div
							className={clsx('flex flex-row justify-center w-full')}
						>
							<ComicCell key={onStage.id} {...onStage} />
						</div>
					) : (
						is404 ? <FourOhFour /> : <Hero />
					)}
				</section>
			</main>
		</div>
	)
}
