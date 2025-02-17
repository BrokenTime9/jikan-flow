import { NextResponse } from "next/server";
import { login } from "@/actions/authAction";

export async function POST(req: Request) {
  try {
    const { user, password } = await req.json();
    const result = await login(user, password);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
