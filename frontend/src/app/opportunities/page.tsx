import HeaderNav from "@/components/HeaderNav"
import OpportunitiesSection from "@/components/OpportunitiesSection";
import Footer from "@/components/Footer";


export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen mx-auto w-full max-w-[100%] bg-white gap-5">
      <HeaderNav />

    
      <main className="w-full max-w-[100%] flex flex-col justify-center">
        <section className="mx-auto mt-6 w-[90%] max-w-[1276px]">
          <OpportunitiesSection/>
        </section>
        
      </main> 
      <Footer />     
    </div>
  );
}