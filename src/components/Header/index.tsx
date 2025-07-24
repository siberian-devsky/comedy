'use client'
import { useEffect, useState } from 'react'
import ThemeSlider from '../Theme/ThemeSlider'
import ComicSearchForm from './ComicSearchForm'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { BarricietoFontClass } from '@/lib/config'
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
					{/* <div className='w-full'> */}
						<button
							id='menuToggle'
							onClick={() => setMobileMenuIsOpen((prev) => !prev)}
							className={clsx(
								`${BarricietoFontClass}`,
								'flex flex-row items-center justify-center',
								'w-6 h-auto rounded-lg',
								'font-bold cursor-pointer',
								'bg-transparent text-2xl',
								'transition-transform duration-300 ease-in-out',
								theme === 'dark' ? 'text-icdb' : 'text-black',
								mobileMenuIsOpen ? 'rotate-180' : 'rotate-0'
							)}
						>
							?
						</button>
					{/* </div> */}
				</div>
			) : (
				// else show the full menu
				<div className={clsx('w-full flex flex-row justify-between')}>
					<ComicSearchForm/>
					<ThemeSlider />
				</div>
			)}

			{/* //> mobile menu */}
			{deviceIsMobile && mobileMenuIsOpen && (
				<div
					className={clsx(
						'absolute z-50 left-0 w-full h-auto p-4',
						'bg-slate-900/70',
						'transition-all duration-300 ease-in-out',
						'opacity-100 translate-y-16',
						deviceIsMobile
							? 'w-0 -translate-y-full'
							: 'w-48 translate-x-0'
					)}
				>
					<div className='flex flex-row justify-between'>
						<ComicSearchForm />
						<div className={'-translate-y-0.5'}>
							<ThemeSlider />
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
