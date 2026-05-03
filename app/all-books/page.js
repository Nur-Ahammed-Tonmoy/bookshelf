"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import books from "@/lib/books";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const CATEGORIES = ["All", "Story", "Tech", "Science"];

function CategoryBadge({ category }) {
  const map = {
    Story: "bg-purple-100 text-purple-800",
    Tech: "bg-blue-100 text-blue-800",
    Science: "bg-green-100 text-green-800",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${map[category] || "bg-gray-100 text-gray-700"}`}>
      {category}
    </span>
  );
}

export default function AllBooksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || b.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Page Header */}
      <div className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            All Books
          </h1>
          <p className="text-gray-300 mb-8">
            Browse our complete collection — {books.length} titles across Story, Tech & Science.
          </p>
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border-0 bg-white shadow-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-52 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h2 className="text-[#1a2744] font-bold text-sm uppercase tracking-widest mb-4">
                Categories
              </h2>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-[#1a2744] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                      <span className="float-right text-xs opacity-60">
                        {cat === "All"
                          ? books.length
                          : books.filter((b) => b.category === cat).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-5 md:hidden">
              <p className="text-sm text-gray-500">
                {filtered.length} book{filtered.length !== 1 ? "s" : ""} found
              </p>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <FiFilter /> Filter
              </button>
            </div>

            {/* Mobile category pills */}
            {sidebarOpen && (
              <div className="flex flex-wrap gap-2 mb-5 md:hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSidebarOpen(false); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border cursor-pointer transition-all ${
                      activeCategory === cat
                        ? "bg-[#1a2744] text-white border-[#1a2744]"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <p className="hidden md:block text-sm text-gray-500 mb-5">
              Showing {filtered.length} of {books.length} books
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {search && ` matching "${search}"`}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-[#1a2744] mb-2">No books found</h3>
                <p className="text-gray-500 text-sm">Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((book) => (
                  <div key={book.id} className="card-book flex flex-col group">
                    <div className="relative overflow-hidden h-52 bg-gray-100 shrink-0">
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/300x400/1a2744/c9a84c?text=Book";
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <CategoryBadge category={book.category} />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="text-[#1a2744] font-bold text-base leading-snug mb-1 line-clamp-2"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {book.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">by {book.author}</p>
                      <div className="mt-auto">
                        <Link
                          href={`/book/${book.id}`}
                          className="w-full block text-center bg-[#1a2744] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#c9a84c] hover:text-[#1a2744] transition-all duration-200"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
