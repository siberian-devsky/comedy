import { Router } from 'express'
import { GetAllComics, GetOneComicByName, TmdbTest } from '../controllers/comicController'

const router = Router()

router.get('/comics/all', GetAllComics)
router.post('/comics', GetOneComicByName)

//>add here
router.get('/TmdbTest', TmdbTest)

export default router
