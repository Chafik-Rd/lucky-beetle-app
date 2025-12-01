"use client";
import {
  Globe,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useLanguageStore } from "../../contexts/LanguageStore";
import { useProductStore } from "../../contexts/ProductStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "../../contexts/UserStore";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navKeys = ["home", "shop", "auction", "contact"] as const;
export const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();
  const currentPage = pathname === "/" ? "home" : pathname.slice(1);

  const trans = useLanguageStore((state) => state.trans);
  const lang = useLanguageStore((state) => state.lang);
  const toggleLang = useLanguageStore((state) => state.toggleLang);
  const cartCount = useProductStore((state) => state.count);
  const userRole = useUserStore((state) => state.role);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userName =
    user?.firstName || user?.username || user?.fullName || "User";
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="group flex shrink-0 cursor-pointer items-center"
            onClick={() => router.push("/")}
          >
            <div className="relative mr-2 h-12 w-12">
              <Image
                src="/logo.png"
                alt="image.name"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h1 className="text-primary hidden font-serif text-2xl font-bold tracking-widest group-hover:opacity-80 sm:block">
              LUCKY<span className="text-secondary">BEETLE</span>
            </h1>
          </div>
          <div className="hidden items-center space-x-6 md:flex">
            {navKeys.map((key) => (
              <button
                key={key}
                onClick={() => router.push(`/${key}`)}
                className={`cursor-pointer text-sm font-medium tracking-wider uppercase ${
                  currentPage === key
                    ? "text-primary"
                    : "hover:text-primary text-gray-500"
                }`}
              >
                {trans.nav[key]}
              </button>
            ))}
            {userRole === "admin" && (
              <button
                onClick={() => router.push("/admin")}
                className="flex cursor-pointer items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-bold tracking-wider text-red-600 uppercase"
              >
                <Settings size={14} /> {trans.nav.admin}
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLang}
              className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100"
            >
              <Globe size={16} />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button
              className="hover:text-primary relative cursor-pointer text-gray-400"
              //   onClick={onOpenCart}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="bg-secondary absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <SignedOut>
              <button
                onClick={() => router.push("/sign-in")}
                className="bg-primary flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white hover:bg-[#143d31]"
              >
                <User size={16} />{" "}
                <span className="hidden sm:inline">{trans.nav.login}</span>
              </button>
            </SignedOut>
            <SignedIn>
              <div className="ml-2 flex items-center gap-2 border-l pl-4">
                <UserButton />
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-gray-400">{trans.nav.welcome},</p>
                  <p className="text-primary line-clamp-1 max-w-[100px] text-sm font-bold">
                    {userName}
                  </p>
                </div>
                <SignOutButton>
                  <button className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                    <LogOut size={20} />
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
            <button
              className="ml-2 text-gray-400 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute z-50 w-full space-y-4 border-t border-gray-100 bg-white p-4 shadow-lg md:hidden">
          {navKeys.map((key) => (
            <button
              key={key}
              onClick={() => {
                router.push(`/${key}`);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700"
            >
              {trans.nav[key]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
