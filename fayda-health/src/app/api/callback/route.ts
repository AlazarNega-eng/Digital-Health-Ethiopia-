import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    
    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url))
    }

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch('https://esignet.ida.fayda.et/v1/esignet/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH_VERIFAYDA_CLIENT_ID!,
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
      }),
    })

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', await tokenResponse.text())
      return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url))
    }

    const tokenData = await tokenResponse.json()
    
    // Get user info using the access token
    const userInfoResponse = await fetch('https://esignet.ida.fayda.et/v1/esignet/oidc/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      console.error('User info fetch failed:', await userInfoResponse.text())
      return NextResponse.redirect(new URL('/?error=userinfo_failed', request.url))
    }

    const userInfo = await userInfoResponse.json()
    
    // Create a session manually or redirect to the main app
    // For now, we'll redirect to the main app with user info in query params
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('user', JSON.stringify(userInfo))
    
    return NextResponse.redirect(redirectUrl)
    
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/?error=callback_error', request.url))
  }
} 