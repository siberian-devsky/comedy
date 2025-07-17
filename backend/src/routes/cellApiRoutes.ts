
import { Router } from "express";
import { GetAllCells, GetOneCellByName } from "../controllers/cellController";

const router = Router()

router.get('/cells/all', GetAllCells)
router.post('/cells', GetOneCellByName)



export default router