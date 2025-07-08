import { SetStateAction } from "react"


export type PutCellData = {
  id: number
  name: string
  icon: string
  iconCode: string
  currentValue: number
}

export type PostCellData = Omit<PutCellData, 'id'>

export type CellData = {
  id: number
  name: string
  icon: string
  iconCode: string
  currentValue: number
  lastUpdated: Date
}

export type CellModalProps = {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
    setCells: React.Dispatch<SetStateAction<CellData[]>>
}

export type opStatus = {
    message: string | null
    status: 'ok' | 'nok'
}