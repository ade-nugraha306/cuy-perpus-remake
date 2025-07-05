import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookie = cookies().get("session");

    if (!cookie) {
      return NextResponse.json({
        status: 401,
        message: "Not authenticated",
      });
    }

    const decoded = JSON.parse(
      Buffer.from(cookie.value, "base64").toString("utf-8")
    );

    return NextResponse.json({
      status: 200,
      message: "Authenticated user",
      data: decoded,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Error reading session",
      error: err.message,
    });
  }
}
