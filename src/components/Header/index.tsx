'use client'
// import ThemeToggleButton from "../Theme/ThemeToggleButton"
import HomeGrownToggle from "../Theme/HomeGrownToggle"

type HeaderProps = {
    showAddCellModal: React.Dispatch<React.SetStateAction<boolean>>,
    showDeleteCellModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Header({
    showAddCellModal: showAddCellModal,
    showDeleteCellModal: showDeleteCellModal
}: HeaderProps ) {
    return(
        <header 
            className="fixed top-0 left-0 border border-black bg-purple-500/10 z-10
                w-screen h-16 flex flex-row items-center justify-between
                px-4 py-2"
        >
            <div className="flex gap-4">
                <button className="text-xs w-auto p-2 rounded-2xl border-[1px] border-slate-700 hover:bg-lime-600"
                    onClick={() => showAddCellModal(true)}
                    >
                    Add Cell
                </button>
                <button className="text-xs w-auto p-2 rounded-2xl border-[1px] border-slate-700 hover:bg-red-600"
                    onClick={() => showDeleteCellModal(true)}
                >
                    Remove Cell
                </button>
            </div>
            {/* <ThemeToggleButton /> */}
            <HomeGrownToggle />
        </header>
    )
}