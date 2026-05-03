"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiImage, FiBook } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, photoUrl, password } = form;

    if (!name || !email || !password) {
      setError("Name, email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
        callbackURL: "/login",
      });

      if (authError) {
        setError(authError.message || "Registration failed. Try again.");
        toast.error("Registration failed.");
      } else {
        toast.success("Account created! Please login. 🎉");
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", icon: <FiUser />, type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email", icon: <FiMail />, type: "email", placeholder: "you@example.com" },
    { name: "photoUrl", label: "Photo URL (optional)", icon: <FiImage />, type: "url", placeholder: "https://..." },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#1a2744] flex items-center justify-center">
              <FiBook className="text-[#c9a84c] text-lg" />
            </div>
            <span className="text-2xl font-bold text-[#1a2744]" style={{ fontFamily: "Georgia, serif" }}>
              Bookshelf
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a2744]" style={{ fontFamily: "Georgia, serif" }}>
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">Join thousands of readers today</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg px-8 py-8">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-60 cursor-pointer mb-6"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FcGoogle className="text-xl" />
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or register with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {fields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {f.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {f.icon}
                  </span>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744] transition-all"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2744] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2744] text-white font-semibold py-3.5 rounded-xl hover:bg-[#c9a84c] hover:text-[#1a2744] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1a2744] font-semibold hover:text-[#c9a84c] transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
