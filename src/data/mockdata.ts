import { AuctionItemType, ProductType } from "../types/product.type";

export const initialProducts: ProductType[] = [
  {
    id: 1,
    name: {
      th: "ด้วงกว่างเฮอร์คิวลีส",
      en: "Hercules Beetle",
    },
    scientific: "Dynastes hercules",
    price: 4500,
    category: "rhino",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    tag: "best seller",
    description: {
      th: "ราชาแห่งด้วงกว่างที่มีขนาดใหญ่ที่สุดในโลก...",
      en: "The king of rhinoceros beetles...",
    },
    isAuction: false,
  },
  {
    id: 2,
    name: {
      th: "ด้วงคีมฟันเลื่อย",
      en: "Giant Stag Beetle",
    },
    scientific: "Dorcus titanus",
    price: 1200,
    category: "stag",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    tag: "new",
    description: {
      th: "ด้วงคีมยอดนิยม...",
      en: "Popular stag beetle...",
    },
    isAuction: false,
  },
  {
    id: 3,
    name: {
      th: "ด้วงช้างเมก้าโซม่า",
      en: "Elephant Beetle",
    },
    scientific: "Megasoma elephas",
    price: 3800,
    category: "rhino",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    description: {
      th: "ด้วงร่างยักษ์...",
      en: "Giant beetle...",
    },
    isAuction: false,
  },
  {
    id: 4,
    name: {
      th: "ด้วงคีมเจ็ดสี",
      en: "Rainbow Stag",
    },
    scientific: "Phalacrognathus muelleri",
    price: 2500,
    category: "stag",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    tag: "rare",
    description: {
      th: "อัญมณีมีชีวิต...",
      en: "Living gem...",
    },
    isAuction: false,
  },
];

export const initialAuctions: AuctionItemType[] = [
  {
    id: 101,
    name: {
      th: "ด้วงคีมทองคำ",
      en: "Golden Stag Extreme",
    },
    scientific: "Allotopus rosenbergi",
    price: 10000,
    startingBid: 5000,
    currentBid: 12500,
    category: "stag",
    endTime: Date.now() + 1000 * 60 * 60 * 2,
    bids: 15,
    bidHistory: [],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    description: {
      th: "หายากมาก...",
      en: "Extremely rare...",
    },
    isAuction: true,
  },
  {
    id: 102,
    name: {
      th: "เฮอร์คิวลีส ยักษ์",
      en: "Giant Hercules",
    },
    scientific: "Dynastes hercules",
    price: 8000,
    startingBid: 4000,
    currentBid: 9200,
    category: "rhino",
    endTime: Date.now() + 1000 * 60 * 60 * 5,
    bids: 8,
    bidHistory: [],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dynastes_hercules_ecuatorianus_MHNT.jpg",
    description: {
      th: "ไซส์ยักษ์...",
      en: "Massive size...",
    },
    isAuction: true,
  },
];
