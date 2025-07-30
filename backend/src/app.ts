import express from 'express'
import initMiddleware from './middleware'
import comicApiRoutes from './routes/comicApiRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 4000

try {
    initMiddleware(app)
    console.log("MIDDLEWARE INITIALIZED")
} catch (err) {
    console.log('could not initialize middleware', err)
}

app.use('/api/v1', comicApiRoutes)
console.log("AFTER ROUTES INIT")

app.listen(port, () => {
    console.log('listening on: ', port)
})