import Link from "next/link";
import books from "@/lib/books";
import BookCard from "@/components/BookCard";
import {
  FiArrowRight,
  FiBookOpen,
  FiShield,
  FiZap,
  FiUsers,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

/* ── Marquee text ── */
const marqueeText =
  "New Arrivals: The Midnight Library | The Alchemist | 1984 ✦ Special Discount on Memberships | Free Borrowing for Students | Clean Code is back in stock ✦ ";

/* ── Featured: top 4 ── */
const featuredBooks = books.slice(0, 4);

/* ── Stats data ── */
const stats = [
  { icon: <FiBookOpen size={28} />, value: "12,000+", label: "Books Available" },
  { icon: <FiUsers size={28} />, value: "8,500+", label: "Active Readers" },
  { icon: <FiAward size={28} />, value: "4.9★", label: "Average Rating" },
  { icon: <FiTrendingUp size={28} />, value: "500+", label: "New Monthly" },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: "Anika Rahman",
    role: "Graduate Student",
    text: "Bookshelf transformed my reading life. I can borrow any book I want within seconds — no more waiting in library queues!",
    avatar: "AR",
  },
  {
    name: "Rafiq Islam",
    role: "Software Engineer",
    text: "The Tech category is incredible. Clean Code and The Pragmatic Programmer helped me level up my skills immensely.",
    avatar: "RI",
  },
  {
    name: "Nadia Chowdhury",
    role: "High School Teacher",
    text: "I recommend Bookshelf to all my students. The Science section has so many gems that spark curiosity.",
    avatar: "NC",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO / BANNER ─── */}
      <section className="relative bg-[#1a2744] overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide animate__animated animate__fadeInDown">
              📚 Your Digital Library — Always Open
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate__animated animate__fadeInUp"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Find Your <br />
              <span className="text-[#c9a84c]">Next Great</span> Read.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate__animated animate__fadeInUp animate__delay-1s">
              Explore thousands of books across every genre. Borrow digitally,
              read anywhere. No late fees, no hassle.
            </p>
            <div className="flex flex-wrap gap-4 animate__animated animate__fadeInUp animate__delay-1s">
              <Link href="/all-books" className="btn-accent-custom flex items-center gap-2">
                Browse Now
                <FiArrowRight />
              </Link>
              <Link href="/register" className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-semibold">
                Join Free
              </Link>
            </div>
          </div>
        </div>

        {/* Floating book stack decoration */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 opacity-30">
          {["#c9a84c", "#ffffff", "#7c9ec9"].map((c, i) => (
            <div
              key={i}
              style={{ backgroundColor: c, width: `${160 - i * 20}px`, height: "18px", marginLeft: `${i * 10}px` }}
              className="rounded"
            />
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-container">
        <div className="marquee-inner text-sm font-medium tracking-wide">
          {(marqueeText + marqueeText).split("").map((char, i) => char)}
          {marqueeText + marqueeText}
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-[#c9a84c] mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-[#1a2744]">{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED BOOKS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
              Handpicked for You
            </p>
            <h2 className="section-title">Featured Books</h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Our curators' top picks this season — spanning fiction, tech, and
              science.
            </p>
          </div>
          <Link
            href="/all-books"
            className="flex items-center gap-2 text-[#1a2744] font-semibold hover:text-[#c9a84c] transition-colors shrink-0"
          >
            View all books <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-[#1a2744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              How Bookshelf Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <FiUsers size={32} />,
                title: "Create an Account",
                desc: "Sign up in under 30 seconds with your email or Google account. No credit card required.",
              },
              {
                step: "02",
                icon: <FiBookOpen size={32} />,
                title: "Discover & Browse",
                desc: "Search our library of 12,000+ titles. Filter by category, rating, or availability.",
              },
              {
                step: "03",
                icon: <FiZap size={32} />,
                title: "Borrow Instantly",
                desc: "Click 'Borrow' and start reading right away. Your borrowed books are always available on your profile.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="absolute top-6 right-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors select-none">
                  {item.step}
                </span>
                <div className="text-[#c9a84c] mb-5">{item.icon}</div>
                <h3
                  className="text-white text-xl font-bold mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
            Reader Reviews
          </p>
          <h2 className="section-title">What Our Readers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-[#c9a84c] text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a2744] flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#1a2744] text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#1a2744] to-[#253760] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-white text-6xl select-none"
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${i * 18}%`,
                  transform: `rotate(${(i % 3) * 15 - 15}deg)`,
                }}
              >
                📖
              </div>
            ))}
          </div>
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Start Your Reading Journey Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of readers who've made Bookshelf their go-to
              digital library. Free forever.
            </p>
            <Link href="/register" className="btn-accent-custom">
              Get Started — It's Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
