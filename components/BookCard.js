"use client";
import Link from "next/link";
import { FiStar, FiEye } from "react-icons/fi";

function CategoryBadge({ category }) {
  const map = {
    
    Tech: "bg-blue-100 text-blue-800",
    Science: "bg-green-100 text-green-800",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${
        map[category] || "bg-gray-100 text-gray-700"
      }`}
    >
      {category}
    </span>
  );
}

export default function BookCard({ book, showDetails = true }) {
  return (
    <div className="card-book flex flex-col h-full group">
      {/* Cover Image */}
      <div className="relative overflow-hidden h-56 bg-gray-100 shrink-0">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x400/1a2744/c9a84c?text=Book+Cover";
          }}
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={book.category} />
        </div>
        {book.available_quantity === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-red-600 px-3 py-1 rounded-full">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[#1a2744] font-bold text-lg leading-tight mb-1 line-clamp-2 group-hover:text-[#c9a84c] transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">by {book.author}</p>

        <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
          {book.rating && (
            <span className="flex items-center gap-1">
              <FiStar className="text-[#c9a84c] fill-[#c9a84c]" />
              {book.rating}
            </span>
          )}
          <span
            className={`text-xs ${
              book.available_quantity > 0 ? "text-green-600" : "text-red-500"
            } font-medium`}
          >
            {book.available_quantity > 0
              ? `${book.available_quantity} copies available`
              : "Out of stock"}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
          {book.description}
        </p>

        {showDetails && (
          <Link
            href={`/book/${book.id}`}
            className="w-full text-center bg-[#1a2744] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#c9a84c] hover:text-[#1a2744] transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          >
            <FiEye className="group-hover/btn:scale-110 transition-transform" />
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}