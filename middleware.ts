import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

/**
 * @description Middleware called on every route request, goal is to validate user session.
 * Middlewares are functions that run before any rendering logic is executed on the server-side. 
 * They typically have access to request headers (cookies) and can modify both the request and response headers.
 * @param request Request object from client
 * @returns 
 */


export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
  //Match routes that need validation
  matcher: [
    //'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/dashboard/:path*',  // Example: protect all routes under /dashboard
    '/dashboard'
  ],
}