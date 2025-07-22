'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ThemeSlider from '../Theme/ThemeSlider'
import ComicSearchForm from './ComicSearchForm'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { CellData } from '@/types'
import { BarricietoFontClass } from '@/lib/config'

type HeaderProps = {
	setCells: Dispatch<SetStateAction<CellData>>
	isMobileDevice: boolean
	mobileMenuIsOpen: boolean
	setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>
	viewportWidth: number
}

export default function Header({
	setCells,
	isMobileDevice,
	mobileMenuIsOpen,
	setMobileMenuIsOpen,
}: HeaderProps & {}) {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		// guarantee that the menu wont reopen when back in mobile mode
		if (!isMobileDevice && mobileMenuIsOpen) setMobileMenuIsOpen(false)
	}, [isMobileDevice, mobileMenuIsOpen])

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
			{/*//> //smoosh header components into toggle menu */}
			{isMobileDevice ? (
				<div
					className={clsx(
						'w-full flex flex-row',
						'items-center justify-end',
						'text-xl'
					)}
				>
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
				</div>
			) : (
				// else show the full menu
				<div className={clsx('w-full flex flex-row justify-between')}>
					<ComicSearchForm setCells={setCells} />
					<ThemeSlider />
				</div>
			)}

			{/* //> mobile menu */}
			{isMobileDevice && mobileMenuIsOpen && (
				<div
					className={clsx(
						'absolute z-50 left-0 w-full h-auto p-4',
						'bg-slate-900/70',
						'transition-all duration-300 ease-in-out',
						'opacity-100 translate-y-16',
						isMobileDevice
							? 'w-0 -translate-y-full'
							: 'w-48 translate-x-0'
					)}
				>
					<div className='flex flex-row justify-between'>
						<ComicSearchForm setCells={setCells} />
						<div className={'-translate-y-0.5'}>
							<ThemeSlider />
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
