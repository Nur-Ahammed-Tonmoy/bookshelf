import Link from "next/link";
import { FiBook, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a2744] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c] flex items-center justify-center">
                <FiBook className="text-[#1a2744] text-lg" />
              </div>
              <span
                className="text-white text-xl font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Bookshelf
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your digital gateway to a world of stories, knowledge, and
              discovery. Borrow, explore, and get lost in the pages.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaGithub />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#1a2744] transition-all duration-200 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "All Books", href: "/all-books" },
                { label: "My Profile", href: "/my-profile" },
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c9a84c] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Story", "Technology", "Science", "Biography", "Philosophy", "Self-Help"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href="/all-books"
                      className="hover:text-[#c9a84c] transition-colors duration-150"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 text-[#c9a84c] shrink-0" />
                <span>123 Library Lane, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-[#c9a84c] shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-[#c9a84c] shrink-0" />
                <a href="mailto:hello@bookshelf.app" className="hover:text-[#c9a84c] transition-colors">
                  hello@bookshelf.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bookshelf. All rights reserved.</p>
          <p>Built with Next.js · Tailwind CSS · BetterAuth</p>
        </div>
      </div>
    </footer>
  );
}
