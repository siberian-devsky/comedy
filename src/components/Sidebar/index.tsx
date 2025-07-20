'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { CellData } from '@/types'
import { useTheme } from 'next-themes'
import Cell from '@/components/Cell'
import clsx from 'clsx'

type SidebarProps = {
	cells: CellData
	setCells: Dispatch<SetStateAction<CellData>>
	isMobileDevice: boolean
	setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
	mobileMenuIsOpen: boolean
}

export default function Sidebar({
	cells,
	setCells,
	isMobileDevice,
	setSidebarIsOpen,
	mobileMenuIsOpen,
}: SidebarProps) {
	const [dataLoading, setDataLoading] = useState(false)
	const { theme } = useTheme()

	// Fetch data
	useEffect(() => {
		setDataLoading(true)
		console.log(isMobileDevice)
		const cache = localStorage.getItem('cache')
		if (cache) {
			setCells(JSON.parse(cache))
			setDataLoading(false)
		} else {
			;(async () => {
				try {
					const res = await fetch(
						'http://localhost:8080/api/v1/cells/all'
					)
					const data = await res.json()
					setCells(data.comics)
					localStorage.setItem('cache', JSON.stringify(data.comics))
				} catch (err) {
					console.error('fetch error:', err)
				} finally {
					setDataLoading(false)
				}
			})()
		}
	}, [setCells, isMobileDevice])

	return (
        //> sidebar container */}
		<div
			className={clsx(
				'absolute z-30 bg-black/70','h-full overflow-y-auto',
				'flex flex-row',
				'w-36 md:w-56 lg:w-[350px]',
				'transition-all duration-300 ease-in',
				isMobileDevice && !mobileMenuIsOpen
					? 'translate-x-0'
					: '-translate-x-full'
			)}
		>
            <aside
                id='sidebarContainer'
            >
                {/*//> loading message */}
                {dataLoading && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <span>Loading...</span>
                    </div>
                )}

                {/*//> degenerate cards */}
                {cells && !dataLoading && (
                    <div
                        id='comedyStack'
                        className='flex flex-col items-center gap-8 p-4 translate-y-20'
                    >
                        {cells.map((cell) => (
                            <Cell key={cell.id} {...cell} />
                        ))}
                    </div>
                )}
            </aside>

            {/*//> pull tab */}
            <div>
                <button
                    className={clsx(
                        'w-10 h-full',
                        'flex flex-row items-start justify-center',
                        theme === 'dark'
                            ? 'bg-icdb text-black'
                            : 'bg-black text-icdb'
                    )}
                    onClick={() => setSidebarIsOpen((prev) => !prev)}
                >
                    <div className='brightness-50 rotate-90 translate-y-48'>
                        degenerates
                    </div>
                </button>
            </div>
        </div>
    )
}
