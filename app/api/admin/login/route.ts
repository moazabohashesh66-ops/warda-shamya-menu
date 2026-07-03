import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  console.log("LOGIN:", password);

  if (password !== "147") {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("admin", "ok", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
