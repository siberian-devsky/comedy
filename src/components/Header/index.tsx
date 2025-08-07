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
							<span></span>
						</div>
					</button>

					{/*//> menu button - mobile only*/}
					<div className='flex flex-row items-center gap-3 h-6'>
						<ThemeSlider />
						<button
							id='menuToggle'
							onClick={() => setMobileMenuIsOpen((prev) => !prev)}
							className={clsx(
								'w-18 h-7 rounded-md text-xs',
								'bg-gray-800 text-pyellow'
							)}
						>
							<div className='flex flex-row gap-1 items-center justify-center'>
								<div>
									{ mobileMenuIsOpen
										? <X width={20} height={20}/>
										: <Menu width={20} height={20}/> }
								</div>
								<div>Menu</div>
							</div>
						</button>
					</div>
				</div>
			) : (
				// else show the full menu
				<div className={clsx('w-full h-full flex flex-row justify-between items-center')}>
					<ComicSearchForm/>
					<ThemeSlider />
				</div>
			)}

			{/* //> mobile menu */}
			{deviceIsMobile && (
				<div
					className={clsx(
					'absolute left-0 -z-10 p-2',
					'transition-all duration-300 ease-in-out',
					mobileMenuIsOpen
						? 'opacity-100 translate-y-16 pointer-events-auto'
						: 'opacity-0 -translate-y-16 pointer-events-none'
					)}
				>
					<div className='w-full flex flex-row justify-end'>
						{/* <div> */}
							<ComicSearchForm />
						{/* </div> */}
					</div>
				</div>
				)}
		</header>
	)
}
