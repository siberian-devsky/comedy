import {Request, Response } from 'express'

// logging
export default function logger(req: Request, res: Response, next: () => void) {
    const { method, url } = req

    res.on('finish', () => {
        console.log(`
            After: [${new Date().toISOString()}] [${method}] [${url}] [${res.statusCode}]
        `)
    }); 
    
    next()
}