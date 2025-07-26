import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

// GET /comics - get all comics
export async function GetAllComics(
	req: Request,
	res: Response
): Promise<void> {
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

// GET test to https://www.themoviedb.org/
export async function TmdbTest(req: Request, res: Response): Promise<void> {
	const url = 'https://api.themoviedb.org/3/authentication'
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGY2YzQ0Y2VjNTdlNDlmNDgyMzJmYzU2NzAwM2IxYSIsIm5iZiI6MTc1MjYxODk4MC44NzgsInN1YiI6IjY4NzZkN2U0ZjE4NzFhZGY4ODA1MjIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KwDn0qgfoorhK4KXcywssqhSl5jSljy8qiXejVbu168',
		},
	}

	console.log(url, options)

	res.json({ message: 'TMDB test endpoint' })
}
