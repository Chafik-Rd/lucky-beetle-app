"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  Star,
  Info,
  Truck,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Wand2,
  Send,
  Loader2,
  Search,
  Trash2,
  ChevronRight,
  ArrowRight,
  Gavel,
  Clock,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  User,
  LogOut,
  Settings,
  Plus,
  Lock,
  Eye,
  History,
  ArrowLeft,
  Image as ImageIcon,
  Globe,
  Calendar,
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
} from "lucide-react";
import { translations } from "@/src/data/translations";



// --- Types & Interfaces ---
interface Product {
  id: number;
  name: string;
  thaiName: string;
  scientific: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  description?: string;
  descriptionEn?: string;
  isAuction?: boolean;
}

interface BidLog {
  userId: string;
  amount: number;
  timestamp: Date;
}

interface AuctionItem extends Product {
  currentBid: number;
  startingBid: number;
  endTime: number;
  bids: number;
  bidHistory: BidLog[];
}

interface UserProfile {
  username: string;
  role: "user" | "admin";
  avatar?: string;
  provider?: "facebook" | "system";
}

// --- Helper Component: Countdown Timer ---
const CountdownTimer = ({
  targetDate,
  endedText = "Ended",
}: {
  targetDate: number;
  endedText?: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      setTimeLeft(distance);
      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft < 0)
    return <span className="font-bold text-red-600">{endedText}</span>;

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="inline-block rounded border border-red-100 bg-red-50 px-2 py-1 font-mono font-medium text-red-600">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
};

// --- Initial Data ---
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Hercules Beetle",
    thaiName: "ด้วงกว่างเฮอร์คิวลีส",
    scientific: "Dynastes hercules",
    price: 4500,
    category: "rhino",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    tag: "Best Seller",
    description: "ราชาแห่งด้วงกว่างที่มีขนาดใหญ่ที่สุดในโลก...",
    descriptionEn: "The king of rhinoceros beetles...",
    isAuction: false,
  },
  {
    id: 2,
    name: "Giant Stag Beetle",
    thaiName: "ด้วงคีมฟันเลื่อย",
    scientific: "Dorcus titanus",
    price: 1200,
    category: "stag",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dorcus_titanus_palawanicus.jpg/1200px-Dorcus_titanus_palawanicus.jpg",
    tag: "New",
    description: "ด้วงคีมยอดนิยม...",
    descriptionEn: "Popular stag beetle...",
    isAuction: false,
  },
  {
    id: 3,
    name: "Elephant Beetle",
    thaiName: "ด้วงช้างเมก้าโซม่า",
    scientific: "Megasoma elephas",
    price: 3800,
    category: "rhino",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Megasoma_elephas_male.jpg/1200px-Megasoma_elephas_male.jpg",
    description: "ด้วงร่างยักษ์...",
    descriptionEn: "Giant beetle...",
    isAuction: false,
  },
  {
    id: 4,
    name: "Rainbow Stag",
    thaiName: "ด้วงคีมเจ็ดสี",
    scientific: "Phalacrognathus muelleri",
    price: 2500,
    category: "stag",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Phalacrognathus_muelleri_male_top.jpg/1200px-Phalacrognathus_muelleri_male_top.jpg",
    tag: "Rare",
    description: "อัญมณีมีชีวิต...",
    descriptionEn: "Living gem...",
    isAuction: false,
  },
];

const initialAuctions: AuctionItem[] = [
  {
    id: 101,
    name: "Golden Stag Extreme",
    thaiName: "ด้วงคีมทองคำ",
    scientific: "Allotopus rosenbergi",
    price: 10000,
    startingBid: 5000,
    currentBid: 12500,
    category: "stag",
    endTime: Date.now() + 1000 * 60 * 60 * 2,
    bids: 15,
    bidHistory: [],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Allotopus_rosenbergi_male_MHNT.jpg/1200px-Allotopus_rosenbergi_male_MHNT.jpg",
    description: "หายากมาก...",
    descriptionEn: "Extremely rare...",
    isAuction: true,
  },
  {
    id: 102,
    name: "Giant Hercules",
    thaiName: "เฮอร์คิวลีส ยักษ์",
    scientific: "Dynastes hercules",
    price: 8000,
    startingBid: 4000,
    currentBid: 9200,
    category: "rhino",
    endTime: Date.now() + 1000 * 60 * 60 * 5,
    bids: 8,
    bidHistory: [],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    description: "ไซส์ยักษ์...",
    descriptionEn: "Massive size...",
    isAuction: true,
  },
];

// --- Components ---

