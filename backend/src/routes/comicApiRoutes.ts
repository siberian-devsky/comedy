import { Router } from 'express'
import {
	GetAllComics,
	GetOneComicByName,
	GetComic,
} from '../controllers/comicController'

const router = Router()

router.get('/comics/all', GetAllComics)
router.post('/comics', GetOneComicByName)

//>add here
router.get('/getcomic/:name', GetComic)

export default router
