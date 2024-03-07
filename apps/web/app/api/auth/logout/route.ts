import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const nextUrl = req.headers.get('Host')
    ? protocol + '://' + req.headers.get('Host')
    : req.nextUrl.origin;

  const access_token = req.cookies.get('access_token')?.value;

  if (access_token)
    return ChamadasBackEnd.logout().then(() => {
        return NextResponse.redirect(`${nextUrl}/login`, {
          headers: {
            'Set-Cookie': [
              'access_token=; Path=/; Max-Age=0',
              'refresh_token=; Path=/; Max-Age=0'
            ].join(', ')
          }
        });
      })
      .catch((err) => {
        console.log(err);

        return NextResponse.redirect(`${nextUrl}/login`);
      });

  return NextResponse.redirect(`${nextUrl}/login`);
}
