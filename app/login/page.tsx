"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
     {/* ====== Top Branding ========= */}
      <div className="container-fluid absolute top-4 w-full  left-1/2 -translate-x-1/2 flex justify-between items-center gap-1">
        <p className="text-white font-bold text-lg md:text-xl tracking-widest">
          The Pushpa Heritage
        </p>
        <Link href="/" className="text-sm text-red-500 bg-white px-3 py-2 rounded-full hover:underline transition">
          Go to Website
        </Link>
      </div>
      {/* ============ Animated Red Glow Background =============== */}
      <div className="absolute w-full h-full bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>

      {/* =========== Card ============ */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl shadow-lg shadow-white/10 p-8 md:p-10 transition-all duration-500">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500/40 text-red-500 text-2xl">
            🔒
          </div>
        </div>
        <p className="text-3xl md:text-4xl font-semibold text-center tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-700 pb-2">
          Admin Login
        </p>

        <p className="text-center text-gray-400 text-sm pb-6">
          Secure Admin Access
        </p>

        <div className="space-y-5">
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium rounded-full py-3 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-red-500/30"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-red-500/30"></div>
          </div>

          {/* ======== Email Input ========= */}
          <input
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 text-white placeholder-gray-500 border border-red-500/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
          />

          {/* ======== Password Input ======== */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 text-white placeholder-gray-500 border border-red-500/20 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* ========= Login Button ========== */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer uppercase tracking-wide
                          ${
                            loading
                              ? "bg-red-900 cursor-not-allowed"
                              : "bg-red-700 active:scale-95"
                          } text-white`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          <p className="text-center text-xs text-gray-500 pt-4">
            🔒 Protected by secure authentication • Authorized personnel only
          </p>
        </div>
      </div>
    </section>
  );
}
