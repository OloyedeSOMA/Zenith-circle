import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto w-full max-w-[100%] bg-white">
      <HeaderNav />

    
      <main className="w-full max-w-[100%] flex flex-col justify-center">
        <HeroSection/>
      </main>

      <Footer />
    </div>
  );
}
