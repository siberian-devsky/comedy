'use client'
import { CellData } from '@/types';
// import { useState } from 'react';

type CellProps = CellData & {
    onClick?: () => void
}

export default function Cell({ id, name, icon, onClick }: CellProps) {
    // const [on, setOn] = useState(false)

    if (id === undefined || name === undefined || icon === undefined) return null

    return (
        <button
            // database id
            id={id.toString()}
            className=
                {`w-[120px] aspect-square
                ${true ? 'text-green-500 border-4 border-blue-600' : 'bg-slate-500'}
                rounded-2xl`}
            onClick={ onClick }
        >
            <div className='flex flex-col gap-1.5'>
                <h1 className='text-2xl'>{name}</h1>
                <h2 className='text-4xl'>{icon}</h2>
            </div>
        </button>
    )
}