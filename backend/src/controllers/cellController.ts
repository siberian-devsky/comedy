import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

// GET /cells - get all cells
export async function getAllCells(req: Request, res: Response): Promise<Response> {
  try {
    const cellData = await prisma.comic.findMany()

    if (!cellData) {
      return res.status(404).json({
        status: 404,
        message: 'Cells not found'
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'get all cells ok',
      data: cellData
    })
  } catch (err) {
    console.error("getAllCells error:", err)
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// GET /cells - get one cell by id
export async function getOneCellById(req: Request, res: Response): Promise<Response> {
  const { id } = req.body
  
  try {
    const cell = await prisma.comic.findFirst({ where: {id: id}})

    if (!cell) {
      return res.status(404).json({
        status: 404,
        message: `Cell '${name}' not found`
      })
    }

    return res.status(200).json({
      status: 200,
      message: 'Cells fetched',
    })
  } catch (err) {
    console.error("getOneCellById error:", err)
    return res.status(500).json({
      status: 500,
      mesage: "Internal Server Error"
    })
  }
}

// POST /cells - add a new cell
export async function createCell(req: Request, res: Response): Promise<Response> {
  const { name, hometown, imdbProfile } = req.body

  // Validate payload
  if (!name || !hometown || !imdbProfile) {
    return res.status(400).json({
      status: 400,
      message: "Missing required cell fields"
    })
  }

  try {
      const newCell = await prisma.comic.create({
        data: { name, hometown, imdbProfile}
      })
  
      return res.status(201).json({
        status: 201,
        message: `${name} created`,
        data: newCell
      })
  } catch (err) {
    console.error("createCell error:", err)
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// PUT /cells - update an existing cell
export async function updateCell(req: Request, res: Response): Promise<Response> {
  const { id, name, hometown, imdbProfile } = req.body

  if (!name || !hometown || imdbProfile) {
    return res.status(400).json({ error: "Missing required cell fields" })
  }

  try {
    const record = await prisma.comic.findUnique({ where: { id: id } })

    if (!record) {
      return res.status(404).json({
        status: 404,
        message: `Cell '${name}' not found`
      })
    }

    const updated = await prisma.comic.update({
      where: { id: record.id },
      data: {
        name: name || record.name, // fallback to whatever is in the db for these
        hometown: hometown || record.hometown,
        imdbProfile: imdbProfile || record.imdbProfile,
      }
    })
      return res.status(200).json({
        status: "Cell updated",
        message: {newData: updated}
      })

  } catch (err) {
    console.error("updateCell error:", err)
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

// DELETE /cells/delete - delete cell by ID
export async function deleteCellById(req: Request, res: Response): Promise<Response> {
  const { name, id } = req.body
  console.debug(`name: ${name}`)

  if (!name) {
    return res.status(400).json({
      status: 400,
      message: "no name was input for me to delete",
    })
  }

  try {
      const deleted = await prisma.comic.delete({
          where: { id: id }
      })

      console.log(`${name} was purged`)
      return res.status(200).json({
          status: 200,
          message: `${name} deleted`,
          data: deleted
      })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 'P2025') {
        return res.status(404).json({
            status: 404,
            message: `${name} does not exist`
        })
    }

      console.error(err)
      return res.status(500).json({
          status: 500,
          message: 'Unexpected error during delete'
      })
  }
}