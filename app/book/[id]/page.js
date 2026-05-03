"use client";
import { use } from "react";
import books from "@/lib/books";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiBookOpen, FiUser, FiStar, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function BookDetailsPage({ params }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  const book = books.find((b) => b.id === id);
  if (!book) notFound();

  const categoryColorMap = {
    Story: "bg-purple-100 text-purple-800",
    Tech: "bg-blue-100 text-blue-800",
    Science: "bg-green-100 text-green-800",
  };

  const handleBorrow = () => {
    if (!session) return;
    if (book.available_quantity === 0) {
      toast.error("Sorry, no copies available right now.");
      return;
    }
    toast.success(`🎉 "${book.title}" has been borrowed! Enjoy reading.`);
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <div className="w-12 h-12 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#1a2744]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiBookOpen className="text-[#1a2744] text-2xl" />
          </div>
          <h2
            className="text-2xl font-bold text-[#1a2744] mb-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Members Only
          </h2>
          <p className="text-gray-500 mb-7 text-sm leading-relaxed">
            You need to be logged in to view book details and borrow books from
            our library.
          </p>
          <Link href="/login" className="btn-primary-custom block">
            Login to Continue
          </Link>
          <p className="text-xs text-gray-400 mt-4">
            No account?{" "}
            <Link href="/register" className="text-[#1a2744] font-semibold hover:underline">
              Register for free
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a2744] mb-8 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to All Books
        </Link>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left — Cover */}
            <div className="relative bg-[#1a2744] flex items-center justify-center p-12 min-h-[420px]">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#c9a84c]" />
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white" />
              </div>
              <div className="relative shadow-2xl rounded-xl overflow-hidden w-52 hover:scale-105 transition-transform duration-500">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-full h-72 object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x400/1a2744/c9a84c?text=Book+Cover";
                  }}
                />
              </div>
            </div>

            {/* Right — Details */}
            <div className="p-10 flex flex-col justify-center">
              <div className="mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
                    categoryColorMap[book.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {book.category}
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold text-[#1a2744] leading-tight mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {book.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-5">
                <FiUser className="text-[#c9a84c]" />
                <span>by <span className="font-semibold text-gray-700">{book.author}</span></span>
                {book.rating && (
                  <>
                    <span className="text-gray-300">•</span>
                    <FiStar className="text-[#c9a84c] fill-[#c9a84c]" />
                    <span>{book.rating} rating</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <FiCheckCircle
                  className={book.available_quantity > 0 ? "text-green-500" : "text-red-400"}
                />
                <span
                  className={`text-sm font-medium ${
                    book.available_quantity > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {book.available_quantity > 0
                    ? `${book.available_quantity} copies available`
                    : "Currently unavailable"}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm mb-8">
                {book.description}
              </p>

              <button
                onClick={handleBorrow}
                disabled={book.available_quantity === 0}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  book.available_quantity > 0
                    ? "bg-[#1a2744] text-white hover:bg-[#c9a84c] hover:text-[#1a2744] hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FiBookOpen />
                {book.available_quantity > 0 ? "Borrow This Book" : "Not Available"}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Borrowing period: 14 days · Free for all members
              </p>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-14">
          <h2
            className="text-2xl font-bold text-[#1a2744] mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            More in {book.category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {books
              .filter((b) => b.category === book.category && b.id !== book.id)
              .slice(0, 4)
              .map((b) => (
                <Link
                  key={b.id}
                  href={`/book/${b.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={b.image_url}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = "https://placehold.co/200x280/1a2744/c9a84c?text=Book"; }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[#1a2744] font-semibold text-sm line-clamp-2">
                      {b.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">{b.author}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
