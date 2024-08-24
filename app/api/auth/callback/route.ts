// app/api/auth/callback.js
'use server'
import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server'

/**
 * @description Handles Google Auth callback route to 
 * @param req Request from client
 * @returns 
 */
export async function GET(req: NextRequest) {

    const supabase = createClient()
    const requestUrl = new URL(req.url);
    //Gets value associated to authorization code
    const code = requestUrl.searchParams.get("code");   
    
    try {
        if (code) {
            //Exchange code for an access token to validate sessions
            //Session will be stored in cookies or server side session store
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            console.log("IN GETR REQESU",code, requestUrl, requestUrl.origin, data)

            if (error) {
                console.error("Error exchanging code for session", error);
                return NextResponse.redirect(`${requestUrl.origin}/login`);
            }
        }
    } catch (e) {
        console.error("auth callback error", e);
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
