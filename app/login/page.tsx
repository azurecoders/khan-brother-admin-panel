"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1E40AF] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl mb-6 animate-pulse">
            <img
              src="/KhanBrother_Logo.jpeg"
              alt="KB"
              className="w-20 h-20 rounded-2xl p-2 bg-white shadow-xl"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-orange-500"></div>
            <p className="text-xl font-bold text-white">
              Initializing Secure Access...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1E40AF] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/20"></div>
      </div>

      {/* Login Card - Optimized & Compact */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-3xl overflow-hidden border border-white/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-10 text-white text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-2xl p-3 ring-8 ring-white/30">
                <img
                  src="/KhanBrother_Logo.jpeg"
                  alt="Khan Brothers"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-lg mt-2 opacity-90">
              Admin Portal • Secure Access
            </p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl flex items-start gap-3">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"
                    size={22}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 text-base font-medium"
                    placeholder="admin@khanbrothers.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  PASSWORD
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"
                    size={22}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 text-base"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg py-5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Lock size={24} />
                    Secure Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 font-medium text-sm">
                © {new Date().getFullYear()} Khan Brothers Engineering &
                Solutions
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-white/80 text-lg font-medium tracking-wider mt-8">
          Engineering Excellence with Reliable Solutions
        </p>
      </div>
    </div>
  );
}
