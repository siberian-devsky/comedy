'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useComicContext } from '@/context/ComicContext'
import { Comic } from '@/types'
import clsx from 'clsx'

export default function ComicSearchForm() {
	// context
	const { searchHistory, setSearchHistory, setonStage } = useComicContext()
	const { theme } = useTheme()
	const [searchInput, setSearchInput] = useState('')
	const [mounted, setMounted] = useState(false)
	const [placeholder, setPlaceholder] = useState('Search ...')

	const router = useRouter()

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

	// punch out if not mounted
	if (!mounted) return

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let comic

		// search cache
		const historyCache = sessionStorage.getItem('history')

		if (historyCache) {
			const data = JSON.parse(historyCache)
			comic = data.find((comic: Comic) => comic.name === searchInput)
		}
		
		if (comic) {
			// update history
			setSearchHistory((prev) => [...prev, comic])
			
			// showtime
			setonStage(comic)

			// save last comic lastSelected
			sessionStorage.setItem('latest', JSON.stringify(comic)) 
		
		} else {
			// hit the network
			try {
				const res = await fetch(`/api/v1/getcomic/${searchInput}`, {
					method: 'GET',
				})
				const data = await res.json()

				if (!res.ok) {
					if (res.status === 404) {
						router.push('/not-found')
						return
					}
				}

				// great success!!
				const comic: Comic = data.data

				// build the imdb url
				comic.imdb_id = `https://www.imdb.com/name/${comic.imdb_id}`

				// update history and copy to cache
				const updatedHistory = [...searchHistory, comic]
				setSearchHistory(updatedHistory)
				sessionStorage.setItem('history', JSON.stringify(updatedHistory))

				//! action
				setonStage(comic)

				// save last comic lastSelected
				sessionStorage.setItem('latest', JSON.stringify(comic)) 

			} catch (err) {
				console.error(err)
			}
		}
	}


	const handleClick = () => {
		setonStage(undefined)
		setSearchHistory([])
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
						? 'bg-black text-icdb border-pyellow focus:ring-icdb focus:bg-pyellow/25'
						: 'bg-white text-black border-black focus:ring-black focus:bg-black/25'
				)}
				placeholder={placeholder}
			/>
			<button
				type='submit'
				className={clsx(
					'cursor-pointer min-w-16 h-8 rounded-lg border border-pyellow ml-2',
					theme === 'dark'
						? 'bg-black text-pyellow'
						: 'bg-pyellow text-black'
				)}
			>
				find
			</button>
			{searchHistory.length > 0 && 
				<button
					className={clsx(
						'cursor-pointer min-w-16 h-8 rounded-lg border border-pyellow ml-2',
						theme === 'dark'
							? 'bg-black text-pyellow'
							: 'bg-pyellow text-black'
					)}
					onClick={ () => handleClick()}
				>
					clear
				</button>
			}
		</form>
	)
}
