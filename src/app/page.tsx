'use client'
import { useEffect, useState } from 'react'
import CellModal from '@/components/Cell/modals/CellModal'
import { CellData } from '@/types'
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'
import { MOBILE_MENU_THRESHOLD } from '@/lib/config'
import clsx from 'clsx'
import { useTheme } from 'next-themes'

export default function Grid() {
	const [cells, setCells] = useState<CellData>([])
	const [showCellModal, setShowCellModal] = useState(false)
	const [selectedComic] = useState<CellData>([
		{
			id: 4,
			name: 'J',
			imdbProfile: 'dasd',
			hometown: 'foo',
			updated: new Date(),
		},
	])
	const [viewportWidth, setViewportWidth] = useState(
		MOBILE_MENU_THRESHOLD + 1
	) // expand all the expandables ☠️
	const [isMobileDevice, setIsMobileDevice] = useState(false) // default to desktop
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
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
			setIsMobileDevice(viewportWidth < MOBILE_MENU_THRESHOLD)
		}

		return () => {
			window.removeEventListener('resize', onViewportChange)
		}
	}, [viewportWidth])

	// punch out to prevent hydration mismatch
	if (!mounted) return null

	return (
		<div
			id='mainPage'
			className={clsx('flex flex-col h-screen w-full overflow-hidden')}
		>
			{/*//> header */}
			<div
				id='headerContainer'
				className={clsx(
					'fixed top-0 left-0 z-50 h-auto w-full overflow-hidden'
				)}
			>
				<Header
					setCells={setCells}
					mobileMenuIsOpen={mobileMenuIsOpen}
					setMobileMenuIsOpen={setMobileMenuIsOpen}
					isMobileDevice={isMobileDevice}
					viewportWidth={viewportWidth}
				/>
			</div>

			<main className='flex flex-row h-full w-full overflow-hidden'>
				{/*//> sidebar */}
				<div
					id='sidebarContainer'
					className={clsx(
						'h-full overflow-y-scroll',
						'transition-all duration-300 ease-in-out',
						isMobileDevice
							? 'w-0 -translate-x-full'
							: 'w-48 translate-x-0'
					)}
				>
					<Sidebar
						cells={cells}
						setCells={setCells}
						isMobileDevice={isMobileDevice}
						mobileMenuIsOpen={mobileMenuIsOpen}
						sidebarIsOpen={sidebarIsOpen}
						setSidebarIsOpen={setSidebarIsOpen}
					/>
				</div>

				{/*//> main content */}
				<section
					id='contentContainer'
					className={clsx(
						'flex flex-col flex-1 w-full h-screen isolate items-center justify-center'
					)}
				>
					{selectedComic ? (
						<div
							className={clsx(
								'text-5xl text-icdb',
								theme === 'light' && 'text-shadow-lg text-shadow-[#d9d9d9]'
							)}
						>
							selectedComic
						</div>
					) : (
						<Hero />
					)}
				</section>
			</main>

			{/* Modal */}
			{showCellModal && (
				<div className='fixed inset-0 z-50 backdrop-brightness-50 flex items-center justify-center p-4'>
					<CellModal
						selectedComic={selectedComic}
						setShowModal={setShowCellModal}
					/>
				</div>
			)}
		</div>
	)
}
