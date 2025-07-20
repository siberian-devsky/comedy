'use client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import ThemeSlider from '../Theme/ThemeSlider'
import ComicSearchForm from './ComicSearchForm'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { CellData } from '@/types'
import { BarricietoFontClass, MOBILE_DEVICE_SM } from '@/lib/config'

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
    viewportWidth
}: HeaderProps & {}) {
	const { theme } = useTheme()
    console.debug(`isMobileDevice: ${isMobileDevice}`)
    console.debug(`mobileMenuIsOpen: ${mobileMenuIsOpen}`)
    console.debug('\n');

    useEffect(() => {
        // guarantee that the menu wont reopen when back in mobile mode
        if (!isMobileDevice && mobileMenuIsOpen) setMobileMenuIsOpen(false)
        
    }, [isMobileDevice, mobileMenuIsOpen]); 

	return (
		<div>
			<header
				id='header'
				className={clsx(
					'fixed top-0 left-0 z-50',
					'h-16 w-full flex flex-row',
					'items-center justify-start',
					'p-4 border-b-2 border-b-icdb',
					theme === 'dark' ? 'bg-black' : 'bg-icdb'
				)}
			>
                {/*//> //smoosh header components into toggle menu */}
				{isMobileDevice
                    ?
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
								'w-12 h-8 rounded-lg',
								'font-bold cursor-pointer border',
                                'bg-transparent text-2xl',
                                'transition-transform duration-300 ease-in-out',
                                theme === 'dark'
                                    ? 'text-icdb border-icdb'
                                    : 'text-black border-black',
								mobileMenuIsOpen ? 'rotate-180' : 'rotate-0'
							)}
						>  
							?
						</button>
					</div>
				:
					// else show the full menu
					<div
						className={clsx('w-full flex flex-row justify-between')}
					>
						<ComicSearchForm setCells={setCells} />
						<ThemeSlider />
					</div>
				}
			</header>
            
			{/* //> mobile menu */}
            {isMobileDevice && mobileMenuIsOpen && (
                <div
                    className={clsx(
                        'flex left-0 w-full h-auto p-4',
                        'bg-slate-900/70',
                        'transition-transform duration-300 ease-in-out',
                        viewportWidth < MOBILE_DEVICE_SM
                            ? 'flex-col justify-center'
                            : 'flex-row justify-between items-center',
                        'opacity-100 translate-y-16 pointer-events-auto'
                    )}
                >
                    <ComicSearchForm setCells={setCells} />
                    <ThemeSlider />
                </div>
            )}

		</div>
	)
}
