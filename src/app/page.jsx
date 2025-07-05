import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  const session = (await cookies()).get("session");

  if (session) {
    redirect("/books");
  }

  return (
    <main>
      <h1>Selamat datang di CuyPerpus</h1>
      <p>Klik Disini Untuk Melihat <Link href="/books" className="text-blue-600 hover:underline">Buku</Link></p>
    </main>
  );
}
