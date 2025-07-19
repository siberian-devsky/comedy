'use client';
import { Dispatch, SetStateAction } from 'react';
import ThemeSlider from '../Theme/ThemeSlider';
import ComicSearchForm from './ComicSearchForm';
import clsx from 'clsx'
import { useTheme } from 'next-themes';
import { CellData } from '@/types';

type HeaderProps = {
    setCells: Dispatch<SetStateAction<CellData[]>>
    viewportWidth: number
    setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>
    mobileMenuIsOpen: boolean
}

export default function Header({
    setCells,
    viewportWidth,
    setMobileMenuIsOpen,
    mobileMenuIsOpen
}: HeaderProps & {}
) {
    const {theme, } = useTheme()

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
                {viewportWidth <= 430 
                    ?   // smoosh header compoenents into toggle menu
                        <div className={clsx(
                            'w-full flex flex-row',
                            'items-center justify-start',
                            'text-xl',
                            )}
                        >
                            <button
                                id='menuToggle'
                                onClick={ () => setMobileMenuIsOpen( (prev) => !prev ) }
                                className={clsx(
                                'w-8 aspect-square rounded-2xl',
                                'font-bold cursor-pointer border',
                                'bg-green-400',
                                theme === 'dark' ? 'text-white border-white' : 'text-black border border-black',
                                !mobileMenuIsOpen && '-rotate-[22.5deg] duration-700',
                                mobileMenuIsOpen && 'bg-red-400 duration-700'
                            )}
                            >
                                {mobileMenuIsOpen ? 'X' : '?'}
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
                mobileMenuIsOpen && viewportWidth <= 430
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
