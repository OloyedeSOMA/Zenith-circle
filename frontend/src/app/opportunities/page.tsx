import HeaderNav from "@/components/HeaderNav"
import OpportunitiesSection from "@/components/OpportunitiesSection";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen mx-auto w-full max-w-[100%] bg-white gap-5">
      <HeaderNav />

    
      <main className="w-full max-w-[100%] flex flex-col justify-center gap-10">
        <OpportunitiesSection/>
        <Footer />
      </main>      
    </div>
  );
}