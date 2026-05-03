"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";
import { FiBook, FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-books", label: "All Books" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1a2744] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#c9a84c] flex items-center justify-center group-hover:scale-105 transition-transform">
              <FiBook className="text-[#1a2744] text-lg" />
            </div>
            <span
              className="text-white text-xl font-bold tracking-tight hidden sm:block"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Bookshelf
            </span>
          </Link>

          {/* Center Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#c9a84c] hover:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-8 bg-white/10 rounded-lg animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#1a2744] font-bold text-xs overflow-hidden">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      session.user.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="font-medium text-white max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm bg-white/10 hover:bg-red-500/80 text-white px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <FiLogOut className="text-base" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#c9a84c] text-[#1a2744] font-semibold text-sm px-5 py-2 rounded-lg hover:bg-[#b8963c] transition-all duration-150 hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white text-2xl p-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f1a30] border-t border-white/10 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-[#c9a84c] px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-white/10">
            {session?.user ? (
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">{session.user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm bg-red-500/80 text-white px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-[#c9a84c] text-[#1a2744] font-semibold text-sm px-5 py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
