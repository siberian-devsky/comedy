import { useState } from 'react';
import { CellData, CellModalProps, opStatus } from '@/types'
import CloseButton from './CloseButton';

export default function AddCellModal( {setShowModal, setCells}: CellModalProps ) {
    const [opStatus, setOpStatus] = useState<opStatus>({ message: null, status: 'ok' }) // Track operation status

    // Create new cell via backend API
    const createCell = async(data: Omit<CellData, 'id'|'updated'>) => {
        try {
            const resp = await fetch('http://localhost:8080/api/v1/cells/create', { // API endpoint for creation
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            const cellData = await resp.json()

            if (!resp.ok) {
                setOpStatus({ message: 'This cell already exists', status: 'nok' }) // Handle duplicate error
            } else {
                setOpStatus({ message: `${cellData.data.name} created`, status: 'ok' }) // Success message
                setCells(prev => [...prev, cellData.data]) // Add to local state
                localStorage.setItem('cache', JSON.stringify(cellData.data)) // Update cache
            }

        } catch (err) {
            setOpStatus({ message: `Could Not Create Cell: ${err}`, status: 'nok' }) // Handle network error
            console.error('could not create cell: ', err)
        }
    }

    // Handle form submission for cell creation
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Prevent default form submission
        const form = e.currentTarget;
        const name = form.name.valueOf() // Get name value
        const hometown = form.hometown.value.trim() // Get hometown value
        const icdbProfile = form.icdbProfile.value.trim() // Get icdb profile value

        const missing: string[] = []
        if (!name) missing.push('name field') // Validate name
        if (!hometown)  missing.push('icon field') // Validate hometown
        if (!icdbProfile) missing.push('icon code field') // Validate icdb profile

        if (missing.length > 0) {
            setOpStatus({ message: `missing: ${missing}`, status: 'nok' }) // Show validation errors
            return;
        }

        createCell({ name, hometown, icdbProfile }); // Proceed with creation
    }

    return (
        <div className='relative w-[280px] sm:w-[300px] md:w-[350px] h-[350px] sm:h-[400px] md:h-[450px] border-4 border-emerald-400 rounded-2xl
            bg-slate-800 flex flex-col items-center justify-center mx-4 sm:mx-0' // Responsive modal sizing
        >
            {/* Add cell form with all required fields */}
            <form className='w-full flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6' onSubmit={handleSubmit}>
                <input 
                    name='name' 
                    type='text' 
                    className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base' 
                    placeholder='Add a name' 
                    autoFocus // Auto-focus on first input
                />
                <input 
                    name='hometown' 
                    type='text' 
                    className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base' 
                    placeholder='Add an icon or emoji' 
                />
                <input 
                    name='icdbProfile' 
                    type='text' 
                    className='w-full sm:w-3/4 h-8 sm:h-10 border-[3px] px-3 sm:px-4 border-pink-800 rounded-full text-sm sm:text-base' 
                    placeholder='Now add its code' 
                />
                <button 
                    type='submit' 
                    className='w-full sm:w-3/4 bg-lime-600 text-black rounded-full tracking-widest py-2 sm:py-3 text-sm sm:text-base font-medium hover:bg-lime-500 transition-colors'
                >
                    Add Cell
                </button>
            </form>
            <CloseButton setShowModal={setShowModal} />
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