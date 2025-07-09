import { SetStateAction } from "react"

export type CellData = {
  id:          number
  name:        string    
  hometown:    string
  imdbProfile: string
  updated: Date
}

export type CellModalProps = {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
    setCells: React.Dispatch<SetStateAction<CellData[]>>
}

export type opStatus = {
    message: string | null
    status: 'ok' | 'nok'
}