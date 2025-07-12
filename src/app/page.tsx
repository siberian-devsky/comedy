'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import CellModal from '@/components/Cell/modals/CellModal';
import { CellData } from '@/types';
import Header from '@/components/Header'
import { useTheme } from 'next-themes';
import Image from 'next/image';


export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([]) // Store comedy cell data
    const [showCellModal, setShowCellModal] = useState(false) // Control modal visibility
    const [selectedCell, setSelectedCell] = useState<CellData>(null) // Track selected cell for modal
    
    const {theme,} = useTheme()
    const isDarkMode = theme === 'dark' // Determine current theme

    // Fetch comedy cells from backend API
    useEffect(() => {
        const fetchAllCells = async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/v1/cells') // API endpoint for cells
                const data = await resp.json()
                setCells(data.data) // Update state with fetched data
                localStorage.setItem('cache', JSON.stringify(data.data)) // Cache data locally
            } catch (err) {
                console.log("data: ", err)
            }
        }
        fetchAllCells()
    }, [setCells])

    // Prevent body scroll when modal is open
    useEffect( () => {
        if (showCellModal) {
            document.body.style.overflow = 'hidden' // Lock scroll when modal open
        } else {
            document.body.style.overflow = 'auto' // Restore scroll when modal closed
        }
    }, [showCellModal])

    // Handle ESC key to close modals
    useEffect( () => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowCellModal(false) // Close modal on ESC key
            }
        }

        window.addEventListener('keydown', handleKey) // Add event listener
        return () => window.removeEventListener('keydown', handleKey) // Cleanup listener
    })

    return(
        <main className="w-full h-full overflow-x-hidden flex flex-col items-center">
            {/* Background image with blur effect */}
            <div>
                <Image
                    src="/club-marquis.png"
                    alt="Comedy Club Marquee"
                    fill
                    className="object-cover blur-[14px] brightness-75" // Apply blur and dimming effects
                    priority
                />
            </div>
            <div className="relative z-10 w-full"> {/* Content layer above background */}
                <Header />
                {/* Hero section with main title */}
                <div className="relative w-full h-screen"> {/* Full viewport height hero */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 text-white">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
                        i hate it here
                        </h1>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-white/30 max-w-sm sm:max-w-md md:max-w-xl drop-shadow-md">
                        you might like it though
                        </p>
                    </div>
                </div>
                {/* Comedy cells container with responsive spacing */}
                <div className="w-full px-4 sm:px-6 md:px-8 mt-16">
                    <div
                        id='comedyStack'
                        className='w-full flex flex-col gap-24 sm:gap-32 md:gap-48' // Responsive gaps between cells
                        >
                        {/* Render comedy cells with alternating layout */}
                        {cells !== null &&
                            cells
                                .filter((cell): cell is NonNullable<typeof cell> => cell !== null) // Filter out null cells
                                .map((cell, index) => (
                            <Cell
                                key={cell.id}
                                {...cell}
                                isDarkMode={isDarkMode}
                                isCellIndexEven={index % 2 === 0} // Alternate left/right alignment
                                selectCellAndShowModal={() => {
                                setSelectedCell(cell) // Set selected cell
                                setShowCellModal(true) // Open modal
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal overlay for cell details */}
            {showCellModal && (
                <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
                    <CellModal
                        selectedCell={selectedCell}
                        setShowModal={setShowCellModal}
                    />
                </div>
            )}
        </main>
    )
}