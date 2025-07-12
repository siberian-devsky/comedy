import { useState } from "react"
import { CellModalProps, opStatus } from "@/types"
import CloseButton from "./CloseButton"

export default function DeleteCellModal( {setShowModal, setCells}: CellModalProps ) {
    const [opStatus, setOpStatus] = useState<opStatus>( {message: null, status: 'ok'} ) // Track operation status

    // Delete cell from backend API
    const deleteCell = async (name: string) => {
        try {
            const resp = await fetch(`http://localhost:8080/api/v1/cells/delete/${name}`, { // API endpoint for deletion
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: name })
            })

            const data = await resp.json()

            if (!resp.ok) {
                console.error(`${data.status}: ${data.message}`)
                setOpStatus( {message: data.message, status: 'nok'} ) // Set error status
            } else {
                console.log(data.data)
                setCells(prev => prev.filter( cell => cell.name != data.data.name )) // Remove from local state
                localStorage.setItem('cache', JSON.stringify(data.data)) // Update cache
                setOpStatus( {message: `${name} deleted`, status: 'ok'} ) // Set success status
            }

        } catch (err) {
            setOpStatus( {message:`${err}`, status: 'nok'} ) // Set error status
            console.log(err)
        }
    }

    // Handle form submission for cell deletion
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() // Prevent default form submission
        const form = e.currentTarget

        const formData = new FormData(form)
        const name = formData.get('name')?.toString().trim() || 'testThisGetsRidOfTheTypeErrorOnLIne51' // Get cell name

        if (!formData || name === 'testThisGetsRidOfTheTypeErrorOnLIne51') {
            setOpStatus( {message: 'please enter a name', status: 'nok'} ) // Validation error
            return { error: opStatus}
        } else {
            deleteCell(name) // Proceed with deletion
        }
    }

    return (
        <div className='absolute w-[280px] sm:w-[300px] md:w-[350px] h-[350px] sm:h-[400px] md:h-[450px] border-4 border-emerald-400 rounded-2xl
            bg-slate-800 flex flex-col items-center justify-center mx-4 sm:mx-0' // Responsive modal sizing
        >
            <CloseButton setShowModal={setShowModal}/>
            {/* Delete form with cell name input */}
            <form className='w-full flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6' onSubmit={handleSubmit}>
                <input 
                    name="name" 
                    type="text" 
                    className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base' 
                    autoFocus // Auto-focus on input
                    placeholder="Enter cell name to delete"
                />               
                <button 
                    type='submit' 
                    className='w-full sm:w-3/4 bg-pink-800 rounded-full tracking-widest py-2 sm:py-3 text-sm sm:text-base font-medium hover:bg-pink-700 transition-colors'
                >
                    Delete Cell
                </button>
            </form>
            {/* Status message display */}
            <div className={
                `px-2 mt-4 min-h-[24px] transition-opacity duration-200 text-center text-sm sm:text-base
                ${opStatus.message ? 'opacity-100 visible' : 'opacity-0 invisible'} // Show/hide based on message
                ${opStatus.status === 'ok' ? 'text-emerald-400' : 'text-red-500'}` // Color based on status
            >
                {opStatus.message || '‎' /* invisible non-breaking space fallback */}
            </div>
        </div>
    )
}