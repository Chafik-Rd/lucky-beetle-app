import { HeroPage } from "./hero";
import { AuctionPreview } from "./auctionPreview";
import { ProductPreview } from "./productPreview";

export const HomeView = () => {
  return (
    <>
      <HeroPage />
      <AuctionPreview />
      <ProductPreview />
    </>
  );
};
