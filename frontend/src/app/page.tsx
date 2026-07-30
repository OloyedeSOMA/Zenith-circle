"use client"
import { useState, useEffect} from "react";

import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection"
import FilterSection from "@/components/FilterSection";
import OpportunitiesSection from "@/components/OpportunitiesSection";
import Footer from "@/components/Footer";
import LoadingSplash from "@/components/LoadingSplash";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSplash />;
  }

  return (
    <div className="min-h-screen mx-auto w-full max-w-[100%] bg-white gap-5">
      <HeaderNav />

    
      <main className="w-full max-w-[100%] flex flex-col justify-center gap-10">
        <HeroSection/>
        <FilterSection/>
        <OpportunitiesSection/>
        
      </main> 
      <Footer />     
    </div>
  );
}
