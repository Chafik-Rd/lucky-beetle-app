"use client";

import { CountdownTimer } from "@/src/components/countdownTimer";
import { useLanguageStore } from "@/src/contexts/LanguageStore";
import { ProductMockData } from "@/src/data/mockdata";
import { ProductType } from "@/src/types/product.type";
import { ArrowLeft, Calendar, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export const ProductDetail = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const trans = useLanguageStore((state) => state.trans);
  const lang = useLanguageStore((state) => state.lang);

  const selectedProduct = ProductMockData.find(
    (product) => product.id === Number(productId),
  );
  

  return (
    <div className="bg-white pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <button
          onClick={() =>
            router.push(`/${selectedProduct.isAuction ? "auction" : "shop"}`)
          }
          className="mb-6 flex cursor-pointer items-center text-gray-500"
        >
          <ArrowLeft size={20} className="mr-2" /> {trans.product.back}
        </button>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-[#F8F9FA] p-10">
            <Image src={selectedProduct.image} fill alt="detail" />
          </div>
          <div>
            <h1 className="text-primary mb-4 font-serif text-4xl font-bold">
              {lang === "th"
                ? selectedProduct.name.th
                : selectedProduct.name.en}
            </h1>
            <p className="mb-8 text-gray-500">
              {lang === "th"
                ? selectedProduct.description.th
                : selectedProduct.description.en}
            </p>
            {selectedProduct.isAuction ? (
              <div className="space-y-4">
                <span className="text-4xl font-bold text-red-500">
                  ฿{selectedProduct.currentBid?.toLocaleString()}
                </span>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={16} /> {trans.auction.endsIn}:{" "}
                  {new Date(selectedProduct.endTime).toLocaleString(
                    lang === "th" ? "th-TH" : "en-US",
                  )}
                </div>
                <div className="font-bold text-gray-500">
                  {trans.auction.timeLeft}:{" "}
                  <CountdownTimer targetDate={selectedProduct.endTime} />
                </div>
                <button
                  // onClick={() => checkAuth(() => notify("Bid Placed!"))}
                  className="bg-primary w-full rounded-xl py-4 font-bold text-white"
                >
                  Bid Now
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-primary text-3xl font-bold">
                  ฿{selectedProduct.price.toLocaleString()}
                </span>
                <button
                  // onClick={() => addToCart(selectedProduct)}
                  className="bg-primary flex items-center gap-2 rounded-xl px-8 py-3 font-bold text-white"
                >
                  <ShoppingBag size={20} /> {trans.shop.addToCart}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
