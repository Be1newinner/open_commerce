import NewsLetter from "@/components/Home/NewsLetter";
import Hero from "@/components/Home/Hero";
import Category from "@/components/Home/Category";
import TrendingProducts from "@/components/Home/TrendingProducts";
import CollectionSwiper from "@/components/Home/CollectionSwiper";
import OnSale from "@/components/Home/OnSale";
import ProductDetails from "@/app/ProductDetails/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <TrendingProducts />
      <CollectionSwiper />
      <OnSale />
      <NewsLetter />
      <ProductDetails />
    </div>
  );
}
