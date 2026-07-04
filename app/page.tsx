import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesPreview from "@/components/CategoriesPreview";
import Footer from "@/components/Footer";

const PopularProducts = dynamic(
  () => import("@/components/PopularProducts"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-[#120806] text-white">
      <Navbar />

      <Hero />

      <CategoriesPreview />

      <PopularProducts />

      <Footer />
    </main>
  );
}