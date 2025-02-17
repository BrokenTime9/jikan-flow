import { NextResponse } from "next/server";
import { register } from "@/actions/authAction";

export async function POST(req: Request) {
  try {
    const { user, password } = await req.json();
    const result = await register(user, password);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
