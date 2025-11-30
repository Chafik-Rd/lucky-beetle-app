interface ILocalizedText {
  th: string;
  en: string;
}

export interface BaseProductType {
  id: number;
  name: ILocalizedText;
  scientific: string;
  price: number;
  category: string;
  image: string;
  description: ILocalizedText;
  isAuction: boolean;
}

export interface ProductType extends BaseProductType {
  tag?: "best seller" | "new" | "rare";
}

interface BidLog {
  userId: string;
  amount: number;
  timestamp: Date;
}
export interface AuctionItemType extends BaseProductType {
  startingBid: number;
  currentBid?: number;
  endTime: number;
  bids: number;
  bidHistory: BidLog[];
}
