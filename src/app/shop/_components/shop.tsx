"use client";
import { ProductCard } from "@/src/components/productCard";
import { useLanguageStore } from "@/src/contexts/LanguageStore";
import { initialProducts } from "@/src/data/mockdata";
import { useState } from "react";

export const Shop = () => {
  const trans = useLanguageStore((state) => state.t);

  const [activeCategory, setActiveCategory] = useState("all");
  return (
    <div className="min-h-screen border-t border-gray-50 bg-[#FFFFFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-primary mb-4 font-serif text-4xl font-bold">
            {trans.shop.title}
          </h1>
          <p className="text-gray-500">{trans.shop.subtitle}</p>
        </div>
        <div className="mb-12 flex justify-center overflow-x-auto pb-4">
          {Object.keys(trans.shop.filters).map((key) => {
            const filterKey = key as keyof typeof trans.shop.filters;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`mx-2 cursor-pointer rounded-full border px-6 py-2 text-sm font-medium whitespace-nowrap capitalize ${
                  activeCategory === key
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                {trans.shop.filters[filterKey]}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {initialProducts
            .filter(
              (p) => activeCategory === "all" || p.category === activeCategory,
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};
