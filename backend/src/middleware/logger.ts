import {Request, Response } from 'express'

// logging
export default function logger(req: Request, res: Response, next: () => void) {
    const { method, url, params } = req

    res.on('finish', () => {
        console.log(`Responded with status ${res.statusCode}`);
        console.log(`${params.name}`)
        console.log(`[${new Date().toISOString()}] [${method}] [${url}]`)
    }); 
    
    next()
}