const ProductCard = ({
  product,
  onClick,
  onAddToCart,
  t,
  lang,
}: {
  product: Product;
  onClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  t: any;
  lang: string;
}) => (
  <div
    onClick={() => onClick(product)}
    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-[#C5A059]/50 hover:shadow-xl"
  >
    <div className="relative flex h-64 items-center justify-center bg-[#F8F9FA] p-8 transition-colors duration-300 group-hover:bg-white">
      {product.tag && (
        <span className="absolute top-4 left-4 z-10 rounded-full border border-gray-100 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-[#1B4D3E] uppercase shadow-sm backdrop-blur">
          {product.tag}
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="relative z-0 max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="absolute right-4 bottom-4 z-10 translate-y-12 rounded-full border border-gray-100 bg-white p-3 text-[#1B4D3E] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#1B4D3E] hover:text-white"
      >
        <ShoppingBag size={18} />
      </button>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <p className="mb-1 text-xs font-medium tracking-wider text-[#C5A059] uppercase">
        {product.scientific}
      </p>
      <h3 className="mb-1 line-clamp-1 text-lg font-bold text-gray-800 transition-colors group-hover:text-[#1B4D3E]">
        {lang === "th" ? product.thaiName : product.name}
      </h3>
      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
        <span className="text-lg font-bold text-[#1B4D3E]">
          ฿{product.price.toLocaleString()}
        </span>
        <span className="text-xs text-gray-400">{t.shop.stock}</span>
      </div>
    </div>
  </div>
);

const Navbar = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  user,
  onLogout,
  onToggleLang,
  lang,
  t,
}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="group flex flex-shrink-0 cursor-pointer items-center"
            onClick={() => onNavigate("home")}
          >
            <div className="mr-2 rounded-lg bg-[#1B4D3E] p-1 text-white">
              <Sparkles size={20} className="text-[#C5A059]" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-widest text-[#1B4D3E] group-hover:opacity-80">
              LUCKY<span className="text-[#C5A059]">BEETLE</span>
            </h1>
          </div>
          <div className="hidden items-center space-x-6 md:flex">
            {["home", "shop", "auction", "contact"].map((key) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`text-sm font-medium tracking-wider uppercase ${
                  currentPage === key
                    ? "text-[#1B4D3E]"
                    : "text-gray-500 hover:text-[#1B4D3E]"
                }`}
              >
                {t.nav[key]}
              </button>
            ))}
            {user?.role === "admin" && (
              <button
                onClick={() => onNavigate("admin")}
                className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-bold tracking-wider text-red-600 uppercase"
              >
                <Settings size={14} /> {t.nav.admin}
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 rounded px-2 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100"
            >
              <Globe size={16} />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button
              className="relative text-gray-400 hover:text-[#1B4D3E]"
              onClick={onOpenCart}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059] text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="ml-2 flex items-center gap-2 border-l pl-4">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    className="h-8 w-8 rounded-full border border-gray-200"
                    alt="avatar"
                  />
                )}
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-gray-400">{t.nav.welcome},</p>
                  <p className="line-clamp-1 max-w-[100px] text-sm font-bold text-[#1B4D3E]">
                    {user.username}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="flex items-center gap-2 rounded-full bg-[#1B4D3E] px-4 py-2 text-sm font-bold text-white hover:bg-[#143d31]"
              >
                <User size={16} />{" "}
                <span className="hidden sm:inline">{t.nav.login}</span>
              </button>
            )}
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
          {["home", "shop", "auction", "contact"].map((key) => (
            <button
              key={key}
              onClick={() => {
                onNavigate(key);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700"
            >
              {t.nav[key]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onCheckout,
  t,
  lang,
}: any) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 z-[65] bg-[#1B4D3E]/20 backdrop-blur-sm"
        onClick={onClose}
      />
    )}
    <div
      className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
        <h2 className="font-serif text-lg font-bold text-[#1B4D3E]">
          {t.cart.title} ({cart.length})
        </h2>
        <button onClick={onClose}>
          <X size={20} className="text-gray-400 hover:text-red-500" />
        </button>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {cart.length === 0 ? (
          <div className="mt-10 text-center text-gray-400">{t.cart.empty}</div>
        ) : (
          cart.map((item: any) => (
            <div key={item.cartId} className="flex gap-4">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-[#F8F9FA]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-[80%] max-w-[80%] object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <h4 className="line-clamp-1 text-sm font-bold text-[#2D3436]">
                    {lang === "th" ? item.thaiName : item.name}
                  </h4>
                  <span className="text-sm font-bold text-[#1B4D3E]">
                    ฿{item.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(item.cartId)}
                  className="self-end text-gray-300 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="border-t border-gray-100 bg-[#F8F9FA] p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold text-gray-900">{t.cart.total}</span>
            <span className="text-xl font-bold text-[#1B4D3E]">
              ฿
              {cart
                .reduce((sum: number, item: any) => sum + item.price, 0)
                .toLocaleString()}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full rounded-xl bg-[#1B4D3E] py-4 font-bold text-white transition-all hover:bg-[#143d31]"
          >
            {t.cart.checkout}
          </button>
        </div>
      )}
    </div>
  </>
);

const HomeView = ({
  t,
  onNavigate,
  products,
  auctionItems,
  viewProductDetail,
  onAddToCart,
  lang,
}: any) => (
  <>
    <div className="relative bg-white pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-[#1B4D3E] rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              {t.hero.badge}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1B4D3E] mb-6 leading-tight">
            {t.hero.title1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#d4af37]">
              {t.hero.title2}
            </span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 font-light max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onNavigate("shop")}
              className="bg-[#1B4D3E] text-white px-10 py-4 rounded-full font-medium shadow-lg shadow-[#1B4D3E]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {t.hero.btnShop}
            </button>
            <button
              onClick={() => onNavigate("auction")}
              className="bg-white text-[#1B4D3E] border border-[#1B4D3E]/20 px-10 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Gavel size={18} className="text-[#C5A059]" />
              <span>{t.hero.btnAuction}</span>
            </button>
          </div>
        </div>
        <div className="mt-16 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#1B4D3E]/5 to-[#C5A059]/10 rounded-full blur-3xl -z-10"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg"
            className="mx-auto w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            alt="hero"
          />
        </div>
      </div>
    </div>

    {/* Auction Preview */}
    <div className="bg-[#F8F9FA] py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#1B4D3E] mb-2 flex items-center gap-3">
              <span className="bg-red-100 text-red-600 p-2 rounded-full">
                <Gavel size={24} />
              </span>
              {t.auction.live}
            </h2>
            <p className="text-gray-500">
              สินค้าที่กำลังเปิดประมูลอยู่อย่างดุเดือด
            </p>
          </div>
          <button
            onClick={() => onNavigate("auction")}
            className="text-[#1B4D3E] font-bold hover:underline flex items-center gap-1 group"
          >
            More{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctionItems.slice(0, 4).map((item: any) => (
            <div
              key={item.id}
              onClick={() => viewProductDetail(item)}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
            >
              <div className="relative h-56 bg-[#F8F9FA] p-6 flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse shadow-sm z-10">
                  <Clock size={12} /> Live
                </div>
                <img
                  src={item.image}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  alt={item.name}
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#1B4D3E] truncate text-lg mb-1">
                  {lang === "th" ? item.thaiName : item.name}
                </h3>
                <div className="flex justify-between items-end pt-3 border-t border-dashed border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      {t.auction.currentBid}
                    </p>
                    <p className="text-xl font-bold text-red-500">
                      ฿{item.currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">
                      {t.auction.timeLeft}
                    </p>
                    <CountdownTimer targetDate={item.endTime} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Product Preview */}
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#1B4D3E] mb-2 flex items-center gap-3">
              <span className="bg-[#1B4D3E]/10 text-[#1B4D3E] p-2 rounded-full">
                <Star size={24} />
              </span>
              สินค้าแนะนำ
            </h2>
            <p className="text-gray-500">
              คัดสรรด้วงและอุปกรณ์คุณภาพเยี่ยมสำหรับคุณ
            </p>
          </div>
          <button
            onClick={() => onNavigate("shop")}
            className="text-[#1B4D3E] font-bold hover:underline flex items-center gap-1 group"
          >
            All Products{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={viewProductDetail}
              onAddToCart={onAddToCart}
              t={t}
              lang={lang}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate("shop")}
            className="border border-[#1B4D3E] text-[#1B4D3E] px-10 py-3 rounded-full font-bold hover:bg-[#1B4D3E] hover:text-white transition-all duration-300"
          >
            {t.shop.title}
          </button>
        </div>
      </div>
    </div>
  </>
);

const ShopView = ({
  t,
  products,
  onAddToCart,
  viewProductDetail,
  lang,
}: any) => {
  const [activeCategory, setActiveCategory] = useState("all");
  return (
    <div className="min-h-screen border-t border-gray-50 bg-[#FFFFFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-[#1B4D3E]">
            {t.shop.title}
          </h1>
          <p className="text-gray-500">{t.shop.subtitle}</p>
        </div>
        <div className="mb-12 flex justify-center overflow-x-auto pb-4">
          {Object.keys(t.shop.filters).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`mx-2 rounded-full border px-6 py-2 text-sm font-medium whitespace-nowrap capitalize ${
                activeCategory === key
                  ? "border-[#1B4D3E] bg-[#1B4D3E] text-white"
                  : "border-gray-200 bg-white text-gray-500"
              }`}
            >
              {t.shop.filters[key]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .filter(
              (p: any) =>
                activeCategory === "all" || p.category === activeCategory,
            )
            .map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={viewProductDetail}
                onAddToCart={onAddToCart}
                t={t}
                lang={lang}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const AuctionView = ({ t, auctionItems, viewProductDetail, lang }: any) => (
  <div className="min-h-screen border-t border-gray-50 bg-[#FFFFFF] py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="mb-4 inline-block animate-pulse rounded-full bg-red-50 p-3 text-red-500">
          <Gavel size={32} />
        </div>
        <h1 className="mb-2 font-serif text-4xl font-bold text-[#1B4D3E]">
          {t.auction.title}
        </h1>
        <p className="text-gray-500">{t.auction.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {auctionItems.map((item: any) => (
          <div
            key={item.id}
            onClick={() => viewProductDetail(item)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl md:flex-row"
          >
            <div className="relative flex items-center justify-center bg-[#F8F9FA] p-6 md:w-1/2">
              <div className="absolute top-4 left-4 flex animate-pulse items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                <Clock size={12} /> {t.auction.live}
              </div>
              <img
                src={item.image}
                className="max-h-[200px] max-w-full object-contain mix-blend-multiply"
                alt={item.name}
              />
            </div>
            <div className="flex flex-col justify-between p-6 md:w-1/2">
              <div>
                <h3 className="text-xl font-bold text-[#1B4D3E] group-hover:text-[#C5A059]">
                  {lang === "th" ? item.thaiName : item.name}
                </h3>

                <div className="mt-2 mb-3 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />
                  <span>
                    {t.auction.endsIn}:{" "}
                    {new Date(item.endTime).toLocaleString(
                      lang === "th" ? "th-TH" : "en-US",
                      { dateStyle: "medium", timeStyle: "short" },
                    )}
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500">
                    {t.auction.timeLeft}
                  </span>
                  <CountdownTimer targetDate={item.endTime} />
                </div>

                <div className="mb-2 flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-gray-500">
                    {t.auction.currentBid}
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    ฿{item.currentBid.toLocaleString()}
                  </span>
                </div>
              </div>
              <button className="w-full rounded-lg bg-[#1B4D3E] py-2 font-bold text-white hover:bg-[#143d31]">
                {t.auction.btnDetail}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactView = ({ t }: any) => (
  <div className="min-h-screen border-t border-gray-50 bg-[#FFFFFF] py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <h1 className="mb-6 font-serif text-4xl font-bold text-[#1B4D3E]">
            {t.contact.title}
          </h1>
          <p className="mb-8 leading-relaxed text-gray-500">
            {t.contact.subtitle}
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#1B4D3E]/10 p-3 text-[#1B4D3E]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{t.contact.address}</h4>
                <p className="text-sm text-gray-500">
                  123 Green Rd, Bangkok 10900
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#1B4D3E]/10 p-3 text-[#1B4D3E]">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{t.contact.phone}</h4>
                <p className="text-sm text-gray-500">089-999-9999</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#1B4D3E]/10 p-3 text-[#1B4D3E]">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{t.contact.email}</h4>
                <p className="text-sm text-gray-500">hello@luckybeetle.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-[#F8F9FA] p-8">
          <h3 className="mb-6 text-xl font-bold text-[#1B4D3E]">
            {t.contact.formTitle}
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-3"
              placeholder={t.contact.namePlace}
            />
            <input
              type="email"
              className="w-full rounded-lg border border-gray-200 px-4 py-3"
              placeholder="name@example.com"
            />
            <textarea
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-4 py-3"
              placeholder={t.contact.msgPlace}
            ></textarea>
            <button
              type="button"
              className="w-full rounded-lg bg-[#1B4D3E] py-3 font-bold text-white"
            >
              {t.contact.sendBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// const LoginView = ({ t, onLogin, onFbLogin }: any) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = onLogin(username, password);
//     if (!result) setError(t.login.error);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-20">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
//         <div className="text-center mb-8"><div className="w-16 h-16 bg-[#1B4D3E]/10 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={32} className="text-[#1B4D3E]" /></div><h2 className="text-2xl font-serif font-bold text-[#1B4D3E]">{t.login.title}</h2><p className="text-gray-500 text-sm mt-2">{t.login.subtitle}</p></div>
//         <button onClick={onFbLogin} className="w-full bg-[#1877F2] text-white py-3 rounded-lg font-bold hover:bg-[#166fe5] flex items-center justify-center gap-3 mb-6"><Facebook size={20} className="fill-current" /> {t.login.fbBtn}</button>
//         <div className="relative mb-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">{t.login.or}</span></div></div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.login.userLabel}</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200" value={username} onChange={e => setUsername(e.target.value)} placeholder="user, admin" /></div>
//           <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.login.passLabel}</label><input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-200" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" /></div>
//           {error && <p className="text-red-500 text-xs text-center">{error}</p>}
//           <button type="submit" className="w-full bg-[#1B4D3E] text-white py-3 rounded-lg font-bold">{t.login.submitBtn}</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// --- Improved Admin Dashboard ---
const AdminDashboard = ({
  t,
  products,
  setProducts,
  auctionItems,
  setAuctionItems,
  notify,
}: any) => {
  const [tab, setTab] = useState<"overview" | "products" | "auctions">(
    "overview",
  );
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: "rhino",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    isAuction: false,
  });
  const [newAuction, setNewAuction] = useState<Partial<AuctionItem>>({
    category: "rhino",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    isAuction: true,
    endsIn: "120",
    startingBid: 0,
  });
  const [viewingLogs, setViewingLogs] = useState<number | null>(null);

  // Add Product Logic
  const handleAddProduct = () => {
    if (!newProduct.thaiName || !newProduct.price) {
      notify("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const product: Product = {
      id: Date.now(),
      name: newProduct.name || "Unknown",
      thaiName: newProduct.thaiName,
      scientific: newProduct.scientific || "N/A",
      price: Number(newProduct.price),
      category: newProduct.category || "rhino",
      image: newProduct.image!,
      description: newProduct.description || "",
      isAuction: false,
      tag: "New",
    };
    setProducts([product, ...products]);
    notify(t.admin.saveBtn + " Success");
    setNewProduct({
      category: "rhino",
      image: newProduct.image,
      isAuction: false,
    });
  };

  // Add Auction Logic
  const handleAddAuction = () => {
    if (!newAuction.thaiName || !newAuction.startingBid) {
      notify("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const durationMinutes = Number(newAuction.endsIn) || 1440; // Default 24 hours
    const auction: AuctionItem = {
      id: Date.now(),
      name: newAuction.name || "Unknown",
      thaiName: newAuction.thaiName,
      scientific: newAuction.scientific || "N/A",
      price: 0,
      category: newAuction.category || "rhino",
      image: newAuction.image!,
      description: newAuction.description || "",
      isAuction: true,
      currentBid: Number(newAuction.startingBid),
      startingBid: Number(newAuction.startingBid),
      endsIn: "",
      endTime: Date.now() + durationMinutes * 60 * 1000,
      bids: 0,
      bidHistory: [],
    };
    setAuctionItems([auction, ...auctionItems]);
    notify(t.admin.startAuction + " Success");
    setNewAuction({
      category: "rhino",
      image: newAuction.image,
      isAuction: true,
      startingBid: 0,
      endsIn: "120",
    });
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("ยืนยันการลบ?"))
      setProducts(products.filter((p: any) => p.id !== id));
  };
  const handleDeleteAuction = (id: number) => {
    if (window.confirm("ยืนยันการลบ?"))
      setAuctionItems(auctionItems.filter((p: any) => p.id !== id));
  };

  const stats = [
    {
      title: t.admin.stats.products,
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: t.admin.stats.auctions,
      value: auctionItems.length,
      icon: Gavel,
      color: "bg-[#C5A059]",
    },
    {
      title: t.admin.stats.users,
      value: "1,234",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: t.admin.stats.revenue,
      value: "฿45,200",
      icon: DollarSign,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-10 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="mb-4 flex items-center gap-3 font-serif text-3xl font-bold text-[#1B4D3E] md:mb-0">
            <LayoutDashboard size={32} /> {t.admin.title}
          </h1>
          <div className="flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            {[
              {
                id: "overview",
                label: t.admin.tabOverview,
                icon: LayoutDashboard,
              },
              { id: "products", label: t.admin.tabProduct, icon: Package },
              { id: "auctions", label: t.admin.tabAuction, icon: Gavel },
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => setTab(menu.id as any)}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold transition-all ${
                  tab === menu.id
                    ? "bg-[#1B4D3E] text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <menu.icon size={16} /> {menu.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {tab === "overview" && (
          <div className="animate-fade-in-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div
                  className={`${stat.color} rounded-xl p-4 text-white shadow-lg shadow-gray-200`}
                >
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-[#1B4D3E]">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
            {/* Recent Activity Placeholder */}
            <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="mb-4 font-bold text-[#1B4D3E]">
                Recent Activities
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div> New
                  order #1023 received
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div> New
                  user registered
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-[#C5A059]"></div>{" "}
                  Auction #101 ended
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="animate-fade-in-up space-y-8">
            {/* Add Product Form */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-2 text-xl font-bold text-[#1B4D3E]">
                <Plus size={20} /> {t.admin.addProduct}
              </h2>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Image Preview Section */}
                <div className="lg:col-span-1">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Preview Image
                  </label>
                  <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
                    {newProduct.image ? (
                      <img
                        src={newProduct.image}
                        className="h-full w-full object-contain"
                        alt="preview"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <ImageIcon size={40} className="mx-auto mb-2" />
                        <span className="text-xs">No image URL</span>
                      </div>
                    )}
                  </div>
                  <input
                    className="mt-4 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#1B4D3E] focus:outline-none"
                    placeholder={t.admin.form.img}
                    value={newProduct.image || ""}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                  />
                </div>

                {/* Form Inputs */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.name}
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#1B4D3E] focus:bg-white"
                      value={newProduct.thaiName || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          thaiName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.sci}
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#1B4D3E] focus:bg-white"
                      value={newProduct.scientific || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          scientific: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.cat}
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#1B4D3E] focus:bg-white"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="rhino">Rhino</option>
                      <option value="stag">Stag</option>
                      <option value="supplies">Supplies</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.price}
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#1B4D3E] focus:bg-white"
                      value={newProduct.price || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.desc}
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#1B4D3E] focus:bg-white"
                      value={newProduct.description || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end md:col-span-2">
                    <button
                      onClick={handleAddProduct}
                      className="rounded-lg bg-[#1B4D3E] px-8 py-3 font-bold text-white shadow-lg shadow-[#1B4D3E]/20 transition-all hover:bg-[#143d31] active:scale-95"
                    >
                      {t.admin.saveBtn}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-50 text-xs tracking-wider text-gray-500 uppercase">
                  <tr>
                    <th className="p-4 font-bold">Product</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Price</th>
                    <th className="p-4 text-right font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p: any) => (
                    <tr
                      key={p.id}
                      className="group transition-colors hover:bg-gray-50"
                    >
                      <td className="flex items-center gap-4 p-4">
                        <img
                          src={p.image}
                          className="h-12 w-12 rounded-lg border border-gray-100 bg-white object-contain"
                          alt="product"
                        />
                        <div>
                          <p className="font-bold text-[#1B4D3E]">
                            {p.thaiName}
                          </p>
                          <p className="font-mono text-xs text-gray-400">
                            {p.scientific}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 uppercase">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-[#1B4D3E]">
                        ฿{p.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "auctions" && (
          <div className="animate-fade-in-up space-y-8">
            {/* Add Auction Form */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="absolute top-0 left-0 h-full w-2 bg-[#C5A059]"></div>
              <h2 className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-2 text-xl font-bold text-[#C5A059]">
                <Gavel size={20} /> {t.admin.addAuction}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.name}
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#C5A059] focus:bg-white"
                      value={newAuction.thaiName || ""}
                      onChange={(e) =>
                        setNewAuction({
                          ...newAuction,
                          thaiName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                        {t.admin.form.startBid}
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#C5A059] focus:bg-white"
                        value={newAuction.startingBid || ""}
                        onChange={(e) =>
                          setNewAuction({
                            ...newAuction,
                            startingBid: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                        {t.admin.form.time}
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#C5A059] focus:bg-white"
                        value={newAuction.endsIn || ""}
                        onChange={(e) =>
                          setNewAuction({
                            ...newAuction,
                            endsIn: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-500 uppercase">
                      {t.admin.form.img}
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors focus:border-[#C5A059] focus:bg-white"
                      value={newAuction.image || ""}
                      onChange={(e) =>
                        setNewAuction({ ...newAuction, image: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex h-full items-end justify-end pb-1">
                    <button
                      onClick={handleAddAuction}
                      className="w-full rounded-lg bg-[#C5A059] px-8 py-3 font-bold text-white shadow-lg shadow-[#C5A059]/20 transition-all hover:bg-[#b08d4b] active:scale-95 md:w-auto"
                    >
                      {t.admin.startAuction}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Auction List */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-50 text-xs tracking-wider text-gray-500 uppercase">
                  <tr>
                    <th className="p-4 font-bold">Item</th>
                    <th className="p-4 font-bold">Current Bid</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 text-right font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auctionItems.map((p: any) => (
                    <React.Fragment key={p.id}>
                      <tr className="transition-colors hover:bg-gray-50">
                        <td className="flex items-center gap-4 p-4">
                          <img
                            src={p.image}
                            className="h-12 w-12 rounded-lg border border-gray-100 bg-white object-contain"
                            alt="auction"
                          />
                          <div>
                            <p className="font-bold text-[#1B4D3E]">
                              {p.thaiName}
                            </p>
                            <p className="font-mono text-xs text-gray-400">
                              <CountdownTimer targetDate={p.endTime} />
                            </p>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-red-500">
                          ฿{p.currentBid.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className="animate-pulse rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-600 uppercase">
                            Live
                          </span>
                        </td>
                        <td className="flex justify-end gap-2 p-4 text-right">
                          <button
                            onClick={() =>
                              setViewingLogs(viewingLogs === p.id ? null : p.id)
                            }
                            className={`rounded-full p-2 transition-colors ${
                              viewingLogs === p.id
                                ? "bg-[#1B4D3E] text-white"
                                : "text-gray-400 hover:bg-gray-100"
                            }`}
                            title="Logs"
                          >
                            <History size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteAuction(p.id)}
                            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                      {viewingLogs === p.id && (
                        <tr className="bg-gray-50/50">
                          <td colSpan={4} className="p-4">
                            <div className="mx-auto max-w-3xl rounded-xl border border-gray-100 bg-white p-4 shadow-inner">
                              <h4 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                                Bid History Log
                              </h4>
                              {p.bidHistory.length > 0 ? (
                                <ul className="space-y-2 text-sm">
                                  {p.bidHistory.map((log: any, idx: number) => (
                                    <li
                                      key={idx}
                                      className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0"
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">
                                          {log.userId.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-gray-700">
                                          {log.userId}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className="font-mono text-xs text-gray-400">
                                          {log.timestamp.toLocaleTimeString()}
                                        </span>
                                        <span className="font-bold text-[#1B4D3E]">
                                          ฿{log.amount.toLocaleString()}
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="py-4 text-center text-sm text-gray-400">
                                  No bids placed yet.
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "shop"
    | "auction"
    | "contact"
    | "login"
    | "admin"
    | "product-detail"
  >("home");
  const [lang, setLang] = useState<"th" | "en">("th");
  const t = translations[lang];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [auctionItems, setAuctionItems] =
    useState<AuctionItem[]>(initialAuctions);
  const [selectedProduct, setSelectedProduct] = useState<
    Product | AuctionItem | null
  >(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "สวัสดีครับ!" },
  ]);

  const notify = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, cartId: Date.now() + Math.random() }]);
    notify(t.common.successCart);
    setIsCartOpen(true);
  };
  const removeFromCart = (cartId: number) =>
    setCart(cart.filter((item) => item.cartId !== cartId));
  const handleCheckout = () => {
    if (!user) {
      notify(t.common.requireLogin);
      setIsCartOpen(false);
      setCurrentPage("login");
    } else {
      notify("Checkout!");
    }
  };
  const checkAuth = (action: () => void) => {
    if (user) action();
    else {
      notify(t.common.requireLogin);
      setCurrentPage("login");
    }
  };
  const viewProductDetail = (product: Product | AuctionItem) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
    window.scrollTo(0, 0);
  };

  const handleLogin = (u: string, p: string) => {
    const cleanUser = u.trim();
    if (cleanUser === "admin" && p === "password") {
      setUser({ username: "Admin", role: "admin" });
      setCurrentPage("admin");
      notify(t.common.successLogin);
      return true;
    }
    if (cleanUser === "user" && p === "password") {
      setUser({ username: "Khun User", role: "user" });
      setCurrentPage("home");
      notify(t.common.successLogin);
      return true;
    }
    return false;
  };

  const handleFbLogin = () => {
    setTimeout(() => {
      setUser({
        username: "Facebook User",
        role: "user",
        provider: "facebook",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
      });
      setCurrentPage("home");
      notify(t.common.successLogin);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#2D3436]">
      <div
        className={`fixed top-24 right-5 z-[60] flex transform items-center space-x-3 rounded border-l-4 border-[#1B4D3E] bg-white px-6 py-4 text-[#1B4D3E] shadow-xl transition-all duration-300 ${
          showNotification
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-10 opacity-0"
        }`}
      >
        <ShieldCheck size={20} />
        <span className="text-sm font-medium">{notificationMsg}</span>
      </div>

      {/* <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onLogout={() => {
          setUser(null);
          setCurrentPage("home");
        }}
        onToggleLang={() => setLang((prev) => (prev === "th" ? "en" : "th"))}
        lang={lang}
        t={t}
      /> */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        t={t}
        lang={lang}
      />
      
      {currentPage === "home" && (
        <HomeView
          t={t}
          onNavigate={setCurrentPage}
          products={products}
          auctionItems={auctionItems}
          viewProductDetail={viewProductDetail}
          onAddToCart={addToCart}
          lang={lang}
        />
      )}
      {currentPage === "shop" && (
        <ShopView
          t={t}
          products={products}
          onAddToCart={addToCart}
          viewProductDetail={viewProductDetail}
          lang={lang}
        />
      )}
      {currentPage === "auction" && (
        <AuctionView
          t={t}
          auctionItems={auctionItems}
          viewProductDetail={viewProductDetail}
          lang={lang}
        />
      )}
      {currentPage === "contact" && <ContactView t={t} />}
      {currentPage === "login" && (
        <LoginView t={t} onLogin={handleLogin} onFbLogin={handleFbLogin} />
      )}

      {currentPage === "admin" &&
        (user?.role === "admin" ? (
          <AdminDashboard
            t={t}
            products={products}
            setProducts={setProducts}
            auctionItems={auctionItems}
            setAuctionItems={setAuctionItems}
            notify={notify}
          />
        ) : (
          <div className="p-20 text-center">
            <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
            <p>Please login as admin.</p>
          </div>
        ))}

      {currentPage === "product-detail" && selectedProduct && (
        <div className="min-h-screen bg-white pt-8 pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <button
              onClick={() =>
                setCurrentPage(selectedProduct.isAuction ? "auction" : "shop")
              }
              className="mb-6 flex items-center text-gray-500"
            >
              <ArrowLeft size={20} className="mr-2" /> {t.product.back}
            </button>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex items-center justify-center rounded-2xl bg-[#F8F9FA] p-10">
                <img
                  src={selectedProduct.image}
                  className="max-h-[500px] max-w-full object-contain"
                  alt="detail"
                />
              </div>
              <div>
                <h1 className="mb-4 font-serif text-4xl font-bold text-[#1B4D3E]">
                  {lang === "th"
                    ? selectedProduct.thaiName
                    : selectedProduct.name}
                </h1>
                <p className="mb-8 text-gray-500">
                  {lang === "th"
                    ? selectedProduct.description
                    : selectedProduct.descriptionEn}
                </p>
                {selectedProduct.isAuction ? (
                  <div className="space-y-4">
                    <span className="text-4xl font-bold text-red-500">
                      ฿
                      {(
                        selectedProduct as AuctionItem
                      ).currentBid.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} /> {t.auction.endsIn}:{" "}
                      {new Date(
                        (selectedProduct as AuctionItem).endTime,
                      ).toLocaleString(lang === "th" ? "th-TH" : "en-US")}
                    </div>
                    <div className="font-bold text-gray-500">
                      {t.auction.timeLeft}:{" "}
                      <CountdownTimer
                        targetDate={(selectedProduct as AuctionItem).endTime}
                      />
                    </div>
                    <button
                      onClick={() => checkAuth(() => notify("Bid Placed!"))}
                      className="w-full rounded-xl bg-[#1B4D3E] py-4 font-bold text-white"
                    >
                      Bid Now
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-[#1B4D3E]">
                      ฿{selectedProduct.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="flex items-center gap-2 rounded-xl bg-[#1B4D3E] px-8 py-3 font-bold text-white"
                    >
                      <ShoppingBag size={20} /> {t.shop.addToCart}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsAiOpen(true)}
        className="group fixed right-8 bottom-8 z-40 rounded-full border border-[#1B4D3E]/10 bg-white p-4 text-[#1B4D3E] shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#1B4D3E]/20"
      >
        <Sparkles size={24} className="text-[#C5A059]" />
        <span className="absolute top-1/2 right-full mr-4 -translate-y-1/2 rounded bg-[#1B4D3E] px-3 py-1.5 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Lucky AI
        </span>
      </button>

      {isAiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B4D3E]/20 p-4 backdrop-blur-sm"
          onClick={() => setIsAiOpen(false)}
        >
          <div
            className="flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4">
              <h3 className="font-bold text-[#1B4D3E]">Lucky AI Assistant</h3>
              <button onClick={() => setIsAiOpen(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto bg-[#F8F9FA] p-5">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#1B4D3E] text-white"
                        : "border border-gray-100 bg-white text-gray-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <Loader2 className="animate-spin text-[#C5A059]" size={20} />
              )}
            </div>
            <div className="relative border-t border-gray-100 bg-white p-4">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-4 focus:border-[#1B4D3E] focus:outline-none"
                placeholder="ถาม AI..."
              />
              <button
                onClick={() => {}}
                className="absolute top-1/2 right-6 -translate-y-1/2 text-[1B4D3E#]"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
