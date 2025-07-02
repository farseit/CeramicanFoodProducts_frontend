import RecentOrder from "@/components/Dashboard/DashboardHome/RecentOrder/RecentOrder";
import Hero from "@/components/Hero/Hero";
import ExploreEvery from "@/components/Home/HomePage/ExploreEvery";
import Features from "@/components/Home/HomePage/Features/Features";
import LatestNews from "@/components/Home/HomePage/LatestNews/LatestNews";
import NewArrivalContainer from "@/components/Home/HomePage/NewArrival/NewArrivalContainer";
import StylishShop from "@/components/Home/HomePage/StylishShop";
import TopBrandProducts from "@/components/Home/HomePage/TopBrandProducts/TopBrandProducts";
import ProductContainer from "@/components/Product/ProductContainer";
import WhatsApp from "@/components/Whatsapp/WhatsApp";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`w-[95%] mx-auto ${inter.className}`}>
      <WhatsApp />
      <Hero />
      {/* features items  */}
      <Features />
      <ExploreEvery />
      <NewArrivalContainer />
      <StylishShop />
      <TopBrandProducts />
      <LatestNews />
    </div>
  );
}
