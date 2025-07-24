import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

// GET /comics - get all comics
export async function GetAllComics(
	req: Request,
	res: Response
): Promise<Response> {
	try {
		const comicData = await prisma.comic.findMany()

		if (!comicData) {
			return res.status(404).json({
				status: 404,
				message: 'Comics not found',
			})
		}

		return res.status(200).json({
			status: 200,
			message: 'get all comics ok',
			comics: comicData,
		})
	} catch (err) {
		console.error('GetAllComics error:', err)
		return res.status(500).json({
			status: 500,
			message: 'Internal Server Error',
		})
	}
}

// GET /comics - get one cell by name
export async function GetOneComicByName(
	req: Request,
	res: Response
): Promise<Response> {
	const { searchInput } = req.body

	try {
		const data = await prisma.comic.findFirst({
			where: { name: searchInput },
		})

		if (!data) {
			return res.status(404).json({
				status: 404,
				message: `Cell '${searchInput}' not found`,
			})
		}

		// client expects a list
		const dataAsList = [data]

		return res.status(200).json({
			status: 200,
			message: `${searchInput} fetched`,
			comic: dataAsList,
		})
	} catch (err) {
		console.error('GetOneCellByName error:', err)
		return res.status(500).json({
			status: 500,
			mesage: 'Internal Server Error',
		})
	}
}
