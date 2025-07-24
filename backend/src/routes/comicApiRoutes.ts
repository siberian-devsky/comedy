import { Router } from 'express'
import { GetAllComics, GetOneComicByName } from '../controllers/comicController'

const router = Router()

router.get('/comics/all', GetAllComics)
router.post('/comics', GetOneComicByName)

export default router
