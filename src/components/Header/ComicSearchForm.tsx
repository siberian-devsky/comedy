'use client'
import { useState, useEffect } from 'react';
import { SetCellsProps } from '@/types';

export default function ComicSearchForm({ setCells }: SetCellsProps) {
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        const searchHandler = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'k' && e.metaKey) {
                e.preventDefault()
                const input = document.querySelector('#comicSearchForm') as HTMLInputElement
                input?.focus()
            }
        }

        window.addEventListener('keydown', searchHandler)
        return () => window.removeEventListener('keydown', searchHandler)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch('/api/v1/cells', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ searchInput })
        })

        if (res.status === 404) {
            setCells([]) // return an empty case and let the client handle it
            return
        }
        
        const data = await res.json()
        setCells(data.comic)
    }
    
    return (
        <form className='w-full flex flex-row' 
            onSubmit={handleSubmit}>
            <input
                id='comicSearchForm'
                type='text'
                value={searchInput}
                onChange={ (e) => setSearchInput(e.target.value) }
                className='w-1/2 h-8 px-2 rounded-lg border border-icdb grow md:grow-0
                focus:outline-none focus:ring-2 focus:ring-icdb focus:bg-icdb/25'
                placeholder='meta + k to search ...'
            />
            <button
                type='submit'
                className='cursor-pointer min-w-16 h-8 rounded-lg text-icdb border-2 border-icdb ml-2'
            >
                FIND
            </button>
        </form>
    )   
}