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
	const { comicOnStage } = useComicContext()
	const [mounted, setMounted] = useState(false)
	const { theme } = useTheme()
	const {
		sidebarIsOpen, setSidebarIsOpen,
		deviceIsMobile, mobileMenuIsOpen
	} = useUiContext()

	useEffect(() => {
		setMounted(true)
	}, [])

	// punch out to prevent hydration mismatch
	if (!mounted) return null

	return (
		<div id='mainPage' className={clsx('flex flex-col h-screen w-screen')}>
			{/*//> header */}
			<div
				id='headerContainer'
				className={clsx('fixed top-0 left-0 z-50 h-auto w-screen')}
			>	
				{/* mobile header is in here too */}
				<Header /> 
			</div>

			<main className='flex flex-row h-full w-full overflow-hidden'>
				{/*//> sidebar */}
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
					<Sidebar />
				</div>

				{/*//> main content */}
				<section
					id='contentContainer'
					className={clsx(
						'flex flex-col flex-1 max-w-screen max-h-screen items-center justify-center'
					)}
				>
					{/*//> stage */}
					{comicOnStage ? (
						<div
							className={clsx(
								'flex flex-row justify-center',
								'text-5xl text-icdb w-5/6',
								theme === 'light' &&
									'text-shadow-lg text-shadow-[#d8d8d8]'
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
