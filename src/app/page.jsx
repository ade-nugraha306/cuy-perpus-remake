import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const session = cookies().get("session");

  if (session) {
    redirect("/books");
  }

  return (
    <main>
      <h1>Selamat datang di CuyPerpus</h1>
      <p>Silakan login untuk melihat buku.</p>
    </main>
  );
}
