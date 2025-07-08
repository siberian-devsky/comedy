import { Application, json } from 'express';
import cors from 'cors'
import logger from "./logger";
import setHeaders from "./setHeaders";


export default function initMiddleware( app: Application ) {
    app.use(logger)
    app.use(cors())
    app.use(setHeaders)
    app.use(json())
}
