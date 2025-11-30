"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Facebook, Lock } from "lucide-react";
import { useLanguageStore } from "@/src/contexts/LanguageStore";

export const SignIn = () => {
  const t = useLanguageStore((state) => state.t);

  const { isLoaded, signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError("");
    // const result = onLogin(username, password);
    // if (!result) setError(t.login.error);
  };

  const handleFacebookSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_facebook",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Facebook sign-in failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1B4D3E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-[#1B4D3E]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1B4D3E]">
            {t.login.title}
          </h2>
          <p className="text-gray-500 text-sm mt-2">{t.login.subtitle}</p>
        </div>
        <button
          onClick={handleFacebookSignIn}
          className="w-full bg-[#1877F2] text-white py-3 rounded-lg font-bold hover:bg-[#166fe5] flex items-center justify-center gap-3 mb-6"
        >
          <Facebook size={20} className="fill-current" /> {t.login.fbBtn}
        </button>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t.login.or}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.login.userLabel}
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user, admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.login.passLabel}
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1B4D3E] text-white py-3 rounded-lg font-bold"
          >
            {t.login.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
