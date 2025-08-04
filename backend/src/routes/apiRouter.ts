import { Router } from 'express'
import { FindComicByName } from '../controllers/apiControllers'

const peopleRouter = Router()

peopleRouter.get('/getcomic/:name', FindComicByName)

export default peopleRouter
