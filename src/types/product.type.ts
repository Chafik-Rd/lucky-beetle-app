interface ILocalizedText {
  th: string;
  en: string;
}

export interface BaseProductType {
  id: number;
  name: ILocalizedText;
  entityType: "beetle" | "supply";
  price: number;
  category: string;
  image: string;
  description: ILocalizedText;
  isAuction: boolean;
}

export interface BeetleType extends BaseProductType {
  entityType: "beetle";
  isAuction: false;
  scientific: string;
  tag?: "best seller" | "new" | "rare";
}

export interface SupplyType extends BaseProductType {
  entityType: "supply";
  isAuction: false;
  brand: string;
  unit: string;
}

interface BidLog {
  userId: string;
  amount: number;
  timestamp: Date;
}
interface AuctionItemType {
  isAuction: true;
  startingBid: number;
  currentBid?: number;
  endTime: number;
  bids: number;
  bidHistory: BidLog[];
}

export interface BeetleAuctionItemType
  extends Omit<BeetleType, "isAuction">, AuctionItemType {}
export interface SupplyAuctionItemType
  extends Omit<SupplyType, "isAuction">, AuctionItemType {}

export type ProductType =
  | BeetleType
  | BeetleAuctionItemType
  | SupplyType
  | SupplyAuctionItemType;
