import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Get the admin password from environment variable
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  // Debug password check (remove in production)
  console.log('Received password:', password);
  console.log('Admin password from env:', adminPassword);
  console.log('Password match:', password === adminPassword);

  // Check if admin password is configured
  if (!adminPassword) {
    console.error('Admin password environment variable is not set');
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Compare the provided password with the stored password
  if (password === adminPassword) {
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
