"use client";

import Image from "next/image";
import { Gavel } from "lucide-react";
import { useLanguageStore } from "../../contexts/LanguageStore";
import { useRouter } from "next/navigation";

export const HeroPage = () => {
  const router = useRouter();
  const trans = useLanguageStore((state) => state.t);
  return (
    <>
      <div className="relative overflow-hidden bg-white pt-16 pb-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-in-up mb-8 inline-flex items-center space-x-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5">
              <span className="bg-primary h-2 w-2 animate-pulse rounded-full"></span>
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                {trans.hero.badge}
              </span>
            </div>
            <h1 className="text-primary mb-6 font-serif text-5xl leading-tight font-bold md:text-7xl">
              {trans.hero.title1}
              <br />
              <span className="from-secondary bg-linear-to-r to-[#d4af37] bg-clip-text text-transparent">
                {trans.hero.title2}
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-gray-500">
              {trans.hero.subtitle}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push("shop")}
                className="bg-primary shadow-primary/20 cursor-pointer rounded-full px-10 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {trans.hero.btnShop}
              </button>
              <button
                onClick={() => router.push("auction")}
                className="border-primary/20 text-primary flex cursor-pointer items-center space-x-2 rounded-full border bg-white px-10 py-4 font-medium transition-colors hover:bg-gray-50"
              >
                <Gavel size={18} className="text-secondary" />
                <span>{trans.hero.btnAuction}</span>
              </button>
            </div>
          </div>
          <div className="relative mt-16">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg"
              alt="hero"
              width={600}
              height={600}
              className="mx-auto w-full max-w-lg object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
};
