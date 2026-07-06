import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesPreview from "@/components/CategoriesPreview";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";

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