'use client'
import { useEffect, useState } from 'react'
import CellModal from '@/components/Cell/modals/CellModal'
import { CellData } from '@/types'
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'
import { MOBILE_MENU_THRESHOLD } from '@/lib/config'

export default function Grid() {
	const [cells, setCells] = useState<CellData>([])
	const [showCellModal, setShowCellModal] = useState(false)
	const [selectedCell] = useState<CellData>(null)
	const [viewportWidth, setViewportWidth] = useState(
		MOBILE_MENU_THRESHOLD + 1
	) // expand all the expandables ☠️
	const [isMobileDevice, setIsMobileDevice] = useState(false) // default to desktop
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

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

			//! THIS SHOULE ONLY BE SET HERE
			setIsMobileDevice(viewportWidth < MOBILE_MENU_THRESHOLD)
		}

		return () => {
			window.removeEventListener('resize', onViewportChange)
		}
	}, [viewportWidth])

	// punch out to prevent hydration mismatch
	if (!mounted) return null

	return (
		<div className='flex flex-col h-screen w-full overflow-hidden'>
			<Header
				setCells={setCells}
				mobileMenuIsOpen={mobileMenuIsOpen}
				setMobileMenuIsOpen={setMobileMenuIsOpen}
				isMobileDevice={isMobileDevice}
				viewportWidth={viewportWidth}
			/>

			<main className='flex flex-row h-full w-full overflow-hidden'>
				{/* sidebar */}
				{/* <Sidebar
					cells={cells}
					setCells={setCells}
					isMobileDevice={isMobileDevice}
					mobileMenuIsOpen={mobileMenuIsOpen}
					setSidebarIsOpen={setSidebarIsOpen}
				/> */}

				{/* main content */}
				<section className='flex-1 h-fulloverflow-y-auto'>
					<Hero />
				</section>
			</main>

			{/* Modal */}
			{showCellModal && (
				<div className='fixed inset-0 z-50 backdrop-brightness-50 flex items-center justify-center p-4'>
					<CellModal
						selectedCell={selectedCell}
						setShowModal={setShowCellModal}
					/>
				</div>
			)}
		</div>
	)
}
