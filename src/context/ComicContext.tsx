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
	dataLoading: boolean
	setDataLoading: Dispatch<SetStateAction<boolean>>
	onStage: Comic | undefined
	setonStage: Dispatch<SetStateAction<Comic | undefined>>
	searchHistory: Comic[] | []
	setSearchHistory: Dispatch<SetStateAction<Comic[]>>
}

const ComicContext = createContext<ComicContextType | undefined>(undefined)

export function ComicContextProvider({ children }: { children: ReactNode }) {
	const [onStage, setonStage] = useState<Comic>()
	const [dataLoading, setDataLoading] = useState(false)
	const [searchHistory, setSearchHistory] = useState<Comic[]>([])

	return (
		<ComicContext.Provider
			value={{
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
