import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'

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
export async function GetOneComicByName(
	req: Request,
	res: Response
): Promise<void> {
	const { searchInput } = req.body

	try {
		const data = await prisma.comic.findFirst({
			where: { name: searchInput },
		})

		if (!data) {
			res.status(404).json({
				status: 404,
				message: `Cell '${searchInput}' not found`,
			})
			return
		}

		// client expects a list
		const dataAsList = [data]

		res.status(200).json({
			status: 200,
			message: `${searchInput} fetched`,
			comic: dataAsList,
		})
	} catch (err) {
		console.error('GetOneCellByName error:', err)
		res.status(500).json({
			status: 500,
			mesage: 'Internal Server Error',
		})
	}
}

// GET test to https://api.themoviedb.org/3
export async function GetComic(req: Request, res: Response): Promise<void> {
	const auth = process.env.TMDB_API_BAT
	if (!auth) {
		res.status(401).send({
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
		const searchResponse = await fetch(personUrl, options)
		if (!searchResponse.ok) {
			throw new Error(`MAIN: TMDB returned a bad status: ${searchResponse.statusText}`)
		}

		const searchData = await searchResponse.json()
		const profile = searchData.results[0]
		if (!profile?.id) {
			throw new Error('No matching profile found')
		}

		console.log(`Found ID: ${profile.id}`)
		const detailsUrl = `${rootUrl}/person/${profile.id}`

		const detailsResponse = await fetch(detailsUrl, options)
		if (!detailsResponse.ok) {
			throw new Error(`DETAILS: TMDB returned a bad status: ${detailsResponse.statusText}`)
		}

		const detailsData = await detailsResponse.json()

		res.status(200).send({
			status: 200,
			data: detailsData,
			message: res.statusMessage,
		})
	} catch (err) {
		console.error(err)
		res.status(500).send({
			status: 500,
			data: {},
			message: res.statusMessage,
		})
	}
}
