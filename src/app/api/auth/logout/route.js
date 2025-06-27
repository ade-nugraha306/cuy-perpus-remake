import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return Response.json({
      status: 200,
      message: "Logout successful",
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error during logout",
      error: err.message,
    });
  }
}
