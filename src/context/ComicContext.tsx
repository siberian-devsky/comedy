'use client'

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from 'react'
import { Comic } from '@/types'

type ComicContextType = {
	selectedComicId: number
	setSelectedComicId: Dispatch<SetStateAction<number>>
	dataLoading: boolean
	setDataLoading: Dispatch<SetStateAction<boolean>>
	onStage?: Comic
	setonStage: Dispatch<SetStateAction<Comic | undefined>>
	searchHistory: Comic[] | undefined
	setSearchHistory: Dispatch<SetStateAction<Comic[]>>
}

const ComicContext = createContext<ComicContextType | undefined>(undefined)

export function ComicContextProvider({ children }: { children: ReactNode }) {
	const [selectedComicId, setSelectedComicId] = useState(-1)
	const [onStage, setonStage] = useState<Comic | undefined>()
	const [dataLoading, setDataLoading] = useState(false)
	const [searchHistory, setSearchHistory] = useState<Comic[]>([])

	// Fetch data
	// useEffect(() => {
	// 	setDataLoading(true)
	// 	const cache = localStorage.getItem('cache')
	// 	if (cache) {
	// 		setComics(JSON.parse(cache))
	// 		setDataLoading(false)
	// 	} else {
	// 		;(async () => {
	// 			try {
	// 				const res = await fetch(
	// 					'http://localhost:8080/api/v1/comics/all'
	// 				)
	// 				const data = await res.json()
	// 				setComics(data.comics)
	// 				localStorage.setItem('cache', JSON.stringify(data.comics))
	// 			} catch (err) {
	// 				console.error('fetch error:', err)
	// 			} finally {
	// 				setDataLoading(false)
	// 			}
	// 		})()
	// 	}
	// }, [setComics])

	return (
		<ComicContext.Provider
			value={{
				selectedComicId,
				setSelectedComicId,
				onStage,
				setonStage,
				dataLoading,
				setDataLoading,
				searchHistory,
				setSearchHistory,
			}}
		>
			{children}
		</ComicContext.Provider>
	)
}

export function useComicContext() {
	const context = useContext(ComicContext)
	if (!context) {
		throw new Error('useComicContext must be used within a ComicProvider')
	}
	return context
}
