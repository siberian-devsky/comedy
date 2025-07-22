import React from 'react'
import { SetStateAction } from 'react'

export type Comic = {
	id: number
	name: string
	hometown: string
	imdbProfile: string
	updated: Date
}

export type ComicData = Comic[] | null

export type CellModalProps = {
	setShowModal: React.Dispatch<SetStateAction<boolean>>
}

export type opStatus = {
	message: string | null
	status: 'ok' | 'nok'
}
