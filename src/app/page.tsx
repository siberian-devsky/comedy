'use client'
import { useEffect, useState } from 'react'
import CellModal from '@/components/Cell/modals/CellModal'
import { CellData } from '@/types'
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero'
import Sidebar from '@/components/Sidebar'

export default function Grid() {
	const [cells, setCells] = useState<CellData>([])
	const [showCellModal, setShowCellModal] = useState(false)
	const [selectedCell, ] = useState<CellData>(null)
	// const [dataLoading, setDataLoading] = useState(false)
	const [viewportWidth, setViewportWidth] = useState(0)
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false) // default to desktop
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true) // default to desktop
	const [mounted, setMounted] = useState(false)

	useEffect( () => {
		setMounted(true)
	},[])
	
	// Fetch data
	// useEffect(() => {
	// 	setDataLoading(true)
	// 	const cache = localStorage.getItem('cache')
	// 	if (cache) {
	// 		setCells(JSON.parse(cache))
	// 		setDataLoading(false)
	// 	} else {
	// 		(async () => {
	// 			try {
	// 				const res = await fetch(
	// 					'http://localhost:8080/api/v1/cells/all'
	// 				)
	// 				const data = await res.json()
	// 				setCells(data.comics)
	// 				localStorage.setItem('cache', JSON.stringify(data.comics))
	// 			} catch (err) {
	// 				console.error('fetch error:', err)
	// 			} finally {
	// 				setDataLoading(false)
	// 			}
	// 		})()
	// 	}
	// }, [])
	
	// master event handler for responsiveness
	//? is this the right way to do this?
	useEffect( () => {
		window.addEventListener('resize', onViewportChange)
		// onViewportChange()
		
		function onViewportChange() {
			const measuredViewportWidth = window.innerWidth
			setViewportWidth(measuredViewportWidth)
			console.log(viewportWidth);
			
			if (viewportWidth <= 430) { // hide on mobile
				setSidebarIsOpen(false)
			} else {
				setSidebarIsOpen(true)
			}
		}
		
		return () => {
			window.removeEventListener('resize', onViewportChange)
		}
	},[viewportWidth])
	
	// punch out to prevent hydration mismatch
	if (!mounted) return null

	return (
		<div className='flex flex-col h-screen w-full overflow-hidden'>
			<Header
				setCells={setCells}
				viewportWidth={viewportWidth}
				setMobileMenuIsOpen={setMobileMenuIsOpen}
				mobileMenuIsOpen={mobileMenuIsOpen}
			/>

			<main className='flex flex-row h-full w-full overflow-hidden'>
				{/* Sidebar (Left) */}
				{sidebarIsOpen && 
					<Sidebar 
						cells={cells}
						setCells={setCells}
					/>
					// <aside className='w-1/4 min-w-[300px] max-w-[400px] h-full overflow-y-auto border-r border-gray-200'>
					// 	{dataLoading ? (
					// 		<div className='w-full h-full flex items-center justify-center'>
					// 			<span>Loading...</span>
					// 		</div>
					// 	) : (
					// 		<div
					// 			id='comedyStack'
					// 			className='flex flex-col items-center gap-8 p-4 translate-y-20'
					// 		>
					// 			{cells
					// 				.filter((cell): cell is CellData => !!cell)
					// 				.map((cell) => (
					// 					<Cell key={cell.id} {...cell} />
					// 				))}
					// 		</div>
					// 	)}
					// </aside>
				}

				{/* Main Content (Right) */}
				<section className='flex-1 h-full overflow-y-auto'>
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
