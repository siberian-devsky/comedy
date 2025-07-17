import React from "react"
import { SetStateAction } from "react"

export type CellData = {
  id:          number
  name:        string    
  hometown:    string
  imdbProfile: string
  updated: Date
} | null

export type CellModalProps = {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
}

export type SetCellsProps = {
  setCells: React.Dispatch<React.SetStateAction<CellData[]>>;
};

export type opStatus = {
    message: string | null
    status: 'ok' | 'nok'
}