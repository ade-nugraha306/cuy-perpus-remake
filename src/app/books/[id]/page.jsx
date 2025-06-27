"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data.data); // asumsikan { data: {...} }
      })
      .catch((err) => {
        console.error("Gagal fetch detail buku:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-8 text-gray-500">Memuat detail buku...</div>;
  }

  if (!book) {
    return <div className="p-8 text-red-500">Buku tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{book.judul}</h1>
      <div className="bg-base-200 p-6 rounded-lg shadow-lg space-y-3">
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Penulis:</span> {book.penulis}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Penerbit:</span> {book.penerbit}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Tahun:</span> {book.tahun_terbit}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Kategori:</span> {book.kategori_buku}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Deskripsi:</span> {book.deskripsi}
        </p>
      </div>
    </div>
  );
}
