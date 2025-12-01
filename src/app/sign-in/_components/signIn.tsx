"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Facebook, Lock } from "lucide-react";
import { useLanguageStore } from "@/src/contexts/LanguageStore";

export const SignIn = () => {
  const trans = useLanguageStore((state) => state.trans);

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
    <div className="flex items-center justify-center bg-[#F8F9FA] px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Lock size={32} className="text-primary" />
          </div>
          <h2 className="text-primary font-serif text-2xl font-bold">
            {trans.login.title}
          </h2>
          <p className="mt-2 text-sm text-gray-500">{trans.login.subtitle}</p>
        </div>
        <button
          onClick={handleFacebookSignIn}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] py-3 font-bold text-white hover:bg-[#166fe5]"
        >
          <Facebook size={20} className="fill-current" /> {trans.login.fbBtn}
        </button>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {trans.login.or}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {trans.login.userLabel}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user, admin"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {trans.login.passLabel}
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-200 px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-primary w-full rounded-lg py-3 font-bold text-white"
          >
            {trans.login.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
