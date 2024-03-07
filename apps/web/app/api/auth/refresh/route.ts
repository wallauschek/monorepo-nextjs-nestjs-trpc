import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import ChamadasBackEnd from '@web/apis/ChamadasBackEnd';

export async function GET(req: NextRequest) {

  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const nextUrl = req.headers.get('Host')
    ? protocol + '://' + req.headers.get('Host')
    : req.nextUrl.origin;

  const refresh_token = req.cookies.get('refresh_token')?.value;

  console.log("🚀 ~ GET ~ refresh_token:", refresh_token)

  const redirectTo = req.cookies.get('redirectTo')?.value;

  console.log("🚀 ~ GET ~ redirectTo:", redirectTo)

  if (refresh_token)
    return ChamadasBackEnd.refreshToken({
      refresh_token
    })
      .then((response) => {

        console.log("🚀 ~ .then ~ response:", response)

        const { access_token, refresh_token } = response;

        const payload_access_token: any = jwt.decode(access_token);
        const payload_refresh_token: any = jwt.decode(refresh_token);

        const nowInSeconds = Math.floor(Date.now() / 1000);

        return NextResponse.redirect(`${redirectTo ? redirectTo : nextUrl}`, {
          headers: {
            'Set-Cookie': [
              `access_token=${access_token}; Path=/; Max-age=${
                payload_access_token.exp - nowInSeconds
              }`,
              `refresh_token=${refresh_token}; Path=/; Max-age=${
                payload_refresh_token.exp - nowInSeconds
              }`
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
