import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Debug logging
  console.log('Attempting admin login...');
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    HAS_ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    ADMIN_PASSWORD_LENGTH: process.env.ADMIN_PASSWORD?.length
  });

  // Compare with environment variable
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

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
