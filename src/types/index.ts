import React from 'react'
import { SetStateAction } from 'react'

export type Comic = {
	adult: boolean
	also_known_as: string[]
	biography: string
	birthday: string | null
	deathday: string | null
	gender: number
	homepage: string | null
	id: number
	imdb_id: string
	known_for_department: string
	name: string
	place_of_birth: string
	popularity: number
	profile_path: string | null
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
