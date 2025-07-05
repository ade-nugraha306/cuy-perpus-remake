"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowMessage, setBorrowMessage] = useState("");
  const [borrowLoading, setBorrowLoading] = useState(false);

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

  const handleBorrow = async () => {
    setBorrowLoading(true);
    setBorrowMessage("");
    try {
      const res = await fetch("/api/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: id,
        }),
      });
      const data = await res.json();

      if(res.ok){
        setBorrowMessage("Berhasil Request, menunggu persetujuan...")
      }else{
        setBorrowMessage(`${data.message} || "Gagal mengajukan request"`)
      }
    } catch (err) {
      setBorrowMessage("Terjadi kesalahan saat mengajukan request")
    } finally {
      setBorrowLoading(false);
    }
  };

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
          <span className="font-semibold text-white">Penulis:</span>{" "}
          {book.penulis}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Penerbit:</span>{" "}
          {book.penerbit}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Tahun:</span>{" "}
          {book.tahun_terbit}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Kategori:</span>{" "}
          {book.kategori_buku}
        </p>
        <p className="font-semibold text-white">
          <span className="font-semibold text-white">Deskripsi:</span>{" "}
          {book.deskripsi}
        </p>
      </div>
      <div className="mt-6">
        <button onClick={handleBorrow} disabled={borrowLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {borrowLoading ? "Mengajukan" : "Ajukan Pinjam Buku"}
        </button>
        {borrowMessage && (
          <p className="mt-3 text-sm text-gray-100">{borrowMessage}</p>
        )}
      </div>
    </div>
  );
}
