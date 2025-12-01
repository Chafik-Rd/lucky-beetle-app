"use client";

import { CountdownTimer } from "@/src/components/countdownTimer";
import { useLanguageStore } from "@/src/contexts/LanguageStore";
import { initialAuctions } from "@/src/data/mockdata";
import { Calendar, Clock, Gavel } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Auction = () => {
  const router = useRouter();

  const trans = useLanguageStore((state) => state.trans);
  const lang = useLanguageStore((state) => state.lang);

  return (
    <div className="border-t border-gray-50 bg-[#FFFFFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block animate-pulse rounded-full bg-red-50 p-3 text-red-500">
            <Gavel size={32} />
          </div>
          <h1 className="text-primary mb-2 font-serif text-4xl font-bold">
            {trans.auction.title}
          </h1>
          <p className="text-gray-500">{trans.auction.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {initialAuctions.length > 0 ? (
            initialAuctions.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl md:flex-row"
              >
                <div className="relative flex items-center justify-center bg-[#F8F9FA] p-6 md:w-1/2">
                  <div className="absolute top-4 left-4 flex animate-pulse items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    <Clock size={12} /> {trans.auction.live}
                  </div>
                  <Image
                    src={item.image}
                    fill
                    alt={item.name.en}
                    className="mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 md:w-1/2">
                  <div>
                    <h3 className="text-primary group-hover:text-secondary text-xl font-bold">
                      {lang === "th" ? item.name.th : item.name.en}
                    </h3>

                    <div className="mt-2 mb-3 flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} />
                      <span>
                        {trans.auction.endsIn}:{" "}
                        {new Date(item.endTime).toLocaleString(
                          lang === "th" ? "th-TH" : "en-US",
                          { dateStyle: "medium", timeStyle: "short" },
                        )}
                      </span>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-500">
                        {trans.auction.timeLeft}
                      </span>
                      <CountdownTimer targetDate={item.endTime} />
                    </div>

                    <div className="mb-2 flex items-center justify-between border-t pt-3">
                      <span className="text-sm text-gray-500">
                        {trans.auction.currentBid}
                      </span>
                      <span className="text-2xl font-bold text-red-500">
                        ฿{item.currentBid?.toLocaleString() ?? 0}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/product/${item.id}`)}
                    className="bg-primary w-full cursor-pointer rounded-lg py-2 font-bold text-white hover:bg-[#143d31]"
                  >
                    {trans.auction.btnDetail}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border bg-gray-50 py-10 text-center md:col-span-2">
              <h3 className="text-xl font-bold text-gray-700">
                {trans.auction.emptyTitle || "No Auctions Available"}
              </h3>
              <p className="text-gray-500">
                {trans.auction.emptySubtitle || "Please check back later."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
