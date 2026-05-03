"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { FiEdit2, FiMail, FiUser, FiCalendar, FiBookOpen, FiLock } from "react-icons/fi";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();

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
            <FiLock className="text-[#1a2744] text-2xl" />
          </div>
          <h2
            className="text-2xl font-bold text-[#1a2744] mb-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Private Area
          </h2>
          <p className="text-gray-500 mb-7 text-sm">
            Please log in to view your profile.
          </p>
          <Link href="/login" className="btn-primary-custom block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const user = session.user;
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-[#1a2744] rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-[#c9a84c] flex items-center justify-center text-[#1a2744] font-bold text-3xl shrink-0 overflow-hidden shadow-lg">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {user.name}
              </h1>
              <p className="text-gray-300 text-sm mb-4">{user.email}</p>
              <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-semibold px-3 py-1 rounded-full">
                Active Member
              </span>
            </div>
            <div className="sm:ml-auto">
              <Link
                href="/update-profile"
                className="flex items-center gap-2 bg-white/10 hover:bg-[#c9a84c] hover:text-[#1a2744] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
              >
                <FiEdit2 /> Update Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {[
            { icon: <FiUser />, label: "Full Name", value: user.name || "—" },
            { icon: <FiMail />, label: "Email Address", value: user.email || "—" },
            {
              icon: <FiCalendar />,
              label: "Member Since",
              value: joinedDate,
            },
            {
              icon: <FiBookOpen />,
              label: "Books Borrowed",
              value: "0 books",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a2744]/5 flex items-center justify-center text-[#1a2744] shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <p className="text-[#1a2744] font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3
            className="text-lg font-bold text-[#1a2744] mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/all-books"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#1a2744] hover:bg-[#1a2744]/5 transition-all group"
            >
              <FiBookOpen className="text-[#1a2744] text-lg group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Browse Books</span>
            </Link>
            <Link
              href="/update-profile"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all group"
            >
              <FiEdit2 className="text-[#c9a84c] text-lg group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Edit Profile</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all group"
            >
              <FiUser className="text-gray-400 text-lg group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Go Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
