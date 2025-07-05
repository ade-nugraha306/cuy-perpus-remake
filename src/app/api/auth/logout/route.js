import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    
    return NextResponse.redirect("http://localhost:3000/");

  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Error during logout",
      error: err.message,
    });
  }
}
