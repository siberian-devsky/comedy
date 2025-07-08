import {Request, Response } from 'express'

// TODO: use helmet later but this is me learning for now
export default function setHeaders(req: Request, res: Response, next: () => void) {
    // Security Headers
    res.setHeader('X-Content-Type-Options', 'nosniff');                                   // Prevent MIME-type sniffing
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');                                       // Protect against clickjacking
    res.setHeader('X-XSS-Protection', '1; mode=block');                                   // Older XSS protection
    res.setHeader('Referrer-Policy', 'no-referrer');                                      // Hide Referer unless needed
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=()');                     // Disable certain features
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');    // HSTS
    
    // CORS - development-friendly, but tighten later
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    next();
};