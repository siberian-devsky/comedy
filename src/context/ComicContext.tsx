'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { Comic, ComicData } from '@/types'

type ComicContextType = {
  comics: ComicData
  setComics: React.Dispatch<React.SetStateAction<ComicData>>
  selectedComicId: number
  setSelectedComicId: React.Dispatch<React.SetStateAction<number>>
  dataLoading: boolean
  comicOnStage?: Comic
}

const ComicContext = createContext<ComicContextType | undefined>(undefined)

export function ComicContextProvider({ children }: { children: ReactNode }) {
  const [comics, setComics] = useState<ComicData>([])
  const [selectedComicId, setSelectedComicId] = useState(-1)
  const [comicOnStage, setComicOnStage] = useState<Comic | undefined>()
  const [dataLoading, setDataLoading] = useState(false)

  // Fetch data
  useEffect(() => {
    setDataLoading(true)
    const cache = localStorage.getItem('cache')
    if (cache) {
      setComics(JSON.parse(cache))
      setDataLoading(false)
    } else {
      ;(async () => {
        try {
          const res = await fetch(
            'http://localhost:8080/api/v1/cells/all'
          )
          const data = await res.json()
          setComics(data.comics)
          localStorage.setItem('cache', JSON.stringify(data.comics))
        } catch (err) {
          console.error('fetch error:', err)
        } finally {
          setDataLoading(false)
        }
      })()
    }
  }, [setComics])

  useEffect(() => {
    if (comics && selectedComicId > 0) {
      setComicOnStage(() =>
        comics.find((comic) => comic.id === selectedComicId)
      )
    }
  }, [comics, selectedComicId])

  return (
    <ComicContext.Provider
      value={
        {
          comics, setComics,
          selectedComicId, setSelectedComicId,
          comicOnStage, dataLoading
        }
      }
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
