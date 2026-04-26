import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

const PRIVATE_ROUTES = ["/profile", "/notes"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

import { checkServerSession } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };
          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
      //
    } else {
      if (isAuthRoute) {
        return NextResponse.next();
      }
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  } else {
    if (isPrivateRoute) {
      return NextResponse.next();
    }
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};