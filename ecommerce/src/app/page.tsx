"use client";
import NewsLetter from "@/components/Home/NewsLetter";
import Hero from "@/components/Home/Hero";
import Category from "@/components/Home/Category";
import TrendingProducts from "@/components/Home/TrendingProducts";
import CollectionSwiper from "@/components/Home/CollectionSwiper";
import OnSale from "@/components/Home/OnSale";

export default function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <TrendingProducts />
      <CollectionSwiper />
      <OnSale />
      <NewsLetter />
    </div>
  );
}
