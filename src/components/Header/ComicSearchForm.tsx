'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CellData } from '@/types';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

type SearchProps = {
    setCells: Dispatch<SetStateAction<CellData>>
}

export default function ComicSearchForm({
    setCells,
}: SearchProps) {
    const [searchInput, setSearchInput] = useState('')
    const [mounted, setMounted] = useState(false)
    const [placeholder, setPlaceholder] = useState('Search ...')
    const {theme, } = useTheme()
    
    useEffect( () => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const searchHandler = (e: KeyboardEvent) => {
            if (typeof e.key !== 'string') return
            if (e.key.toLowerCase() === 'k' && e.metaKey) {
                e.preventDefault()
                // resize search bar on focus
                const comicSearchForm = document.querySelector('#comicSearchForm') as HTMLInputElement
                comicSearchForm?.classList.add('w-72', 'transition-all', 'duration-300', 'ease-in')
                comicSearchForm?.focus()
            }
        }
        
        window.addEventListener('keydown', searchHandler)
        return () => window.removeEventListener('keydown', searchHandler)
    }, [])

    useEffect(() => {
        if (!mounted) return;

        if (typeof window === 'undefined') return;

        const isMac = navigator.userAgent.toLowerCase().includes('mac');
        setPlaceholder(isMac ? '⌘K' : '⊞K');
    }, [mounted]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch('/api/v1/cells', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ searchInput })
        })

        if (res.status === 404) {
            setCells([])
            return
        }
        
        const data = await res.json()
        setCells(data.comic)
    }
    
    return (
        <form id='formContainer' className={clsx(
            'w-36 md:w-56 lg:w-[350px] flex flex-row'
        )} 
            onSubmit={handleSubmit}>
            <input
                id='comicSearchForm'
                type='text'
                value={searchInput}
                onChange={ (e) => setSearchInput(e.target.value) }
                className={clsx(
                    'h-8 px-2 rounded-lg border grow md:grow-0',
                    'focus:outline-none focus:ring-2',
                    theme === 'dark'
                        ? 'bg-black text-icdb border-icdb focus:ring-icdb focus:bg-icdb/25'
                        : 'bg-white text-black border-black focus:ring-black focus:bg-black/25'
                )}
                placeholder={placeholder}
            />
            <button
                type='submit'
                className={clsx(
                    'cursor-pointer min-w-16 h-8 rounded-lg border-2 border-icdb ml-2',
                    theme === 'dark'
                        ? 'bg-black text-icdb'
                        : 'bg-white text-black'
                )}
            >
                find
            </button>
        </form>
    )   
}