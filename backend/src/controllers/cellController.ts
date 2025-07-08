import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

// GET /cells - get all cells
export async function getAllCells(req: Request, res: Response): Promise<Response> {
  try {
    const cellData = await prisma.basicCell.findMany()

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

// GET /cells/:name - get one cell by name
export async function getOneCellByName(req: Request, res: Response): Promise<Response> {
  try {
    const name = req.params.name
    const cell = await prisma.basicCell.findUnique({ where: { name } })

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
    console.error("getOneCellByName error:", err)
    return res.status(500).json({
      status: 500,
      mesage: "Internal Server Error"
    })
  }
}

// POST /cells - add a new cell
export async function createCell(req: Request, res: Response): Promise<Response> {
  const { name, icon, iconCode, currentValue } = req.body

  // Validate payload
  if (!name || !icon || !iconCode || currentValue === undefined) {
    return res.status(400).json({
      status: 400,
      message: "Missing required cell fields"
    })
  }

  try {
    // Prevent duplicate
    const exists = await prisma.basicCell.findUnique({ where: { name } })
    
    if (!exists) {
      const newCell = await prisma.basicCell.create({
        data: { name, icon, iconCode, currentValue }
      })
  
      return res.status(201).json({
        status: 201,
        message: `${name} created`,
        data: newCell
      })

    } else {
      return res.status(409).json({
        status: 409,
        message: `${name} already exists`
      })
    }

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
  const { id, name, icon, iconCode, currentValue } = req.body

  if (!name || !icon || !iconCode || currentValue === undefined) {
    return res.status(400).json({ error: "Missing required cell fields" })
  }

  try {
    const record = await prisma.basicCell.findUnique({ where: { id: id } })

    if (!record) {
      return res.status(404).json({
        status: 404,
        message: `Cell '${name}' not found`
      })
    }

    const updated = await prisma.basicCell.update({
      where: { id: record.id },
      data: {
        name: name || record.name, // fallback to whatever is in the db
        icon: icon || record.icon,
        iconCode: iconCode || record.iconCode,
        currentValue: currentValue || record.currentValue
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

// DELETE /cells/delete/:name - delete cell by name
export async function deleteCellByName(req: Request, res: Response): Promise<Response> {
  const { name } = req.body
  console.debug(`name: ${name}`)

  if (!name) {
    return res.status(400).json({
      status: 400,
      message: "no name was input for me to delete",
    })
  }

  try {
      const deleted = await prisma.basicCell.delete({
          where: { name: name }
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