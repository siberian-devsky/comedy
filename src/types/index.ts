import React from 'react'
import { SetStateAction } from 'react'

export type Comic = {
	biography: string
	homepage: string
	id: string
	imdb_id: string
	name: string
	place_of_birth: string
	profile_path: string
}

export type ComicData = Comic[] | null

export type CellModalProps = {
	setShowModal: React.Dispatch<SetStateAction<boolean>>
}

export type OpStatus = {
	status: number
	statusText: string | null
	color: 'green' | 'red'
}
