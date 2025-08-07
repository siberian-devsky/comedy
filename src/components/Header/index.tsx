'use client'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeSlider from '../Theme/ThemeSlider'
import ComicSearchForm from './ComicSearchForm'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useUiContext } from '@/context/UiContext'

export default function Header() {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const {
		mobileMenuIsOpen, setMobileMenuIsOpen,
		sidebarIsOpen, setSidebarIsOpen,
		deviceIsMobile
	} = useUiContext()

	useEffect(() => {
		setMounted(true)

		// guarantee that the menu wont reopen when back in mobile mode
		if (!deviceIsMobile && mobileMenuIsOpen) setMobileMenuIsOpen(false)
	}, [deviceIsMobile, mobileMenuIsOpen, setMobileMenuIsOpen])

	if (!mounted) return

	return (
		<header
			id='header'
			className={clsx(
				'w-full flex flex-row h-auto',
				'items-center justify-start p-4',
				theme === 'dark' ? 'bg-black' : 'bg-white'
			)}
		>
			{/*//> smoosh header components into toggle menu */}
			{deviceIsMobile ? (
				<div
					className={clsx(
						'w-full flex flex-row',
						'items-center justify-between',
						'text-xl'
					)}
				>
					{/*//> sidebar popout control */}					
					{/* <div className='w-full'> */}
						<button
							id='showSidebar'
							className='text-icdb'
							onClick={() => setSidebarIsOpen( (prev) => !prev )}
						>
							<div className='flex flex-row gap-2 pl-2'>
								<span className={clsx(
									'transition-all duration-150 ease-linear',
									sidebarIsOpen ? 'rotate-90' : 'rotate-0'
								)}
								>
									&gt;
								</span>
							</div>
						</button>
					{/* </div> */}

					{/*//> menu button */}
					<button
						id='menuToggle'
						onClick={() => setMobileMenuIsOpen((prev) => !prev)}
						className={clsx(theme === 'dark' && 'text-pyellow')}
					>
						{ mobileMenuIsOpen? <X/> : <Menu/> }
					</button>
				</div>
			) : (
				// else show the full menu
				<div className={clsx('w-full flex flex-row justify-between')}>
					<ComicSearchForm/>
					<ThemeSlider />
				</div>
			)}

			{/* //> mobile menu */}
			{deviceIsMobile && (
				<div
					className={clsx(
					'absolute left-0 -z-10 w-full p-4 bg-slate-900/70',
					'transition-all duration-300 ease-in-out',
					mobileMenuIsOpen
						? 'opacity-100 translate-y-16 pointer-events-auto'
						: 'opacity-0 -translate-y-16 pointer-events-none'
					)}
				>
					<div className="flex flex-row justify-between">
					<ComicSearchForm />
					<div className="-translate-y-0.5">
						<ThemeSlider />
					</div>
					</div>
				</div>
				)}
		</header>
	)
}
