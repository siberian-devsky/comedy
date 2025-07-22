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
    sidebarIsOpen: boolean
	setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
	mobileMenuIsOpen: boolean
}

export default function Sidebar({
	cells,
	setCells,
	isMobileDevice,
    sidebarIsOpen,
	setSidebarIsOpen,
}: SidebarProps) {
	const [dataLoading, setDataLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const {theme, } = useTheme()
	
	useEffect(() => {
		setMounted(true)    
	}, [sidebarIsOpen, isMobileDevice])
    
	// Fetch data
	useEffect(() => {
        setDataLoading(true)
		const cache = localStorage.getItem('cache')
		if (cache) {
            setCells(JSON.parse(cache))
            setDataLoading(false)
		} else {
            (async () => {
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
    
    if (!mounted) return
	
    return (
        //> sidebar container
        <aside
            id='sidebarAside'
        >
            {/*//> loading message */}
            {dataLoading && (
                <div className='w-full h-full flex items-center justify-center'>
                    <span>Loading...</span>
                </div>
            )}

            {/*//> degenerate cards */}
            {(cells && !dataLoading) && (
                <div
                    id='comedyStack'
                    className={clsx(
                        'flex flex-col items-center gap-8 p-4',
                        theme === 'dark' && 'bg-black/70' 
                    )}
                >
                    {cells.map((cell) => (
                        <Cell key={cell.id} {...cell} />
                    ))}
                </div>
            )}
        </aside>
    )
}
