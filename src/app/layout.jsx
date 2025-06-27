// app/layout.js
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = {
  title: "CuyPerpus",
  description: "A simple modern library system",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  let user = null;

  try {
    if (session) {
      user = JSON.parse(
        Buffer.from(session.value, "base64").toString("utf-8")
      );
    }
  } catch (err) {
    console.error("Invalid session");
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            CuyPerpus
          </Link>
          <nav className="flex gap-4">
            <Link href="/books">Books</Link>
            <Link href="/borrows">Borrows</Link>
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Hello, {user.username} ({user.role})
                </span>
                <form action="/api/auth/logout" method="POST">
                  <button type="submit" className="text-red-600 hover:underline">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
        <main className="p-4 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
