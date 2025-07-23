'use client'
import { useEffect, useState } from 'react'
import { useComicContext } from '@/context/ComicContext'
import { useUiContext } from '@/context/UiContext'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'
import ComicCell from '@/components/ComicCell'

export default function App() {
	const { setComics, comicOnStage } = useComicContext()
	const {
		sidebarIsOpen, setSidebarIsOpen,
		mobileMenuIsOpen, setMobileMenuIsOpen,
		deviceIsMobile, viewportWidth
	} = useUiContext()
	const [mounted, setMounted] = useState(false)
	const { theme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	// punch out to prevent hydration mismatch
	if (!mounted) return null

	function handleSidebarOpenCLick() {
		setSidebarIsOpen((prev) => !prev)
		//! hack?
		const sidebarContainer = document.querySelector(
			'#sidebarContainer'
		) as HTMLDivElement
		sidebarContainer?.classList.add('w-48t', 'ranslate-x-0')
	}

	return (
		<div id='mainPage' className={clsx('flex flex-col h-screen w-screen')}>
			{/*//> header */}
			<div
				id='headerContainer'
				className={clsx('fixed top-0 left-0 z-50 h-auto w-screen')}
			>
				<Header // mobile header is in here too
					setComics={setComics}
					mobileMenuIsOpen={mobileMenuIsOpen}
					setMobileMenuIsOpen={setMobileMenuIsOpen}
					deviceIsMobile={deviceIsMobile}
					viewportWidth={viewportWidth}
				/>
			</div>

			<main className='flex flex-row h-full w-full overflow-hidden'>
				{/*//> sidebar */}
				{sidebarIsOpen && (
					<div
						id='sidebarContainer'
						className={clsx(
							'resize h-full overflow-y-scroll transition-all duration-300 ease-in-out',
							deviceIsMobile
								? sidebarIsOpen
									? 'w-48 translate-x-0'
									: 'w-0 -translate-x-full'
								: 'w-48 translate-x-0' // always open on desktop
						)}
					>
						{/*//> sidebar */}
						<Sidebar />
					</div>
				)}

				{/*//> main content */}
				<section
					id='contentContainer'
					className={clsx(
						'flex flex-col flex-1 max-w-screen max-h-screen items-center justify-center'
					)}
				>
					{/*//> sidebar popout control - close button inside component */}
					{deviceIsMobile && (
						<button
							id='showSidebar'
							className='absolute z-50 w-full h-9 top-6 left-2 text-icdb'
							onClick={() => handleSidebarOpenCLick()}
						>
							<div className='flex flex-row gap-1 pl-2'>
								<span className='-rotate-90'>&lt;</span>
								<p>sidebar</p>
							</div>
						</button>
					)}

					{/*//> MAIN CONTENT */}
					{comicOnStage ? (
						<div
							className={clsx(
								'flex flex-row justify-center',
								'text-5xl text-icdb',
								theme === 'light' &&
									'text-shadow-lg text-shadow-[#d9d9d9]'
							)}
						>
							<ComicCell
								key={comicOnStage.id}
								{...comicOnStage}
							/>
						</div>
					) : (
						<Hero />
					)}
				</section>
			</main>
		</div>
	)
}
