import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookie = cookies().get("session");

    if (!cookie) {
      return Response.json({
        status: 401,
        message: "Not authenticated",
      });
    }

    const decoded = JSON.parse(
      Buffer.from(cookie.value, "base64").toString("utf-8")
    );

    return Response.json({
      status: 200,
      message: "Authenticated user",
      data: decoded,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error reading session",
      error: err.message,
    });
  }
}
