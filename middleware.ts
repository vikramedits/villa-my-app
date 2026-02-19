import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // 🔐 FORCE HTTPS (only in production)
    if (
      process.env.NODE_ENV === "production" &&
      req.headers.get("x-forwarded-proto") !== "https"
    ) {
      return NextResponse.redirect(
        new URL("https://" + req.headers.get("host") + req.nextUrl.pathname)
      );
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

// 🔒 Protect admin routes only
export const config = {
  matcher: ["/admin/:path*"],
};
