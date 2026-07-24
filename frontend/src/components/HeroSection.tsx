"use client";

import Image from "next/image";
import { Search, ShieldCheck } from "lucide-react";

import HeroImage from "../../public/hero-image1.png";
import VerifiedCard from "../../public/hero-image2.png";
import SaveTrackCard from "../../public/hero-image3.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#F5F6F7] max-w-[100%] flex justify-center">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Left */}
        <div className="w-full lg:w-[55%]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DDF4DD] px-4 py-2">
            <ShieldCheck
              size={18}
              className="fill-primary text-primary"
            />

            <span className="text-sm font-medium text-primary">
              Verified opportunities. Real Impact
            </span>
          </div>

          <h1 className="mt-6 max-w-xl text-3xl font-bold leading-tight text-secondary lg:text-4xl">
            Your next opportunity,
            <span className="text-primary"> Starts here..</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
            Discover thousands of verified internships, scholarships,
            entry-level jobs tailored to your skills and career goals.
          </p>

          {/* Search */}
          <div className="relative mt-10 w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search"
              className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-5 text-sm outline-none transition focus:border-primary"
            />
          </div>
        </div>

        {/* Right */}
            <div className="relative hidden h-[480px] w-[460px] shrink-0 lg:block">
            {/* Main Image */}
            <div className="absolute right-0 top-0 h-[430px] w-[320px] overflow-hidden rounded-3xl">
                <Image
                src={HeroImage}
                alt="OpportunityHub"
                fill
                priority
                className="object-cover"
                />
            </div>

            {/* Verified Card */}
            <div className="absolute left-0 top-14 w-[185px]">
                <Image
                src={VerifiedCard}
                alt="Verified Opportunities"
                priority
                className="h-auto w-full"
                />
            </div>

            {/* Save & Track Card */}
            <div className="absolute bottom-10 right-[-15px] w-[150px]">
                <Image
                src={SaveTrackCard}
                alt="Save and Track"
                priority
                className="h-auto w-full"
                />
            </div>
            </div>
      </div>
    </section>
  );
};

export default HeroSection;