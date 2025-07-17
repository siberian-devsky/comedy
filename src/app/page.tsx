'use client';
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import CellModal from '@/components/Cell/modals/CellModal';
import { CellData } from '@/types';
import Header from '@/components/Header';

export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([]);
    const [showCellModal, setShowCellModal] = useState(false);
    const [selectedCell, setSelectedCell] = useState<CellData>(null);
    const [dataLoading, setDataLoading] = useState(false);

    // Fetch data
    useEffect(() => {
        setDataLoading(true);
        const cache = localStorage.getItem('cache');
        if (cache) {
            setCells(JSON.parse(cache));
            setDataLoading(false);
        } else {
            (async () => {
                try {
                    const res = await fetch('http://localhost:8080/api/v1/cells/all');
                    const data = await res.json();
                    setCells(data.comics);
                    localStorage.setItem('cache', JSON.stringify(data.comics));
                } catch (err) {
                    console.error('fetch error:', err);
                } finally {
                    setDataLoading(false);
                }
            })();
        }
    }, []);

    // Lock scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = showCellModal ? 'hidden' : 'auto';
    }, [showCellModal]);

    // Close modal on Escape
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowCellModal(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Header setCells={setCells} />

            <main className="flex flex-row h-full w-full overflow-hidden">
                {/* Sidebar (Left) */}
                <aside className="w-1/4 min-w-[300px] max-w-[400px] h-full overflow-y-auto border-r border-gray-200">
                    {dataLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <div id="comedyStack" className="flex flex-col items-center gap-8 p-4">
                            {cells
                                .filter((cell): cell is CellData => !!cell)
                                .map((cell, i) => (
                                    <Cell
                                        key={cell.id}
                                        {...cell}
                                        isCellIndexEven={i % 2 === 0}
                                        selectCellAndShowModal={() => {
                                            setSelectedCell(cell);
                                            setShowCellModal(true);
                                        }}
                                    />
                                ))}
                        </div>
                    )}
                </aside>

                {/* Main Content (Right) */}
                <section className="flex-1 h-full overflow-y-auto p-6">
                    {/* Hero or other main content goes here */}
                    {/* <Hero /> */}
                    <div className="text-xl font-semibold text-gray-500">
                        Select a comic from the sidebar to view details.
                    </div>
                </section>
            </main>

            {/* Modal */}
            {showCellModal && (
                <div className="fixed inset-0 z-50 backdrop-brightness-50 flex items-center justify-center p-4">
                    <CellModal
                        selectedCell={selectedCell}
                        setShowModal={setShowCellModal}
                    />
                </div>
            )}
        </div>
    );
}