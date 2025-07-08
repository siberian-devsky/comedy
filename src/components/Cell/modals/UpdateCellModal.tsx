import { SetStateAction, useState } from "react";
import { CellData, PutCellData } from "@/types";
import { CellModalProps, opStatus } from "@/types"
import CloseButton from "./CloseButton";

type UpdateCellModalProps = CellModalProps & {
  selectedCell: CellData
  setSelectedCell: React.Dispatch<SetStateAction<CellData | null>>
  setShowModal: React.Dispatch<SetStateAction<boolean>>
  setCells: React.Dispatch<SetStateAction<CellData[]>>
}

export default function UpdateCellModal({
    selectedCell,
    setSelectedCell,
    setShowModal,
    setCells,
}: UpdateCellModalProps) {
    const [opStatus, setOpStatus] = useState<opStatus>({ message: null, status: 'ok' })

    if (!selectedCell) return null

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

    const updateCell = async(data: PutCellData) => {
        // sanity check / find the dissidents
        const missing: string[] = []
        if (!data.name)      missing.push('name field')
        if (!data.icon)      missing.push('icon field')
        if (!data.iconCode)  missing.push('icon code field')

        console.log("check for missing field data")
        if (missing.length > 0) {
            console.debug('well this length thing is awkward')
            setOpStatus({ message: `missing: ${missing}`, status: 'nok' })
            return;
        }

        try {
            const resp = await fetch(`http://localhost:8080/api/v1/cells/update/${data.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            if (!resp.ok) {
                setOpStatus({ message: 'Could not update cell', status: 'nok' })
                return
            }

            const responseData = await resp.json()
            const updatedCellData: CellData = responseData.message.newData
            
            setCells(prevCells => prevCells.map(
                (cell) => cell.id === updatedCellData.id ? updatedCellData : cell
            ))

            setSelectedCell(updatedCellData)

            setOpStatus({ message: 'Cell Updated', status: 'ok' })

        } catch (err) {
            setOpStatus({ message: `Could Not Update Cell: ${err}`, status: 'nok' })
            console.error('could not create cell: ', err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        const form = e.currentTarget;
        const name = form.cellName.value.trim();
        const icon = form.icon.value.trim();
        const iconCode = form.iconCode.value.trim();
        const currentValue = Number(form.currentValue.value);
        
        console.log("submit data loaded")
    
        if (submitter.name === 'update') {
            const id = selectedCell.id
            console.log("call the PUT gods")
            updateCell({ id, name, icon, iconCode, currentValue: currentValue });
        } else if (submitter.name === 'delete') {
            console.log("call the DELETE gods")
            deleteCell(name)
        } else {
            setOpStatus({
                message: 'A very impossible thing happend today...',
                status: 'nok'
            })
        }
    }

    return (
        <div className='relative w-[300px] h-[400px] border-4 border-emerald-400 rounded-2xl
                bg-slate-800 flex flex-col items-center justify-center'
            >
                <CloseButton setShowModal={setShowModal} />
                <form 
                    className='w-full flex flex-col items-center justify-center gap-4 grow-0 shrink-0'
                    onSubmit={handleSubmit}
                >
                    <h1 className="tracking-wider text-emerald-400 font-bold text-2xl">
                        {selectedCell.name}
                    </h1>
                    <input
                        defaultValue={selectedCell?.name}
                        name="cellName"
                        type="text"
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder="pick a number..."
                        />
                    <input
                        defaultValue={selectedCell?.icon}
                        name='icon'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Add an icon or emoji' />
                    <input
                        defaultValue={selectedCell?.iconCode}
                        name='iconCode'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Now add its code' />
                    <input
                        defaultValue={selectedCell?.currentValue}
                        name='currentValue'
                        type='number'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Pick a number' />
                    <button
                        type='submit'
                        name="update"
                        value="true"
                        className='w-3/4 bg-lime-600 text-black rounded-full tracking-widest py-1'
                    >   Update
                    </button>
                    <button
                        type='submit'
                        name="delete"
                        value="true"
                        className='w-3/4 bg-pink-800 rounded-full tracking-widest py-1'
                    >   Delete Cell
                    </button>
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