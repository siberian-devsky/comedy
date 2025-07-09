
import { Router } from "express";
import {
    getAllCells,
    getOneCellById,
    createCell,
    updateCell,
    deleteCellById
} from "../controllers/cellController";

const router = Router()

// @ts-expect-error - these routes are overloaded for some reason
router.get('/cells', getAllCells)
// @ts-expect-error - ditto
router.get('/cells/:name', getOneCellById)
// @ts-expect-error - ditto
router.post('/cells/create', createCell)
// @ts-expect-error - ditto
router.delete('/cells/delete', deleteCellById)
// @ts-expect-error - ditto
router.put('/cells/update/:id', updateCell)


export default router