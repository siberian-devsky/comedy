import { SetStateAction } from "react";
import { CellData } from "@/types";
import CloseButton from "./CloseButton";

type CellModalProps = {
  selectedCell: CellData
  setShowModal: React.Dispatch<SetStateAction<boolean>>
}

export default function CellModal({
    selectedCell,
    setShowModal,
}: CellModalProps) {

    if (!selectedCell) return null

    return (
        <div className='relative w-[300px] h-[400px] border-4 border-emerald-400 rounded-2xl
                bg-slate-800 flex flex-col items-center justify-center'
            >
                <CloseButton setShowModal={setShowModal} />
                <div 
                    className='w-full flex flex-col items-center justify-center gap-4 grow-0 shrink-0'>
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
                        defaultValue={selectedCell?.hometown}
                        name='icon'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Add an icon or emoji' />
                    <input
                        defaultValue={selectedCell?.imdbProfile}
                        name='iconCode'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Now add its code' />
                </div>
                
        </div>
    )
}