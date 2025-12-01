import Image from "next/image";
import { ProductType } from "../types/product.type";
import { ShoppingBag } from "lucide-react";
import { useLanguageStore } from "../contexts/LanguageStore";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const router = useRouter();

  const trans = useLanguageStore((state) => state.trans);
  const lang = useLanguageStore((state) => state.lang);
  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="group hover:border-secondary/50 relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative flex h-64 items-center justify-center bg-[#F8F9FA] p-8 transition-colors duration-300 group-hover:bg-white">
        {product?.tag && (
          <span className="text-primary absolute top-4 left-4 z-10 rounded-full border border-gray-100 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur">
            {product.tag}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name.en}
          fill
          className="relative z-0 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-secondary mb-1 text-xs font-medium tracking-wider uppercase">
          {product.scientific}
        </p>
        <h3 className="group-hover:text-primary mb-1 line-clamp-1 text-lg font-bold text-gray-800 transition-colors">
          {lang === "th" ? product.name.th : product.name.en}
        </h3>
        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
          <span className="text-primary text-lg font-bold">
            ฿{product.price.toLocaleString()}
          </span>
          <button
            //   onClick={(e) => {
            //     e.stopPropagation();
            //     onAddToCart(product);
            //   }}
            className="text-primary hover:bg-primary cursor-pointer rounded-full border border-gray-100 bg-white p-3 shadow-md hover:text-white"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        <span className="text-xs text-gray-400">{trans.shop.stock}</span>
      </div>
    </div>
  );
};
