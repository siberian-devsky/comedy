import { Router } from 'express'
import { FindComicByName } from '../controllers/apiControllers'

const peopleRouter = Router()

// never trust the client
peopleRouter.get('/getcomic', (req, res) => {
    res.status(400).json({ error: 'Missing name parameter' })
})
peopleRouter.get('/getcomic/:name', FindComicByName)

export default peopleRouter
