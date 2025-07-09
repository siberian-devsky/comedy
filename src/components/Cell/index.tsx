'use client'
import { CellData } from '@/types';
// import { useState } from 'react';

type CellProps = CellData & {
    onClick?: () => void
}

export default function Cell({ id, name, hometown, imdbProfile, updated, onClick }: CellProps) {
    // const [on, setOn] = useState(false)

    if (id === undefined || name === undefined) return null

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
                <h1 className='text-xl'>{name}</h1>
                <h2 className='text-xl'>{hometown}</h2>
                <h2 className='text-xl'>{imdbProfile}</h2>
            </div>
        </button>
    )
}