import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const hasAdminCookie = cookie.includes("admin=ok");

  return NextResponse.json({ authenticated: hasAdminCookie });
}