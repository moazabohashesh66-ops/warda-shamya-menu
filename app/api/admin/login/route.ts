import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== (process.env.ADMIN_PASSWORD || "147")) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin", "ok", {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}