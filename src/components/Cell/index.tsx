'use client'
import clsx from 'clsx'
import { CellData } from '@/types';
import { SetStateAction, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

type CellProps = CellData & {
    selectCellAndShowModal?: () => void
    showDeleteBoxes: boolean
    setNumCellsChecked: React.Dispatch<SetStateAction<number>>
    shouldReset: boolean
    acknowledgeReset: () => void
    setCellsToDelete: React.Dispatch<SetStateAction<string[]>>
}

export default function Cell({
    id,
    name,
    // hometown,
    imdbProfile,
    selectCellAndShowModal,
    showDeleteBoxes,
    setNumCellsChecked,
    shouldReset,
    acknowledgeReset,
    setCellsToDelete
}: CellProps) {
    const [checked, setChecked] = useState<boolean>(false)
    const {theme, } = useTheme()

    // Reset checked state when shouldReset becomes true
    useEffect(() => {
        if (shouldReset) {
            setChecked(false)
            acknowledgeReset() // Notify parent that reset has been processed
        }

    }, [shouldReset, acknowledgeReset])

    function handleClick(e: React.MouseEvent<HTMLInputElement>) {
        // dont open the edit modal
        e.stopPropagation()

        const input = e.target as HTMLInputElement
        const newCheckedState = input.checked
        
        if (showDeleteBoxes) {
            setChecked(newCheckedState)
            setNumCellsChecked(prev => newCheckedState ? prev + 1 : prev - 1)
        } else {
            setChecked(false)
        }

        setCellsToDelete(prev =>
            prev.includes(name)
                ? prev.filter(n => n !== name)
                : [...prev, name]
        )
    }

    return (
    <button
        id={id.toString()}
        className={clsx(
        checked && 'overflow-x-hidden',
        'relative',
        'w-[180px]',
        'aspect-square',
        'relative',
        'text-green-500',
        'border-4',
        'rounded-2xl',
        checked && showDeleteBoxes ? 'border-red-600' : 'border-blue-600'
        )}
        onClick={selectCellAndShowModal}
    >
        <div className='flex flex-col gap-1.5 items-center justify-center'>
            <a href={imdbProfile}><span className='text-pink-400'></span></a>
        </div>
        {showDeleteBoxes && (
        // top right corner of the cell
        <div className='absolute -top-2 -right-2'>
            <input
            type='checkbox'
            onClick={handleClick}
            className={clsx(
                'appearance-none',
                'w-6',
                'h-6',
                'border-2',
                'rounded-full',
                'cursor-pointer',
                'border-red-500',
                theme === 'dark' ? 'bg-black': 'bg-white',
                checked && 'bg-red-500 animate-ping',     
            )}
            />
        </div>
        )}
    </button>
    )
}