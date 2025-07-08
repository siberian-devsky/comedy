import { useState } from "react"
import { CellModalProps, opStatus } from "@/types"
import CloseButton from "./CloseButton"

export default function DeleteCellModal( {setShowModal, setCells}: CellModalProps ) {
    const [opStatus, setOpStatus] = useState<opStatus>( {message: null, status: 'ok'} )

    const deleteCell = async (name: string) => {
        try {
            const resp = await fetch(`http://localhost:8080/api/v1/cells/delete/${name}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: name })
            })

            const data = await resp.json()

            if (!resp.ok) {
                console.error(`${data.status}: ${data.message}`)
                setOpStatus( {message: data.message, status: 'nok'} )
            } else {
                console.log(data.data)
                setCells(prev => prev.filter( cell => cell.name != data.data.name ))
                setOpStatus( {message: `${name} deleted`, status: 'ok'} )
            }

        } catch (err) {
            setOpStatus( {message:`${err}`, status: 'nok'} )
            console.log(err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget

        const formData = new FormData(form)
        const name = formData.get('name')?.toString().trim() || 'testThisGetsRidOfTheTypeErrorOnLIne51'

        if (!formData || name === 'testThisGetsRidOfTheTypeErrorOnLIne51') {
            setOpStatus( {message: 'please enter a name', status: 'nok'} )
            return { error: opStatus}
        } else {
            deleteCell(name)
        }
    }

    return (
        <div className='absolute w-[300px] h-[400px] border-4 border-emerald-400 rounded-2xl
            bg-slate-800 flex flex-col items-center justify-center'
        >
            <CloseButton setShowModal={setShowModal}/>
            <form className='w-full flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit}>
                <input name="name" type="text" className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' autoFocus/>               
                <button type='submit' className='w-3/4 bg-pink-800 rounded-full tracking-widest py-1'>Delete Cell</button>
            </form>
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