'use client';
import { useState, useEffect } from 'react';
import ThemeSlider from '../Theme/ThemeSlider';
import ComicSearchForm from './ComicSearchForm';
import { SetCellsProps } from '@/types';
import clsx from 'clsx'
import { useTheme } from 'next-themes';

export default function Header(
     { setCells }: SetCellsProps
) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [viewportWidth, setViewportWidth] = useState(0)
    const {theme, } = useTheme()

    useEffect( () => {
        window.addEventListener('resize', onViewportChange)
        onViewportChange()

        return () => {
            window.removeEventListener('resize', onViewportChange)
        }
    })

    function onViewportChange() {
        const measuredViewportWidth = window.innerWidth
        setViewportWidth(measuredViewportWidth)

        if (viewportWidth >= 500 ) setMobileMenuOpen(false)
    }

    return (
        <>
            <header
                id='header'
                className={clsx(
                    'fixed top-0 left-0 z-50',
                    'h-16 w-full flex flex-row',
                    'items-center justify-start',
                    'p-4 border-b-2 border-b-icdb',
                    theme === 'dark'
                        ? 'bg-black'
                        : 'bg-icdb'
                )}
            > 
                {viewportWidth <= 500 
                    ?   // smoosh header compoenents into toggle menu
                        <div className={clsx(
                            'w-full flex flex-row',
                            'items-center justify-start',
                            'text-xl',
                            )}
                        >
                            <button
                                id='menuToggle'
                                onClick={ () => setMobileMenuOpen( (prev) => !prev ) }
                                className={clsx(
                                'w-8 aspect-square rounded-2xl',
                                'font-bold cursor-pointer',
                                'bg-green-400/20 text-green-400/40',
                                !isMobileMenuOpen && '-rotate-[22.5deg] duration-700',
                                isMobileMenuOpen && 'text-green-400/100 duration-700'
                            )}
                            >
                                {isMobileMenuOpen ? 'X' : '?'}
                            </button>
                        </div>
                    :   // else show the full menu
                        <div className={clsx(
                            'w-full flex flex-row justify-between'
                        )}>
                            <ComicSearchForm setCells={setCells} />
                            <ThemeSlider />
                        </div>
                }
            </header>
            {/* mobile menu */}
            <div className={clsx(
                'fixed z-40 top-0 left-0 w-full h-auto p-4',
                'flex flex-col gap-2 items-center',
                'bg-slate-900/70',
                'transition-all duration-300 ease-in-out',
                isMobileMenuOpen && viewportWidth < 500
                    ? 'opacity-100 translate-y-16 pointer-events-auto'
                    : 'opacity-0 translate-y-0 pointer-events-none'
            )}
            >
                <ComicSearchForm setCells={setCells} />
                <ThemeSlider />
            </div>
        </>
    )
}
