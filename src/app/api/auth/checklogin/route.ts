import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = req.headers.get("X-User-ID");
  if (userId) {
    return NextResponse.json(
      { success: true, message: "Token found" },
      { status: 200 },
    );
  }
  return NextResponse.json(
    { success: false, message: "No token found" },
    { status: 400 },
  );
}
