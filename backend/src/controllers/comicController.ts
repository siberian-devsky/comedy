import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'
import { PersonDetail } from '../types'

const prisma = new PrismaClient()


// GET /comics - get all comics
export async function GetAllComics(req: Request, res: Response): Promise<void> {
	try {
		const comicData = await prisma.comic.findMany()

		if (!comicData) {
			res.status(404).json({
				status: 404,
				message: 'Comics not found',
			})
			return
		}
		// filtered Data
		res.status(200).json({
			status: 200,
			message: 'get all comics ok',
			comics: comicData,
		})
		return
	} catch (err) {
		console.error('GetAllComics error:', err)
		res.status(500).json({
			status: 500,
			message: 'Internal Server Error',
		})
		return
	}
}

// GET /comics - get one comic by name
export async function FindComicByName(req: Request, res: Response): Promise<void> {
	const auth: string|undefined = process.env.TMDB_API_BAT
	if (!auth) {
		res.status(401).json({
			status: 401,
			data: {},
			message: 'Invalid access token',
		})
		return
	}

	const name = req.params.name || 'Dave Chappelle'
	const rootUrl = 'https://api.themoviedb.org/3'
	const personUrl = encodeURI(`${rootUrl}/search/person?query=${name}&include_adult=false&language=en-US&page=1`)

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${auth}`,
		},
	}

	try {
		// get details
		const searchResponse = await fetch(personUrl, options)
		if (!searchResponse.ok) { // just deal with 404 & 5xx for now; 401 handled above
			if (searchResponse.status === 404) {
				res.status(404).json({
					status: 404,
					data: {},
					message: `${name} ain't in here`
				})

				return
			} else {
				throw new Error(`MAIN: TMDB returned a bad status: ${searchResponse.statusText}`)
			}
		}

		const searchData = await searchResponse.json()
		if (searchData.total_results === 0) {
			res.status(404).json({
					status: 404,
					data: {},
					message: `${name} ain't in here`
			})
			return
		}

		const profile = searchData.results[0]
		if (!profile?.id) {
			res.status(404).json({
				status: 404,
				data: {},
				message: `${name} ain't in here`
			})
			return
		}

		console.debug(`Found ID: ${profile.id}`)
		const detailsUrl = encodeURI(`${rootUrl}/person/${profile.id}`)

		const detailsResponse = await fetch(detailsUrl, options)
		if (!detailsResponse.ok) {
			throw new Error(`DETAILS: TMDB returned a bad status: ${detailsResponse.statusText}`)
		}

		const detailsData: PersonDetail = await detailsResponse.json()

		// split name into parts for easier FE consumption
		const nameParts = detailsData.name.split(' ')
		detailsData.firstName = nameParts[0]
		detailsData.lastName = nameParts.slice(1).join(' ')

		// filter out stuff FE does not need
		const omit = [
			'adult',
			'also_known_as',
			'birthday',
			'deathday',
			'gender',
			'known_for_department',
			'popularity',
		]

		const filteredResponse = Object.fromEntries(
			Object.entries(detailsData).filter( ([key]) => !omit.includes(key) )
		)

		res.status(200).json({
			status: 200,
			data: filteredResponse,
			message: res.statusMessage,
		})
		return

	} catch (err) {
		console.error(err)
		res.status(500).json({
			status: 500,
			data: null,
			message: res.statusMessage,
		})
		return
	}
}
