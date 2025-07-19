'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CellData } from "@/types"
import Cell from '@/components/Cell'
import clsx from 'clsx'


type SidebarProps = {
    // sidebarIsOpen: boolean
    // setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
    // dataLoading: boolean
    // setDataLoading: Dispatch<SetStateAction<boolean>>
    cells: CellData
    setCells: Dispatch<SetStateAction<CellData>>
}

export default function Sidebar({
    cells,
    setCells
}: SidebarProps) {
    const [dataLoading, setDataLoading] = useState(false)
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true) // default to desktop
    
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
    }, [setCells])

    return (
        <div className='grid grid-flow-col grid-rows-4'>
            <aside className={clsx(
                'row-span-4 h-full overflow-y-auto',
                'transition-all duration-300 ease-in',
                sidebarIsOpen
                    ? 'w-36 md:w-56 lg:w-[350px]'
                    : 'w-0'
                )}>
                    
                {/* loading message */}
                {dataLoading && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <span>Loading...</span>
                    </div>
                )}
                
                {/* degenerate cards */}
                { (cells && !dataLoading) && (
                    <div
                        id='comedyStack'
                        className='flex flex-col items-center gap-8 p-4 translate-y-20'
                    >
                        {cells
                            // .filter((cell) => )
                            .map((cell) => (
                                <Cell key={cell.id} {...cell} />
                            ))}
                    </div>
                )}
            </aside>
            
            {/* pull tab */}
            <button
                className={clsx(
                    'row-span-1 w-10 h-48',
                    'flex flex-row items-center justify-center',
                    'bg-black/60 text-icdb',
                )}
                onClick={() => setSidebarIsOpen( (prev) => !prev)}
            >
                <div className='rotate-90 brightness-50'>degenerates</div>
            </button>

            {/* dummy transparent rows to show main content underneath */}
            <div className='row-span-3 bg-transparent'></div>
        </div>
    )
}