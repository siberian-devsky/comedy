'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useComicContext } from '@/context/ComicContext'
import { Comic, ComicData } from '@/types'

export default function ComicSearchForm() {
	// context
	const { setComics } = useComicContext()
	const { theme } = useTheme()
	const [searchInput, setSearchInput] = useState('')
	const [mounted, setMounted] = useState(false)
	const [placeholder, setPlaceholder] = useState('Search ...')

	useEffect(() => {
		setMounted(true)
	}, [])

	// meta + k
	useEffect(() => {
		const searchHandler = (e: KeyboardEvent) => {
			if (typeof e.key !== 'string') return
			if (e.key.toLowerCase() === 'k' && e.metaKey) {
				e.preventDefault()
				// resize search bar on focus
				const comicSearchForm = document.querySelector(
					'#comicSearchForm'
				) as HTMLInputElement
				comicSearchForm?.classList.add(
					'w-72',
					'transition-all',
					'duration-300',
					'ease-in'
				)
				comicSearchForm?.focus()
			}
		}

		addEventListener('keydown', searchHandler)
		return () => removeEventListener('keydown', searchHandler)
	}, [])

	// set placeholder
	useEffect(() => {
		if (!mounted) return

		if (typeof window === 'undefined') return

		const isMac = navigator.userAgent.toLowerCase().includes('mac')
		setPlaceholder(isMac ? '⌘K' : '⊞K')
	}, [mounted])

	// escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				setSearchInput('')

				// restore list
				const cache = localStorage.getItem('cache')
				if (cache) {
					const data: ComicData = JSON.parse(cache)
					setComics(data)
				}
			}
		}

		addEventListener('keydown', handleEscape)
		return () => removeEventListener('keydown', handleEscape)
	}, [setComics])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const cache = localStorage.getItem('cache')
		if (cache) {
			const data = JSON.parse(cache)
			const found = data.find((comic: Comic) => comic.name === searchInput)
			if (found) setComics([found])
		} else {
			const res = await fetch('/api/v1/cells', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ searchInput: searchInput }),
			})

			if (res.status === 404) {
				setComics([])
				return
			}

			// set the view
			const data = await res.json()
			setComics(data.comic)
		}

		// update the search field
		setSearchInput(prev => prev + ' ..esc to clear')
	}

	return (
		<form
			id='formContainer'
			className={clsx('w-36 md:w-56 lg:w-[350px] h-auto flex flex-row')}
			onSubmit={handleSubmit}
		>
			<input
				id='comicSearchForm'
				type='text'
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				className={clsx(
					'h-8 px-2 rounded-lg border',
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
