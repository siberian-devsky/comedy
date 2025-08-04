import express from 'express'
import initMiddleware from './middleware'
import comicApiRoutes from './routes/apiRouter'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const app = express()
const port = 4000

try {
    initMiddleware(app)
} catch (err) {
    console.log('could not initialize middleware', err)
}

app.use('/api/v1', comicApiRoutes)

if (require.main === module) {
    app.listen(port, () => {
    console.log('listening on port ', port)
    })
}

export default app