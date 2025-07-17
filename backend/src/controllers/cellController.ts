import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

// GET /cells - get all cells
export async function GetAllCells(req: Request, res: Response): Promise<Response> {
  try {
    const comicData = await prisma.comic.findMany()

    if (!comicData) {
      return res.status(404).json({
        status: 404,
        message: 'Cells not found'
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'get all cells ok',
      comics: comicData
    })
  } catch (err) {
    console.error("GetAllCells error:", err)
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// GET /cells - get one cell by id
export async function GetOneCellByName(req: Request, res: Response): Promise<Response> {
  const { searchInput } = req.body
  
  try {
    const data = await prisma.comic.findFirst({ where: {name: searchInput}})

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Cell '${searchInput}' not found`
      })
    }

    return res.status(200).json({
      status: 200,
      message: `${searchInput} fetched`,
      comic: data
    })
  } catch (err) {
    console.error("GetOneCellByName error:", err)
    return res.status(500).json({
      status: 500,
      mesage: "Internal Server Error"
    })
  }
}