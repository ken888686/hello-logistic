import { logout } from "@/app/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const result = await logout();
    return NextResponse.json({ ...result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
