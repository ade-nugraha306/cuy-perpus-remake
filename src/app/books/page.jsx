"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books") // Ganti dengan endpoint real-mu
      .then((res) => res.json())
      .then((data) => setBooks(data.data)) // Jika response kamu seperti { data: [...] }

      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Buku</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <div className="card bg-base-200 shadow hover:shadow-xl cursor-pointer transition-all">
                <div className="card-body">
                  <h2 className="card-title text-lg text-white">{book.judul}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
