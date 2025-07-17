'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import CellModal from '@/components/Cell/modals/CellModal';
import { CellData } from '@/types';
import Header from '@/components/Header'
import Hero from '@/components/Hero/Hero';
import { useTheme } from 'next-themes';

export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([]) // Store comedy cell data
    const [showCellModal, setShowCellModal] = useState(false) // Control modal visibility
    const [selectedCell, setSelectedCell] = useState<CellData>(null) // Track selected cell for modal
    
    const {theme,} = useTheme()
    const isDarkMode = theme === 'dark' // Determine current theme

    // Fetch comedy cells from local or db
    useEffect(() => {
        const comedyCache = localStorage.getItem('comedyCache')
        if (comedyCache) {
            const cellarComics: CellData[] = JSON.parse(comedyCache)
            setCells(cellarComics)
            localStorage.removeItem('comedyCellar')
        } else {
            const fetchAllCells = async () => {
                try {
                    const resp = await fetch('http://localhost:8080/api/v1/cells/all') // API endpoint for cells
                    const data = await resp.json()
                    const comics = data.comics
                    
                    setCells(comics) // set view
                    localStorage.setItem('comedyCache', JSON.stringify(comics)) // Cache data locally
                } catch (err) {
                    console.log("error: ", err)
                }
            }
            fetchAllCells()
        }
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
            <div className='h-[50vh] w-full'>
                <Hero />
            </div>
            <Header setCells={setCells}/>
            {/* Comedy cells container with responsive spacing */}
            <div className="w-full px-4 sm:px-6 md:px-8 mt-16">
                <div
                    id='comedyStack'
                    className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                         gap-8 border-[1px] border-lime-400 p-16'
                    >
                    {/* render grid */}
                    {cells.length > 0
                        ? cells
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
                            ))
                        : <div className='w-full h-full text-9xl justify-center'>
                            loading
                        </div>
                    }
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