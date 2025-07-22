'use client'
import { useEffect, useState } from 'react'
import { ComicData, Comic } from '@/types'
import { useTheme } from 'next-themes'
import { MOBILE_MENU_THRESHOLD } from '@/lib/config'
import clsx from 'clsx'
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'
import ComicCell from '@/components/ComicCell'

export default function Grid() {
	const [comics, setComics] = useState<ComicData>([])
	const [selectedComicId, setSelectedComicId] = useState(-1)
	const [comicOnStage, setComicOnStage] = useState<Comic | undefined>(undefined);
	const [viewportWidth, setViewportWidth] = useState(
		MOBILE_MENU_THRESHOLD + 1
	) // default to desktop
	const [deviceIsMobile, setdeviceIsMobile] = useState(false) // default to desktop
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { theme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	// master event handler for responsiveness
	useEffect(() => {
		window.addEventListener('resize', onViewportChange)
		onViewportChange()

		function onViewportChange() {
			const measuredViewportWidth = window.innerWidth
			setViewportWidth(measuredViewportWidth)

			//! this should only be set here
			setdeviceIsMobile(viewportWidth < MOBILE_MENU_THRESHOLD)
			setSidebarIsOpen(viewportWidth > MOBILE_MENU_THRESHOLD)
			console.log(deviceIsMobile, sidebarIsOpen)
		}

		return () => {
			window.removeEventListener('resize', onViewportChange)
		}
	}, [viewportWidth])

	useEffect(() => {
		if (comics && selectedComicId > 0) {
			setComicOnStage(() => 
				comics.find( (comic) => comic.id === selectedComicId)
			)
		}
	}, [comics, selectedComicId]);

	// punch out to prevent hydration mismatch
	if (!mounted) return null

	function handleSidebarOpenCLick() {
		console.log('sidebar should open: ', sidebarIsOpen);
		setSidebarIsOpen(true)
		//! hack?
		const sidebarContainer = document.querySelector('#sidebarContainer') as HTMLDivElement
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
					setCells={setComics}
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
						<Sidebar
							comics={comics}
							setComics={setComics}
							deviceIsMobile={deviceIsMobile}
							sidebarIsOpen={sidebarIsOpen}
							setSelectedComicId={setSelectedComicId}
						/>
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
							className='absolute z-50 w-full h-9 top-6 left-2 text-fuchsia-500'
							onClick={() => handleSidebarOpenCLick()}
						>
							<p className='w-full'>childhood baggage &gt;</p>
						</button>
					)}

					{/*//> content */}
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
