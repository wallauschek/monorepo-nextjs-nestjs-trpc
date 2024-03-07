import { JwtPayload, decode } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  const nextUrl = req.headers.get("Host")
    ? protocol + "://" + req.headers.get("Host")
    : req.nextUrl.origin;
  const refresh_token = req.cookies.get("refresh_token")?.value;
  const access_token = req.cookies.get("access_token")?.value;

  if (!access_token) {
    if (refresh_token) {
      return NextResponse.redirect(`${nextUrl}/api/auth/refresh`, {
        headers: {
          "Set-Cookie": `redirectTo=${
            nextUrl + req.nextUrl.pathname
          }; Path=/api/auth/refresh; max-age=300`,
        },
      });
    } else
      return NextResponse.redirect(`${nextUrl}/login`, {
        headers: {
          "Set-Cookie": `redirectTo=${nextUrl + req.nextUrl.pathname}; Path=/login; max-age=300`,
        },
      });
  } else {
    if (refresh_token) {
      const decodedToken = decode(access_token) as JwtPayload;

      if (decodedToken && decodedToken.exp) {
        const timeToExpire = decodedToken.exp * 1000 - new Date().getTime();
        const tokenExpirationThreshold = 3 * 60 * 1000; // 3 minutes in milliseconds

        if (timeToExpire < tokenExpirationThreshold) {
          return NextResponse.redirect(`${nextUrl}/api/auth/refresh`, {
            headers: {
              "Set-Cookie": `redirectTo=${
                nextUrl + req.nextUrl.pathname
              }; Path=/api/auth/refresh; max-age=300`,
            },
          });
        } else {
          return NextResponse.next();
        }
      }
    }

    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    "/",
    "/academico/:path*" /* '/painel/:path*', '/cursos/:path*', '/carrinho' */,
  ],
};
