"use client";

import { useLanguageStore } from "@/src/contexts/LanguageStore";

export const Footer = () => {
  const trans = useLanguageStore((state) => state.trans);
  return (
    <footer className="border-t border-gray-100 bg-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 text-center md:flex-row md:text-left">
        <div className="mb-6 md:mb-0">
          <h2 className="text-primary mb-2 font-serif text-xl font-bold">
            LUCKY<span className="text-secondary">BEETLE</span>
          </h2>
          <p className="text-sm text-gray-400">
            © 2025 Lucky Beetle. สงวนลิขสิทธิ์.
          </p>
        </div>
        <div className="flex space-x-8 text-sm text-gray-500">
          <a href="#" className="hover:text-primary">
            {trans.contact.title}
          </a>
        </div>
      </div>
    </footer>
  );
};
