"use client"
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Star, Info, Truck, ShieldCheck, Sparkles, MessageSquare, Wand2, Send, Loader2, Search, Trash2, ChevronRight, ArrowRight, Gavel, Clock, MapPin, Phone, Mail, Facebook, Instagram, User, LogOut, Settings, Plus, Lock, Eye, History, ArrowLeft, Image as ImageIcon, Globe, Calendar, LayoutDashboard, Package, Users, DollarSign } from 'lucide-react';

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
  role: 'user' | 'admin';
  avatar?: string;
  provider?: 'facebook' | 'system';
}

// --- Helper Component: Countdown Timer ---
const CountdownTimer = ({ targetDate, endedText = "Ended" }: { targetDate: number, endedText?: string }) => {
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

  if (timeLeft < 0) return <span className="text-red-600 font-bold">{endedText}</span>;

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="font-mono font-medium bg-red-50 px-2 py-1 rounded text-red-600 border border-red-100 inline-block">
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  );
};

// --- Translations ---
const translations = {
  th: {
    nav: { home: 'หน้าแรก', shop: 'สินค้าทั้งหมด', auction: 'ประมูล', contact: 'ติดต่อเรา', admin: 'ผู้ดูแลระบบ', login: 'เข้าสู่ระบบ', logout: 'ออกจากระบบ', welcome: 'ยินดีต้อนรับ' },
    hero: { badge: 'Lucky Beetle Collection 2025', title1: 'นำโชคแห่ง', title2: 'ธรรมชาติ', subtitle: 'ศูนย์รวมด้วงมงคลและด้วงสวยงามหายาก เสริมบารมีผู้เลี้ยง เพาะพันธุ์ด้วยใจรัก ส่งตรงถึงมือคุณ', btnShop: 'เลือกซื้อสินค้า', btnAuction: 'เข้าสู่ลานประมูล' },
    shop: { title: 'สินค้าทั้งหมด', subtitle: 'รวมด้วงทุกสายพันธุ์และอุปกรณ์การเลี้ยงคุณภาพสูง', filters: { all: 'ทั้งหมด', rhino: 'ด้วงกว่าง', stag: 'ด้วงคีม', supplies: 'อุปกรณ์' }, stock: 'มีสินค้า', addToCart: 'ใส่ตะกร้า' },
    auction: { title: 'ลานประมูล', subtitle: 'ร่วมเสนอราคาเพื่อครอบครองด้วงระดับตำนาน', live: 'กำลังประมูล', currentBid: 'ราคาปัจจุบัน', endsIn: 'จบการประมูล', timeLeft: 'เหลือเวลาอีก', bids: 'ครั้ง', btnDetail: 'ดูรายละเอียด / Bid', loginToBid: 'เข้าสู่ระบบเพื่อประมูล', ended: 'จบการประมูล' },
    contact: { title: 'ติดต่อเรา', subtitle: 'หากคุณมีข้อสงสัยเกี่ยวกับวิธีการเลี้ยง สายพันธุ์ด้วง หรือต้องการคำแนะนำเพิ่มเติม ทีมงาน Lucky Beetle พร้อมให้บริการคุณเสมอ', address: 'ที่อยู่หน้าร้าน', phone: 'เบอร์โทรศัพท์', email: 'อีเมล', formTitle: 'ส่งข้อความถึงเรา', namePlace: 'ระบุชื่อ', msgPlace: 'ข้อความ...', sendBtn: 'ส่งข้อความ' },
    login: { title: 'เข้าสู่ระบบ', subtitle: 'เพื่อทำการซื้อสินค้าหรือร่วมประมูล', fbBtn: 'เข้าสู่ระบบด้วย Facebook', or: 'หรือ', userLabel: 'ชื่อผู้ใช้ (Username)', passLabel: 'รหัสผ่าน (Password)', submitBtn: 'เข้าสู่ระบบ', error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
    admin: { 
      title: 'ระบบจัดการร้านค้า', 
      tabOverview: 'ภาพรวม',
      tabProduct: 'จัดการสินค้า', 
      tabAuction: 'จัดการประมูล', 
      addProduct: 'เพิ่มสินค้าใหม่', 
      addAuction: 'เริ่มการประมูล', 
      saveBtn: 'บันทึกข้อมูล', 
      stats: { products: 'สินค้าทั้งหมด', auctions: 'กำลังประมูล', users: 'ผู้ใช้งาน', revenue: 'ยอดขายรวม' },
      form: { name: 'ชื่อสินค้า (ไทย)', sci: 'ชื่อวิทยาศาสตร์', price: 'ราคา', cat: 'หมวดหมู่', img: 'URL รูปภาพ', desc: 'รายละเอียด', startBid: 'ราคาเริ่มต้น', time: 'ระยะเวลา (นาที)' } 
    },
    product: { back: 'ย้อนกลับ', shipping: 'จัดส่งฟรี', guarantee: 'รับประกัน', consult: 'ปรึกษาฟรี', price: 'ราคา' },
    cart: { title: 'ตะกร้าสินค้า', empty: 'ไม่มีสินค้าในตะกร้า', total: 'ยอดสุทธิ', checkout: 'ชำระเงิน' },
    common: { successCart: 'เพิ่มลงตะกร้าเรียบร้อย', successLogin: 'เข้าสู่ระบบสำเร็จ', successLogout: 'ออกจากระบบเรียบร้อย', requireLogin: 'กรุณาเข้าสู่ระบบก่อนทำรายการ' }
  },
  en: {
    nav: { home: 'Home', shop: 'Shop', auction: 'Auction', contact: 'Contact', admin: 'Admin', login: 'Login', logout: 'Logout', welcome: 'Welcome' },
    hero: { badge: 'Lucky Beetle Collection 2025', title1: 'Nature\'s', title2: 'Fortune', subtitle: 'Premium collection of rare and auspicious beetles. Elevate your prestige with our ethically bred beetles delivered to your door.', btnShop: 'Shop Now', btnAuction: 'Go to Auction' },
    shop: { title: 'All Products', subtitle: 'Comprehensive collection of beetle species and premium breeding supplies.', filters: { all: 'All', rhino: 'Rhino Beetle', stag: 'Stag Beetle', supplies: 'Supplies' }, stock: 'In Stock', addToCart: 'Add to Cart' },
    auction: { title: 'Auction Hall', subtitle: 'Bid now to own legendary rare beetles.', live: 'Live', currentBid: 'Current Bid', endsIn: 'Ends on', timeLeft: 'Time left', bids: 'bids', btnDetail: 'View Detail / Bid', loginToBid: 'Login to Bid', ended: 'Auction Ended' },
    contact: { title: 'Contact Us', subtitle: 'Have questions about beetle care or species? The Lucky Beetle team is always ready to help.', address: 'Store Address', phone: 'Phone', email: 'Email', formTitle: 'Send us a message', namePlace: 'Your Name', msgPlace: 'Message...', sendBtn: 'Send Message' },
    login: { title: 'Login', subtitle: 'Login to purchase or bid on items.', fbBtn: 'Login with Facebook', or: 'OR', userLabel: 'Username', passLabel: 'Password', submitBtn: 'Login', error: 'Invalid username or password' },
    admin: { 
      title: 'Store Dashboard', 
      tabOverview: 'Overview',
      tabProduct: 'Products', 
      tabAuction: 'Auctions', 
      addProduct: 'New Product', 
      addAuction: 'Start Auction', 
      saveBtn: 'Save Data', 
      stats: { products: 'Total Products', auctions: 'Active Auctions', users: 'Total Users', revenue: 'Total Revenue' },
      form: { name: 'Name (Thai)', sci: 'Scientific Name', price: 'Price', cat: 'Category', img: 'Image URL', desc: 'Description', startBid: 'Starting Bid', time: 'Duration (Minutes)' } 
    },
    product: { back: 'Back', shipping: 'Free Shipping', guarantee: 'Warranty', consult: 'Free Consult', price: 'Price' },
    cart: { title: 'Shopping Cart', empty: 'Your cart is empty', total: 'Total', checkout: 'Checkout' },
    common: { successCart: 'Added to cart successfully', successLogin: 'Login successful', successLogout: 'Logged out successfully', requireLogin: 'Please login first' }
  }
};

// --- Initial Data ---
const initialProducts: Product[] = [
  { id: 1, name: "Hercules Beetle", thaiName: "ด้วงกว่างเฮอร์คิวลีส", scientific: "Dynastes hercules", price: 4500, category: "rhino", image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg", tag: "Best Seller", description: "ราชาแห่งด้วงกว่างที่มีขนาดใหญ่ที่สุดในโลก...", descriptionEn: "The king of rhinoceros beetles...", isAuction: false },
  { id: 2, name: "Giant Stag Beetle", thaiName: "ด้วงคีมฟันเลื่อย", scientific: "Dorcus titanus", price: 1200, category: "stag", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dorcus_titanus_palawanicus.jpg/1200px-Dorcus_titanus_palawanicus.jpg", tag: "New", description: "ด้วงคีมยอดนิยม...", descriptionEn: "Popular stag beetle...", isAuction: false },
  { id: 3, name: "Elephant Beetle", thaiName: "ด้วงช้างเมก้าโซม่า", scientific: "Megasoma elephas", price: 3800, category: "rhino", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Megasoma_elephas_male.jpg/1200px-Megasoma_elephas_male.jpg", description: "ด้วงร่างยักษ์...", descriptionEn: "Giant beetle...", isAuction: false },
  { id: 4, name: "Rainbow Stag", thaiName: "ด้วงคีมเจ็ดสี", scientific: "Phalacrognathus muelleri", price: 2500, category: "stag", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Phalacrognathus_muelleri_male_top.jpg/1200px-Phalacrognathus_muelleri_male_top.jpg", tag: "Rare", description: "อัญมณีมีชีวิต...", descriptionEn: "Living gem...", isAuction: false }
];

const initialAuctions: AuctionItem[] = [
  { id: 101, name: "Golden Stag Extreme", thaiName: "ด้วงคีมทองคำ", scientific: "Allotopus rosenbergi", price: 10000, startingBid: 5000, currentBid: 12500, category: "stag", endTime: Date.now() + 1000 * 60 * 60 * 2, bids: 15, bidHistory: [], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Allotopus_rosenbergi_male_MHNT.jpg/1200px-Allotopus_rosenbergi_male_MHNT.jpg", description: "หายากมาก...", descriptionEn: "Extremely rare...", isAuction: true },
  { id: 102, name: "Giant Hercules", thaiName: "เฮอร์คิวลีส ยักษ์", scientific: "Dynastes hercules", price: 8000, startingBid: 4000, currentBid: 9200, category: "rhino", endTime: Date.now() + 1000 * 60 * 60 * 5, bids: 8, bidHistory: [], image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg", description: "ไซส์ยักษ์...", descriptionEn: "Massive size...", isAuction: true }
];

// --- Components ---

const ProductCard = ({ product, onClick, onAddToCart, t, lang }: { product: Product, onClick: (p: Product) => void, onAddToCart: (p: Product) => void, t: any, lang: string }) => (
  <div onClick={() => onClick(product)} className="group bg-white rounded-2xl border border-gray-100 hover:border-[#C5A059]/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer">
    <div className="relative h-64 bg-[#F8F9FA] p-8 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
      {product.tag && <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1B4D3E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-100 shadow-sm z-10">{product.tag}</span>}
      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 relative z-0" />
      <button 
        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} 
        className="absolute bottom-4 right-4 bg-white text-[#1B4D3E] p-3 rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#1B4D3E] hover:text-white border border-gray-100 z-10"
      >
        <ShoppingBag size={18} />
      </button>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <p className="text-xs text-[#C5A059] font-medium mb-1 uppercase tracking-wider">{product.scientific}</p>
      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#1B4D3E] transition-colors line-clamp-1">
        {lang === 'th' ? product.thaiName : product.name}
      </h3>
      <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
        <span className="text-lg font-bold text-[#1B4D3E]">฿{product.price.toLocaleString()}</span>
        <span className="text-xs text-gray-400">{t.shop.stock}</span>
      </div>
    </div>
  </div>
);

const Navbar = ({ currentPage, onNavigate, cartCount, onOpenCart, user, onLogout, onToggleLang, lang, t }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="mr-2 bg-[#1B4D3E] text-white p-1 rounded-lg"><Sparkles size={20} className="text-[#C5A059]" /></div>
            <h1 className="text-2xl font-serif font-bold tracking-widest text-[#1B4D3E] group-hover:opacity-80">LUCKY<span className="text-[#C5A059]">BEETLE</span></h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {['home', 'shop', 'auction', 'contact'].map((key) => (
              <button key={key} onClick={() => onNavigate(key)} className={`text-sm font-medium uppercase tracking-wider ${currentPage === key ? 'text-[#1B4D3E]' : 'text-gray-500 hover:text-[#1B4D3E]'}`}>{t.nav[key]}</button>
            ))}
            {user?.role === 'admin' && <button onClick={() => onNavigate('admin')} className="text-sm font-bold text-red-600 uppercase tracking-wider flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full"><Settings size={14} /> {t.nav.admin}</button>}
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onToggleLang} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-sm font-bold text-gray-600"><Globe size={16} /><span>{lang.toUpperCase()}</span></button>
            <button className="relative text-gray-400 hover:text-[#1B4D3E]" onClick={onOpenCart}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>}
            </button>
            {user ? (
              <div className="flex items-center gap-2 border-l pl-4 ml-2">
                {user.avatar && <img src={user.avatar} className="w-8 h-8 rounded-full border border-gray-200" alt="avatar" />}
                <div className="text-right hidden sm:block"><p className="text-xs text-gray-400">{t.nav.welcome},</p><p className="text-sm font-bold text-[#1B4D3E] line-clamp-1 max-w-[100px]">{user.username}</p></div>
                <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500"><LogOut size={20} /></button>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="flex items-center gap-2 bg-[#1B4D3E] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#143d31]"><User size={16} /> <span className="hidden sm:inline">{t.nav.login}</span></button>
            )}
            <button className="md:hidden text-gray-400 ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full p-4 space-y-4 shadow-lg z-50">
          {['home', 'shop', 'auction', 'contact'].map(key => <button key={key} onClick={() => { onNavigate(key); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700">{t.nav[key]}</button>)}
        </div>
      )}
    </nav>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemove, onCheckout, t, lang }: any) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-[#1B4D3E]/20 backdrop-blur-sm z-[65]" onClick={onClose} />}
    <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white"><h2 className="text-lg font-serif font-bold text-[#1B4D3E]">{t.cart.title} ({cart.length})</h2><button onClick={onClose}><X size={20} className="text-gray-400 hover:text-red-500" /></button></div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cart.length === 0 ? <div className="text-center text-gray-400 mt-10">{t.cart.empty}</div> : cart.map((item: any) => (
          <div key={item.cartId} className="flex gap-4">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100"><img src={item.image} alt={item.name} className="max-w-[80%] max-h-[80%] mix-blend-multiply object-contain" /></div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div><h4 className="text-sm font-bold text-[#2D3436] line-clamp-1">{lang === 'th' ? item.thaiName : item.name}</h4><span className="text-sm font-bold text-[#1B4D3E]">฿{item.price.toLocaleString()}</span></div>
              <button onClick={() => onRemove(item.cartId)} className="self-end text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="border-t border-gray-100 p-6 bg-[#F8F9FA]">
          <div className="flex justify-between items-center mb-4"><span className="font-bold text-gray-900">{t.cart.total}</span><span className="text-xl font-bold text-[#1B4D3E]">฿{cart.reduce((sum: number, item: any) => sum + item.price, 0).toLocaleString()}</span></div>
          <button onClick={onCheckout} className="w-full bg-[#1B4D3E] text-white py-4 rounded-xl font-bold hover:bg-[#143d31] transition-all">{t.cart.checkout}</button>
        </div>
      )}
    </div>
  </>
);

const HomeView = ({ t, onNavigate, products, auctionItems, viewProductDetail, onAddToCart, lang }: any) => (
  <>
    <div className="relative bg-white pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-[#1B4D3E] rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">{t.hero.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1B4D3E] mb-6 leading-tight">
            {t.hero.title1}<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#d4af37]">{t.hero.title2}</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 font-light max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <div className="flex justify-center space-x-4">
            <button onClick={() => onNavigate('shop')} className="bg-[#1B4D3E] text-white px-10 py-4 rounded-full font-medium shadow-lg shadow-[#1B4D3E]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">{t.hero.btnShop}</button>
            <button onClick={() => onNavigate('auction')} className="bg-white text-[#1B4D3E] border border-[#1B4D3E]/20 px-10 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"><Gavel size={18} className="text-[#C5A059]" /><span>{t.hero.btnAuction}</span></button>
          </div>
        </div>
        <div className="mt-16 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#1B4D3E]/5 to-[#C5A059]/10 rounded-full blur-3xl -z-10"></div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg" className="mx-auto w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" alt="hero" />
        </div>
      </div>
    </div>

    {/* Auction Preview */}
    <div className="bg-[#F8F9FA] py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div><h2 className="text-3xl font-serif font-bold text-[#1B4D3E] mb-2 flex items-center gap-3"><span className="bg-red-100 text-red-600 p-2 rounded-full"><Gavel size={24} /></span>{t.auction.live}</h2><p className="text-gray-500">สินค้าที่กำลังเปิดประมูลอยู่อย่างดุเดือด</p></div>
          <button onClick={() => onNavigate('auction')} className="text-[#1B4D3E] font-bold hover:underline flex items-center gap-1 group">More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctionItems.slice(0, 4).map((item: any) => (
            <div key={item.id} onClick={() => viewProductDetail(item)} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative">
              <div className="relative h-56 bg-[#F8F9FA] p-6 flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse shadow-sm z-10"><Clock size={12} /> Live</div>
                <img src={item.image} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt={item.name} />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#1B4D3E] truncate text-lg mb-1">{lang === 'th' ? item.thaiName : item.name}</h3>
                <div className="flex justify-between items-end pt-3 border-t border-dashed border-gray-100">
                  <div><p className="text-xs text-gray-400 mb-1">{t.auction.currentBid}</p><p className="text-xl font-bold text-red-500">฿{item.currentBid.toLocaleString()}</p></div>
                  <div className="text-right"><p className="text-xs text-gray-400 mb-1">{t.auction.timeLeft}</p><CountdownTimer targetDate={item.endTime} /></div>
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
          <div><h2 className="text-3xl font-serif font-bold text-[#1B4D3E] mb-2 flex items-center gap-3"><span className="bg-[#1B4D3E]/10 text-[#1B4D3E] p-2 rounded-full"><Star size={24} /></span>สินค้าแนะนำ</h2><p className="text-gray-500">คัดสรรด้วงและอุปกรณ์คุณภาพเยี่ยมสำหรับคุณ</p></div>
          <button onClick={() => onNavigate('shop')} className="text-[#1B4D3E] font-bold hover:underline flex items-center gap-1 group">All Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product: any) => <ProductCard key={product.id} product={product} onClick={viewProductDetail} onAddToCart={onAddToCart} t={t} lang={lang} />)}
        </div>
        <div className="mt-12 text-center"><button onClick={() => onNavigate('shop')} className="border border-[#1B4D3E] text-[#1B4D3E] px-10 py-3 rounded-full font-bold hover:bg-[#1B4D3E] hover:text-white transition-all duration-300">{t.shop.title}</button></div>
      </div>
    </div>
  </>
);

const ShopView = ({ t, products, onAddToCart, viewProductDetail, lang }: any) => {
  const [activeCategory, setActiveCategory] = useState('all');
  return (
    <div className="bg-[#FFFFFF] py-16 border-t border-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12"><h1 className="text-4xl font-serif font-bold text-[#1B4D3E] mb-4">{t.shop.title}</h1><p className="text-gray-500">{t.shop.subtitle}</p></div>
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          {Object.keys(t.shop.filters).map(key => (
            <button key={key} onClick={() => setActiveCategory(key)} className={`mx-2 px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap border capitalize ${activeCategory === key ? 'bg-[#1B4D3E] text-white border-[#1B4D3E]' : 'bg-white text-gray-500 border-gray-200'}`}>{t.shop.filters[key]}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter((p: any) => activeCategory === 'all' || p.category === activeCategory).map((product: any) => (
            <ProductCard key={product.id} product={product} onClick={viewProductDetail} onAddToCart={onAddToCart} t={t} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AuctionView = ({ t, auctionItems, viewProductDetail, lang }: any) => (
  <div className="bg-[#FFFFFF] py-16 border-t border-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16"><div className="inline-block p-3 rounded-full bg-red-50 text-red-500 mb-4 animate-pulse"><Gavel size={32} /></div><h1 className="text-4xl font-serif font-bold text-[#1B4D3E] mb-2">{t.auction.title}</h1><p className="text-gray-500">{t.auction.subtitle}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {auctionItems.map((item: any) => (
          <div key={item.id} onClick={() => viewProductDetail(item)} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row cursor-pointer group">
            <div className="md:w-1/2 bg-[#F8F9FA] p-6 flex items-center justify-center relative">
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1"><Clock size={12} /> {t.auction.live}</div>
              <img src={item.image} className="max-w-full max-h-[200px] object-contain mix-blend-multiply" alt={item.name} />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1B4D3E] group-hover:text-[#C5A059]">{lang === 'th' ? item.thaiName : item.name}</h3>
                
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3 mt-2">
                   <Calendar size={14} />
                   <span>{t.auction.endsIn}: {new Date(item.endTime).toLocaleString(lang === 'th' ? 'th-TH' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                   <span className="text-gray-500 text-sm font-bold">{t.auction.timeLeft}</span>
                   <CountdownTimer targetDate={item.endTime} />
                </div>

                <div className="flex justify-between items-center mb-2 border-t pt-3"><span className="text-gray-500 text-sm">{t.auction.currentBid}</span><span className="text-2xl font-bold text-red-500">฿{item.currentBid.toLocaleString()}</span></div>
              </div>
              <button className="w-full bg-[#1B4D3E] text-white py-2 rounded-lg font-bold hover:bg-[#143d31]">{t.auction.btnDetail}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactView = ({ t }: any) => (
  <div className="bg-[#FFFFFF] py-16 border-t border-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#1B4D3E] mb-6">{t.contact.title}</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">{t.contact.subtitle}</p>
          <div className="space-y-6">
            <div className="flex items-start gap-4"><div className="bg-[#1B4D3E]/10 p-3 rounded-full text-[#1B4D3E]"><MapPin size={24}/></div><div><h4 className="font-bold text-gray-800">{t.contact.address}</h4><p className="text-gray-500 text-sm">123 Green Rd, Bangkok 10900</p></div></div>
            <div className="flex items-start gap-4"><div className="bg-[#1B4D3E]/10 p-3 rounded-full text-[#1B4D3E]"><Phone size={24}/></div><div><h4 className="font-bold text-gray-800">{t.contact.phone}</h4><p className="text-gray-500 text-sm">089-999-9999</p></div></div>
            <div className="flex items-start gap-4"><div className="bg-[#1B4D3E]/10 p-3 rounded-full text-[#1B4D3E]"><Mail size={24}/></div><div><h4 className="font-bold text-gray-800">{t.contact.email}</h4><p className="text-gray-500 text-sm">hello@luckybeetle.com</p></div></div>
          </div>
        </div>
        <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold text-[#1B4D3E] mb-6">{t.contact.formTitle}</h3>
          <form className="space-y-4">
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200" placeholder={t.contact.namePlace} />
            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200" placeholder="name@example.com" />
            <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200" placeholder={t.contact.msgPlace}></textarea>
            <button type="button" className="w-full bg-[#1B4D3E] text-white py-3 rounded-lg font-bold">{t.contact.sendBtn}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const LoginView = ({ t, onLogin, onFbLogin }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onLogin(username, password);
    if (!result) setError(t.login.error);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8"><div className="w-16 h-16 bg-[#1B4D3E]/10 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={32} className="text-[#1B4D3E]" /></div><h2 className="text-2xl font-serif font-bold text-[#1B4D3E]">{t.login.title}</h2><p className="text-gray-500 text-sm mt-2">{t.login.subtitle}</p></div>
        <button onClick={onFbLogin} className="w-full bg-[#1877F2] text-white py-3 rounded-lg font-bold hover:bg-[#166fe5] flex items-center justify-center gap-3 mb-6"><Facebook size={20} className="fill-current" /> {t.login.fbBtn}</button>
        <div className="relative mb-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">{t.login.or}</span></div></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.login.userLabel}</label><input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200" value={username} onChange={e => setUsername(e.target.value)} placeholder="user, admin" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.login.passLabel}</label><input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-200" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" /></div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full bg-[#1B4D3E] text-white py-3 rounded-lg font-bold">{t.login.submitBtn}</button>
        </form>
      </div>
    </div>
  );
};

// --- Improved Admin Dashboard ---
const AdminDashboard = ({ t, products, setProducts, auctionItems, setAuctionItems, notify }: any) => {
  const [tab, setTab] = useState<'overview' | 'products' | 'auctions'>('overview');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ category: 'rhino', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg', isAuction: false });
  const [newAuction, setNewAuction] = useState<Partial<AuctionItem>>({ category: 'rhino', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Dynastes_hercules_ecuatorianus_MHNT.jpg', isAuction: true, endsIn: '120', startingBid: 0 });
  const [viewingLogs, setViewingLogs] = useState<number | null>(null);

  // Add Product Logic
  const handleAddProduct = () => {
      if (!newProduct.thaiName || !newProduct.price) { notify('กรุณากรอกข้อมูลให้ครบ'); return; }
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
          tag: "New"
      };
      setProducts([product, ...products]);
      notify(t.admin.saveBtn + ' Success');
      setNewProduct({ category: 'rhino', image: newProduct.image, isAuction: false });
  };

  // Add Auction Logic
  const handleAddAuction = () => {
       if (!newAuction.thaiName || !newAuction.startingBid) { notify('กรุณากรอกข้อมูลให้ครบ'); return; }
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
           endTime: Date.now() + (durationMinutes * 60 * 1000),
           bids: 0,
           bidHistory: []
       };
       setAuctionItems([auction, ...auctionItems]);
       notify(t.admin.startAuction + ' Success');
       setNewAuction({ category: 'rhino', image: newAuction.image, isAuction: true, startingBid: 0, endsIn: '120' });
  };

  const handleDeleteProduct = (id: number) => { if (window.confirm('ยืนยันการลบ?')) setProducts(products.filter((p: any) => p.id !== id)); };
  const handleDeleteAuction = (id: number) => { if (window.confirm('ยืนยันการลบ?')) setAuctionItems(auctionItems.filter((p: any) => p.id !== id)); };

  const stats = [
    { title: t.admin.stats.products, value: products.length, icon: Package, color: 'bg-blue-500' },
    { title: t.admin.stats.auctions, value: auctionItems.length, icon: Gavel, color: 'bg-[#C5A059]' },
    { title: t.admin.stats.users, value: '1,234', icon: Users, color: 'bg-green-500' },
    { title: t.admin.stats.revenue, value: '฿45,200', icon: DollarSign, color: 'bg-purple-500' },
  ];

  return (
      <div className="bg-[#F3F4F6] min-h-screen py-10 px-4 font-sans">
          <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <h1 className="text-3xl font-serif font-bold text-[#1B4D3E] flex items-center gap-3 mb-4 md:mb-0">
                      <LayoutDashboard size={32} /> {t.admin.title}
                  </h1>
                  <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
                      {[
                        { id: 'overview', label: t.admin.tabOverview, icon: LayoutDashboard },
                        { id: 'products', label: t.admin.tabProduct, icon: Package },
                        { id: 'auctions', label: t.admin.tabAuction, icon: Gavel }
                      ].map((menu) => (
                        <button 
                          key={menu.id} 
                          onClick={() => setTab(menu.id as any)} 
                          className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${tab === menu.id ? 'bg-[#1B4D3E] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          <menu.icon size={16} /> {menu.label}
                        </button>
                      ))}
                  </div>
              </div>

              {/* Content */}
              {tab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg shadow-gray-200`}><stat.icon size={24} /></div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-[#1B4D3E]">{stat.value}</h3>
                      </div>
                    </div>
                  ))}
                  {/* Recent Activity Placeholder */}
                  <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#1B4D3E] mb-4">Recent Activities</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600"><div className="w-2 h-2 bg-green-500 rounded-full"></div> New order #1023 received</div>
                      <div className="flex items-center gap-3 text-sm text-gray-600"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> New user registered</div>
                      <div className="flex items-center gap-3 text-sm text-gray-600"><div className="w-2 h-2 bg-[#C5A059] rounded-full"></div> Auction #101 ended</div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'products' && (
                  <div className="space-y-8 animate-fade-in-up">
                      {/* Add Product Form */}
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#1B4D3E] pb-2 border-b border-gray-100"><Plus size={20}/> {t.admin.addProduct}</h2>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              {/* Image Preview Section */}
                              <div className="lg:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Preview Image</label>
                                <div className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
                                  {newProduct.image ? (
                                    <img src={newProduct.image} className="w-full h-full object-contain" alt="preview" />
                                  ) : (
                                    <div className="text-center text-gray-400"><ImageIcon size={40} className="mx-auto mb-2" /><span className="text-xs">No image URL</span></div>
                                  )}
                                </div>
                                <input className="mt-4 w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B4D3E]" placeholder={t.admin.form.img} value={newProduct.image || ''} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                              </div>

                              {/* Form Inputs */}
                              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.name}</label><input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1B4D3E] transition-colors" value={newProduct.thaiName || ''} onChange={e => setNewProduct({...newProduct, thaiName: e.target.value})} /></div>
                                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.sci}</label><input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1B4D3E] transition-colors" value={newProduct.scientific || ''} onChange={e => setNewProduct({...newProduct, scientific: e.target.value})} /></div>
                                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.cat}</label><select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1B4D3E] transition-colors" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}><option value="rhino">Rhino</option><option value="stag">Stag</option><option value="supplies">Supplies</option></select></div>
                                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.price}</label><input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1B4D3E] transition-colors" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} /></div>
                                  <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.desc}</label><textarea rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1B4D3E] transition-colors" value={newProduct.description || ''} onChange={e => setNewProduct({...newProduct, description: e.target.value})} /></div>
                                  <div className="md:col-span-2 flex justify-end"><button onClick={handleAddProduct} className="bg-[#1B4D3E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#143d31] shadow-lg shadow-[#1B4D3E]/20 transition-all active:scale-95">{t.admin.saveBtn}</button></div>
                              </div>
                          </div>
                      </div>

                      {/* Table */}
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                          <table className="w-full text-left border-collapse">
                              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider"><tr><th className="p-4 font-bold">Product</th><th className="p-4 font-bold">Category</th><th className="p-4 font-bold">Price</th><th className="p-4 text-right font-bold">Action</th></tr></thead>
                              <tbody className="divide-y divide-gray-100">
                                  {products.map((p: any) => (
                                      <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                                          <td className="p-4 flex items-center gap-4"><img src={p.image} className="w-12 h-12 rounded-lg object-contain bg-white border border-gray-100" alt="product" /><div><p className="font-bold text-[#1B4D3E]">{p.thaiName}</p><p className="text-xs text-gray-400 font-mono">{p.scientific}</p></div></td>
                                          <td className="p-4"><span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs uppercase">{p.category}</span></td>
                                          <td className="p-4 font-bold text-[#1B4D3E]">฿{p.price.toLocaleString()}</td>
                                          <td className="p-4 text-right"><button onClick={() => handleDeleteProduct(p.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"><Trash2 size={18} /></button></td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {tab === 'auctions' && (
                  <div className="space-y-8 animate-fade-in-up">
                      {/* Add Auction Form */}
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-2 h-full bg-[#C5A059]"></div>
                          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#C5A059] pb-2 border-b border-gray-100"><Gavel size={20}/> {t.admin.addAuction}</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.name}</label><input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#C5A059] transition-colors" value={newAuction.thaiName || ''} onChange={e => setNewAuction({...newAuction, thaiName: e.target.value})} /></div>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.startBid}</label><input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#C5A059] transition-colors" value={newAuction.startingBid || ''} onChange={e => setNewAuction({...newAuction, startingBid: Number(e.target.value)})} /></div>
                                      <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.time}</label><input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#C5A059] transition-colors" value={newAuction.endsIn || ''} onChange={e => setNewAuction({...newAuction, endsIn: e.target.value})} /></div>
                                  </div>
                              </div>
                              <div className="space-y-4">
                                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.admin.form.img}</label><input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#C5A059] transition-colors" value={newAuction.image || ''} onChange={e => setNewAuction({...newAuction, image: e.target.value})} /></div>
                                  <div className="flex justify-end items-end h-full pb-1"><button onClick={handleAddAuction} className="bg-[#C5A059] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b08d4b] shadow-lg shadow-[#C5A059]/20 w-full md:w-auto transition-all active:scale-95">{t.admin.startAuction}</button></div>
                              </div>
                          </div>
                      </div>

                      {/* Auction List */}
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                           <table className="w-full text-left border-collapse">
                              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider"><tr><th className="p-4 font-bold">Item</th><th className="p-4 font-bold">Current Bid</th><th className="p-4 font-bold">Status</th><th className="p-4 text-right font-bold">Action</th></tr></thead>
                              <tbody className="divide-y divide-gray-100">
                                  {auctionItems.map((p: any) => (
                                      <React.Fragment key={p.id}>
                                          <tr className="hover:bg-gray-50 transition-colors">
                                              <td className="p-4 flex items-center gap-4"><img src={p.image} className="w-12 h-12 rounded-lg object-contain bg-white border border-gray-100" alt="auction" /><div><p className="font-bold text-[#1B4D3E]">{p.thaiName}</p><p className="text-xs text-gray-400 font-mono"><CountdownTimer targetDate={p.endTime} /></p></div></td>
                                              <td className="p-4 font-bold text-red-500">฿{p.currentBid.toLocaleString()}</td>
                                              <td className="p-4"><span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold uppercase animate-pulse">Live</span></td>
                                              <td className="p-4 text-right flex justify-end gap-2">
                                                  <button onClick={() => setViewingLogs(viewingLogs === p.id ? null : p.id)} className={`p-2 rounded-full transition-colors ${viewingLogs === p.id ? 'bg-[#1B4D3E] text-white' : 'text-gray-400 hover:bg-gray-100'}`} title="Logs"><History size={18}/></button>
                                                  <button onClick={() => handleDeleteAuction(p.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"><Trash2 size={18} /></button>
                                              </td>
                                          </tr>
                                          {viewingLogs === p.id && (
                                              <tr className="bg-gray-50/50">
                                                  <td colSpan={4} className="p-4">
                                                      <div className="bg-white border border-gray-100 rounded-xl p-4 max-w-3xl mx-auto shadow-inner">
                                                          <h4 className="font-bold text-xs uppercase text-gray-400 mb-3 tracking-wider">Bid History Log</h4>
                                                          {p.bidHistory.length > 0 ? (
                                                              <ul className="space-y-2 text-sm">
                                                                  {p.bidHistory.map((log: any, idx: number) => (<li key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                                                                    <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">{log.userId.charAt(0).toUpperCase()}</div><span className="font-medium text-gray-700">{log.userId}</span></div>
                                                                    <div className="flex items-center gap-4"><span className="text-xs text-gray-400 font-mono">{log.timestamp.toLocaleTimeString()}</span><span className="font-bold text-[#1B4D3E]">฿{log.amount.toLocaleString()}</span></div>
                                                                  </li>))}
                                                              </ul>
                                                          ) : <div className="text-center py-4 text-gray-400 text-sm">No bids placed yet.</div>}
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
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'auction' | 'contact' | 'login' | 'admin' | 'product-detail'>('home');
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const t = translations[lang];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>(initialAuctions);
  const [selectedProduct, setSelectedProduct] = useState<Product | AuctionItem | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'system', content: 'สวัสดีครับ!' }]);

  const notify = (msg: string) => { setNotificationMsg(msg); setShowNotification(true); setTimeout(() => setShowNotification(false), 3000); };
  const addToCart = (product: Product) => { setCart([...cart, { ...product, cartId: Date.now() + Math.random() }]); notify(t.common.successCart); setIsCartOpen(true); };
  const removeFromCart = (cartId: number) => setCart(cart.filter(item => item.cartId !== cartId));
  const handleCheckout = () => { if (!user) { notify(t.common.requireLogin); setIsCartOpen(false); setCurrentPage('login'); } else { notify('Checkout!'); } };
  const checkAuth = (action: () => void) => { if (user) action(); else { notify(t.common.requireLogin); setCurrentPage('login'); } };
  const viewProductDetail = (product: Product | AuctionItem) => { setSelectedProduct(product); setCurrentPage('product-detail'); window.scrollTo(0,0); };
  
  const handleLogin = (u: string, p: string) => {
    const cleanUser = u.trim();
    if (cleanUser === 'admin' && p === 'password') { setUser({ username: 'Admin', role: 'admin' }); setCurrentPage('admin'); notify(t.common.successLogin); return true; }
    if (cleanUser === 'user' && p === 'password') { setUser({ username: 'Khun User', role: 'user' }); setCurrentPage('home'); notify(t.common.successLogin); return true; }
    return false;
  };

  const handleFbLogin = () => {
    setTimeout(() => { setUser({ username: "Facebook User", role: 'user', provider: 'facebook', avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" }); setCurrentPage('home'); notify(t.common.successLogin); }, 800);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-[#2D3436]">
      <div className={`fixed top-24 right-5 bg-white border-l-4 border-[#1B4D3E] text-[#1B4D3E] px-6 py-4 rounded shadow-xl z-[60] transform transition-all duration-300 flex items-center space-x-3 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}><ShieldCheck size={20} /><span className="font-medium text-sm">{notificationMsg}</span></div>
      
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} user={user} onLogout={() => { setUser(null); setCurrentPage('home'); }} onToggleLang={() => setLang(prev => prev === 'th' ? 'en' : 'th')} lang={lang} t={t} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={removeFromCart} onCheckout={handleCheckout} t={t} lang={lang} />

      {currentPage === 'home' && <HomeView t={t} onNavigate={setCurrentPage} products={products} auctionItems={auctionItems} viewProductDetail={viewProductDetail} onAddToCart={addToCart} lang={lang} />}
      {currentPage === 'shop' && <ShopView t={t} products={products} onAddToCart={addToCart} viewProductDetail={viewProductDetail} lang={lang} />}
      {currentPage === 'auction' && <AuctionView t={t} auctionItems={auctionItems} viewProductDetail={viewProductDetail} lang={lang} />}
      {currentPage === 'contact' && <ContactView t={t} />}
      {currentPage === 'login' && <LoginView t={t} onLogin={handleLogin} onFbLogin={handleFbLogin} />}
      
      {currentPage === 'admin' && (
        user?.role === 'admin' 
          ? <AdminDashboard t={t} products={products} setProducts={setProducts} auctionItems={auctionItems} setAuctionItems={setAuctionItems} notify={notify} /> 
          : <div className="p-20 text-center"><h2 className="text-2xl font-bold text-red-500">Access Denied</h2><p>Please login as admin.</p></div>
      )}

      {currentPage === 'product-detail' && selectedProduct && (
        <div className="min-h-screen bg-white pt-8 pb-20">
             <div className="max-w-7xl mx-auto px-4"><button onClick={() => setCurrentPage(selectedProduct.isAuction ? 'auction' : 'shop')} className="flex items-center text-gray-500 mb-6"><ArrowLeft size={20} className="mr-2"/> {t.product.back}</button>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12"><div className="bg-[#F8F9FA] rounded-2xl p-10 flex items-center justify-center"><img src={selectedProduct.image} className="max-w-full max-h-[500px] object-contain" alt="detail" /></div>
             <div><h1 className="text-4xl font-serif font-bold text-[#1B4D3E] mb-4">{lang === 'th' ? selectedProduct.thaiName : selectedProduct.name}</h1><p className="text-gray-500 mb-8">{lang === 'th' ? selectedProduct.description : selectedProduct.descriptionEn}</p>
             {selectedProduct.isAuction ? (
                 <div className="space-y-4">
                   <span className="text-4xl font-bold text-red-500">฿{(selectedProduct as AuctionItem).currentBid.toLocaleString()}</span>
                   <div className="text-gray-500 flex items-center gap-2"><Calendar size={16}/> {t.auction.endsIn}: {new Date((selectedProduct as AuctionItem).endTime).toLocaleString(lang === 'th' ? 'th-TH' : 'en-US')}</div>
                   <div className="text-gray-500 font-bold">{t.auction.timeLeft}: <CountdownTimer targetDate={(selectedProduct as AuctionItem).endTime} /></div>
                   <button onClick={() => checkAuth(() => notify('Bid Placed!'))} className="w-full bg-[#1B4D3E] text-white py-4 rounded-xl font-bold">Bid Now</button>
                 </div>
             ) : (
                 <div className="flex justify-between items-center"><span className="text-3xl font-bold text-[#1B4D3E]">฿{selectedProduct.price.toLocaleString()}</span><button onClick={() => addToCart(selectedProduct)} className="bg-[#1B4D3E] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"><ShoppingBag size={20}/> {t.shop.addToCart}</button></div>
             )}
             </div></div></div>
        </div>
      )}

      <button onClick={() => setIsAiOpen(true)} className="fixed bottom-8 right-8 z-40 bg-white border border-[#1B4D3E]/10 text-[#1B4D3E] p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#1B4D3E]/20 transition-all duration-300 group"><Sparkles size={24} className="text-[#C5A059]" /><span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1B4D3E] text-white text-xs py-1.5 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Lucky AI</span></button>
      
      {isAiOpen && (
        <div className="fixed inset-0 bg-[#1B4D3E]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsAiOpen(false)}>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center"><h3 className="font-bold text-[#1B4D3E]">Lucky AI Assistant</h3><button onClick={() => setIsAiOpen(false)}><X size={20} className="text-gray-400" /></button></div>
            <div className="flex-1 overflow-y-auto p-5 bg-[#F8F9FA] space-y-4">
              {chatMessages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#1B4D3E] text-white' : 'bg-white text-gray-700 border border-gray-100'}`}>{msg.content}</div></div>))}
              {isAiLoading && <Loader2 className="animate-spin text-[#C5A059]" size={20} />}
            </div>
            <div className="p-4 bg-white border-t border-gray-100 relative"><input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B4D3E]" placeholder="ถาม AI..." /><button onClick={() => {}} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#1B4D3E]"><Send size={18} /></button></div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0"><h2 className="text-xl font-serif font-bold text-[#1B4D3E] mb-2">LUCKY<span className="text-[#C5A059]">BEETLE</span></h2><p className="text-gray-400 text-sm">© 2025 Lucky Beetle. สงวนลิขสิทธิ์.</p></div>
          <div className="flex space-x-8 text-sm text-gray-500"><a href="#" className="hover:text-[#1B4D3E]">{t.contact.title}</a></div>
        </div>
      </footer>
    </div>
  );
};

export default App;