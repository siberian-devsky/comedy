import { useState } from "react";
import { CellData, CellModalProps, opStatus } from "@/types"
import CloseButton from "./CloseButton";

export default function AddCellModal( {setShowModal, setCells}: CellModalProps ) {
    const [opStatus, setOpStatus] = useState<opStatus>({ message: null, status: 'ok' })

    const createCell = async(data: Omit<CellData, 'id'|'updated'>) => {
        try {
            const resp = await fetch('http://localhost:8080/api/v1/cells/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            const cellData = await resp.json()

            if (!resp.ok) {
                setOpStatus({ message: 'This cell already exists', status: 'nok' })
            } else {
                setOpStatus({ message: `${cellData.data.name} created`, status: 'ok' })
                setCells(prev => [...prev, cellData.data])
                localStorage.setItem('cache', JSON.stringify(cellData.data))
            }

        } catch (err) {
            setOpStatus({ message: `Could Not Create Cell: ${err}`, status: 'nok' })
            console.error('could not create cell: ', err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.name.valueOf()
        const hometown = form.hometown.value.trim()
        const imdbProfile = form.imdbProfile.value.trim()

        const missing: string[] = []
        if (!name) missing.push('name field')
        if (!hometown)  missing.push('icon field')
        if (!imdbProfile) missing.push('icon code field')

        if (missing.length > 0) {
            setOpStatus({ message: `missing: ${missing}`, status: 'nok' })
            return;
        }

        createCell({ name, hometown, imdbProfile });
    }

    return (
        <div className='relative w-[300px] h-[400px] border-4 border-emerald-400 rounded-2xl
            bg-slate-800 flex flex-col items-center justify-center'
        >
            <form className='w-full flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit}>
                <input name='name' type='text' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Add a name' autoFocus />
                <input name='hometown' type='text' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Add an icon or emoji' />
                <input name='imdbProfile' type='text' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Now add its code' />
                <button type='submit' className='w-3/4 bg-lime-600 text-black rounded-full tracking-widest py-1'>Add Cell</button>
            </form>
            <CloseButton setShowModal={setShowModal} />
            <div className={
                    `px-2 mt-4 min-h-[24px] transition-opacity duration-200
                    ${opStatus.message ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    ${opStatus.status === 'ok' ? 'text-emerald-400' : 'text-red-500'}
                `}
                >
                    {opStatus.message || '‎' /* invisible non-breaking space fallback */}
            </div>
        </div>
    )
}