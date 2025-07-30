'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useComicContext } from '@/context/ComicContext'
import { useUiContext } from '@/context/UiContext'
import { Comic } from '@/types'
import clsx from 'clsx'

export default function ComicSearchForm() {
	// context
	const { searchHistory, setSearchHistory, setonStage } = useComicContext()
	const { setIs404 } = useUiContext()
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
		const isMac = navigator.userAgent.toLowerCase().includes('mac')
		setPlaceholder(isMac ? '⌘K' : '⊞K')
	}, [])

	// escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				setSearchInput('')
			}
		}

		addEventListener('keydown', handleEscape)
		return () => removeEventListener('keydown', handleEscape)
	}, [])

	if (!mounted) return

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// search cache
		const cache = localStorage.getItem('cache')
		if (cache) {
			const data = JSON.parse(cache)
			const found = data.find(
				(comic: Comic) => comic.name === searchInput
			)
			if (found) { // update history
				const exists = searchHistory?.filter( (h) => h.name === found)
				if (!exists) {
					setSearchHistory((prev) => [...prev, found])
				}
				
				setonStage(found)
			}
		} else {
			// hit the network
			try {
				const res = await fetch(`/api/v1/getcomic/${searchInput}`, { method: 'GET' })
				const data = await res.json()

				if (!res.ok) {
					if (res.status === 404) {
						setIs404(true)
						return
					}
				}

				const comic: Comic = data.data
				
				// build the imdb url
				comic.imdb_id = `https://www.imdb.com/name/${comic.imdb_id}`

				setonStage(comic)
			} catch (err) {
				console.error(err)
			}
		}
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
