'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import CellModal from '@/components/Cell/modals/CellModal';
import { CellData } from '@/types';
import Header from '@/components/Header'
import { useTheme } from 'next-themes';
import Image from 'next/image';


export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([])
    const [showCellModal, setShowCellModal] = useState(false)
    const [selectedCell, setSelectedCell] = useState<CellData>(null)
    
    const {theme,} = useTheme()
    const isDarkMode = theme === 'dark'

    // fetch cell data from the db
    useEffect(() => {
        const fetchAllCells = async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/v1/cells')
                const data = await resp.json()
                setCells(data.data)
                localStorage.setItem('cache', JSON.stringify(data.data))
            } catch (err) {
                console.log("data: ", err)
            }
        }
        fetchAllCells()
    }, [setCells])

    // bg behavior on modal
    useEffect( () => {
        if (showCellModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showCellModal])

    // kill any modals
    useEffect( () => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowCellModal(false)
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    })

    return(
        <main className="w-full h-full overflow-x-hidden flex flex-col items-center">
            <div>
                <Image
                    src="/club-marquis.png"
                    alt="Comedy Club Marquee"
                    fill
                    className="object-cover blur-[14px] brightness-75"
                    priority
                />
            </div>
            <div className="relative z-10 w-full">
                <Header />
                <div className="relative w-full h-screen">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
                        everybody hurts
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-white max-w-xl drop-shadow-md">
                        fffffffuuuu....
                        </p>
                    </div>
                </div>
                <div className="w-full px-8 mt-16">
                    <div
                        id='comedyStack'
                        className='w-full flex flex-col gap-48'
                        >
                        {cells !== null &&
                            cells
                                .filter((cell): cell is NonNullable<typeof cell> => cell !== null)
                                .map((cell, index) => (
                            <Cell
                                key={cell.id}
                                {...cell}
                                isDarkMode={isDarkMode}
                                isCellIndexEven={index % 2 === 0}
                                selectCellAndShowModal={() => {
                                setSelectedCell(cell)
                                setShowCellModal(true)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {showCellModal && (
                <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                    <CellModal
                        // sync this with local modal state tracking
                        selectedCell={selectedCell}
                        // passed down to close buttonn component
                        setShowModal={setShowCellModal}
                    />
                </div>
            )}
        </main>
    )
}