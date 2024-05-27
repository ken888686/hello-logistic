import { login } from "@/app/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: { email: string; password: string };
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await login(email, password);
    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
