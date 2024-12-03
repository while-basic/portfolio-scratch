import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Compare with environment variable
  if (password === process.env.ADMIN_PASSWORD) {
    // Set an HTTP-only cookie for authentication
    cookies().set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid password" },
    { status: 401 }
  );
}
