// import { type NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'
// 
// export async function middleware(request: NextRequest) {
  // return await updateSession(request)
// }
// 
// export const config = {
  // matcher: [
    // /*
    //  * Match all request paths except for the ones starting with:
    //  * - _next/static (static files)
    //  * - _next/image (image optimization files)
    //  * - favicon.ico (favicon file)
    //  * Feel free to modify this pattern to include more paths.
    //  */
    // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  // ],
// }

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(req: NextRequest) {
  const token = req.cookies.get('supabase-auth-token')?.value;

  // If there is no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists, continue with the request
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/protected-route/:path*'], // replace with actual protected route paths
};
