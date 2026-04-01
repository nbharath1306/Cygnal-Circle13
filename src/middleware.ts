import { NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing middleware.
 *
 * Production: nbharath.circle13.space → rewrites to /nbharath
 * Dev:        localhost:3000/nbharath  → works as-is (no rewrite needed)
 *
 * Admin routes (circle13.space/admin) pass through untouched.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Don't touch admin routes, API routes, or static files
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Extract subdomain
  // e.g. "nbharath.circle13.space" → "nbharath"
  // e.g. "circle13.space" → null (no subdomain)
  // e.g. "localhost:3000" → null (dev)
  const parts = hostname.split(".");
  let subdomain: string | null = null;

  if (parts.length >= 3) {
    // nbharath.circle13.space → subdomain = "nbharath"
    // www.circle13.space → subdomain = "www"
    subdomain = parts[0];
  }

  // Skip www or no subdomain
  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  // Rewrite subdomain to the slug route
  // nbharath.circle13.space → internally serves /nbharath
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
