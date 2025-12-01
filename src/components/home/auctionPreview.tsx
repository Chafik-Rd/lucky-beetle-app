"use client";

import { useRouter } from "next/navigation";
import { useLanguageStore } from "../../contexts/LanguageStore";
import { ArrowRight, Clock, Gavel } from "lucide-react";
import Image from "next/image";
import { initialAuctions } from "../../data/mockdata";

export const AuctionPreview = () => {
  const router = useRouter();
  const trans = useLanguageStore((state) => state.trans);
  const lang = useLanguageStore((state) => state.lang);

  return (
    <div className="border-t border-gray-100 bg-[#F8F9FA] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-primary mb-2 flex items-center gap-3 font-serif text-3xl font-bold">
              <span className="rounded-full bg-red-100 p-2 text-red-600">
                <Gavel size={24} />
              </span>
              {trans.auction.live}
            </h2>
            <p className="text-gray-500">
              สินค้าที่กำลังเปิดประมูลอยู่อย่างดุเดือด
            </p>
          </div>
          <button
            onClick={() => router.push("auction")}
            className="group text-primary flex cursor-pointer items-center gap-1 font-bold hover:underline"
          >
            More{" "}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {initialAuctions.slice(0, 4).map((item) => (
            <div
              key={item.id}
              //   onClick={() => viewProductDetail(item)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative flex h-56 items-center justify-center bg-[#F8F9FA] p-6">
                <div className="absolute top-3 left-3 z-10 flex animate-pulse items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                  <Clock size={12} /> Live
                </div>
                <Image
                  src={item.image}
                  fill
                  className="mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  alt={item.name.en}
                />
              </div>
              <div className="p-5">
                <h3 className="text-primary mb-1 truncate text-lg font-bold">
                  {lang === "th" ? item.name.th : item.name.en}
                </h3>
                <div className="flex items-end justify-between border-t border-dashed border-gray-100 pt-3">
                  <div>
                    <p className="mb-1 text-xs text-gray-400">
                      {trans.auction.currentBid}
                    </p>
                    <p className="text-xl font-bold text-red-500">
                      ฿{item.currentBid?.toLocaleString() ?? 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-xs text-gray-400">
                      {trans.auction.timeLeft}
                    </p>
                    {/* <CountdownTimer targetDate={item.endTime} /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
