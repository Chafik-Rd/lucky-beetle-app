"use client";

import { useRouter } from "next/navigation";
import { useLanguageStore } from "../../contexts/LanguageStore";
import { ArrowRight, Star } from "lucide-react";
import { initialProducts } from "../../data/mockdata";
import { ProductCard } from "../productCard";

export const ProductPreview = () => {
  const router = useRouter();
  const trans = useLanguageStore((state) => state.t);

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-primary mb-2 flex items-center gap-3 font-serif text-3xl font-bold">
              <span className="bg-primary/10 text-primary rounded-full p-2">
                <Star size={24} />
              </span>
              สินค้าแนะนำ
            </h2>
            <p className="text-gray-500">
              คัดสรรด้วงและอุปกรณ์คุณภาพเยี่ยมสำหรับคุณ
            </p>
          </div>
          <button
            onClick={() => router.push("shop")}
            className="group text-primary flex cursor-pointer items-center gap-1 font-bold hover:underline"
          >
            All Products{" "}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {initialProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("shop")}
            className="border-primary text-primary hover:bg-primary cursor-pointer rounded-full border px-10 py-3 font-bold transition-all duration-300 hover:text-white"
          >
            {trans.shop.title}
          </button>
        </div>
      </div>
    </div>
  );
};
