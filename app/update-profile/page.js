"use client";
import { useSession, authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiArrowLeft, FiUser, FiImage, FiSave } from "react-icons/fi";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <div className="w-12 h-12 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.replace("/login");
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() && !image.trim()) {
      toast.error("Please fill in at least one field.");
      return;
    }

    setLoading(true);
    try {
      const updateData = {};
      if (name.trim()) updateData.name = name.trim();
      if (image.trim()) updateData.image = image.trim();

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        toast.error(error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentUser = session.user;

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12">
      <div className="max-w-lg mx-auto px-4">
        <Link
          href="/my-profile"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a2744] mb-8 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Link>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a2744] px-8 py-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#c9a84c] flex items-center justify-center text-[#1a2744] font-bold text-2xl mx-auto mb-4 overflow-hidden shadow-lg">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : currentUser.image ? (
                <img src={currentUser.image} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name?.charAt(0).toUpperCase()
              )}
            </div>
            <h1
              className="text-xl font-bold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Update Profile
            </h1>
            <p className="text-gray-400 text-sm mt-1">{currentUser.email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="px-8 py-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={currentUser.name || "Enter your name"}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Photo URL
              </label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744] focus:border-transparent transition-all"
                />
              </div>
              {image && (
                <p className="text-xs text-gray-400 mt-1">Preview shown above ↑</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2744] text-white font-semibold py-3.5 rounded-xl hover:bg-[#c9a84c] hover:text-[#1a2744] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSave /> Update Information
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
