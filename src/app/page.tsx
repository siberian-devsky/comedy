'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import { CellData } from '@/types';
import Header from '@/components/Header'
import AddCellModal from '@/components/Cell/modals/AddCellModal';
import UpdateCellModal from '@/components/Cell/modals/UpdateCellModal';
import DeleteCellModal from '@/components/Cell/modals/DeleteCellModal';

export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([])
    const [showAddCellModal, setShowAddCellModal] = useState(false)
    const [showUpdateCellModal, setShowUpdateCellModal] = useState(false)
    const [showDeleteCellModal, setShowDeleteCellModal] = useState(false)
    const [selectedCell, setSelectedCell] = useState<CellData | null>(null)

    // fetch cell data from the db
    useEffect(() => {
        const fetchAllCells = async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/v1/cells')
                const data = await resp.json()
                setCells(data.data)
            } catch (err) {
                console.log("data: ", err)
            }
        }
        fetchAllCells()
    }, [setCells])

    // bg behavior on modal
    useEffect( () => {
        if (showAddCellModal || showDeleteCellModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showAddCellModal, showDeleteCellModal])

    // kill all modals
    useEffect( () => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowAddCellModal(false)
                setShowDeleteCellModal(false)
                setShowUpdateCellModal(false)
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    })

    return(
        <main className="relative w-full flex flex-row justify-center items-center">
            <Header 
                showAddCellModal={setShowAddCellModal}
                showDeleteCellModal={setShowDeleteCellModal}
            />
            <div className='relative w-full h-screen'>
                <div
                    id='gridverseGrid'
                    className='absolute w-full place-items-center m-4 grid translate-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
                >
                    {cells.map((cell, index) => (
                        <Cell
                            key={index}
                            id={cell.id}
                            name={cell.name}
                            icon={cell.icon}
                            iconCode={cell.iconCode}
                            currentValue={cell.currentValue}
                            lastUpdated={cell.lastUpdated}
                            onClick={ () => {
                                setSelectedCell(cell)
                                setShowUpdateCellModal(true)
                            }}
                        />
                    ))}
                </div>
                {showAddCellModal && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <AddCellModal 
                            setShowModal={setShowAddCellModal}
                            setCells={setCells}
                        />
                    </div>
                )}
                {showUpdateCellModal && selectedCell && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <UpdateCellModal
                            setShowModal={setShowUpdateCellModal}   // just passing through
                            setCells={setCells}                     // update main grid
                            selectedCell={selectedCell}             // populates the update form with cell's curr. data
                            setSelectedCell={setSelectedCell}       // sync this with local modal state tracking
                        />
                    </div>
                )}
                {showDeleteCellModal && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <DeleteCellModal
                            setShowModal={setShowDeleteCellModal}
                            setCells={setCells}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}