import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto w-full max-w-[100%] bg-white">
      <HeaderNav />

    
      <main className="">
        {/* ← Put all your homepage sections here (Hero, Recommended, etc.) */}
        
        {/* Temporary placeholder */}
        {/* <div className="min-h-[60vh] flex items-center justify-center border border-dashed border-gray-200 rounded-2xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Your next opportunity,<br />Starts here.
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Discover thousands of verified internships, scholarships, and entry-level jobs.
            </p>
          </div>
        </div> */}
        <HeroSection/>
      </main>

      <Footer />
    </div>
  );
}
