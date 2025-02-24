import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const encodedSecret = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload; // Equivalent to "decoded"
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new Error("Invalid token");
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Extract token from cookies

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized", redirectTo: "/login" },
      { status: 401 },
    );
  }

  try {
    const decoded = await verifyToken(token);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-ID", decoded.userId as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Invalid token in middleware" },
      { status: 403 },
    );
  }
}

export const config = {
  matcher: ["/api/projects/:path*", "/api/auth/checklogin"],
};
