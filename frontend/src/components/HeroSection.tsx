"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ShieldCheck } from "lucide-react";

import HeroImage from "../../public/hero-image1.png";
import VerifiedCard from "../../public/hero-image2.png";
import SaveTrackCard from "../../public/hero-image3.png";

import { trackEvent } from "@/lib/gtag";

interface HeroSectionProps {
  onSearch?: (value: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch?.(searchValue);

    trackEvent("search_opportunity", {
      keyword: searchValue,
    });
  };

  return (
    <section className="w-full bg-[#F5F6F7]">
      <div className="mx-auto flex w-full max-w-[90%] mt-2 items-center justify-between py-10 lg:py-10">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#DDF4DD] px-4 py-2">
            <ShieldCheck
              size={18}
              className="fill-primary text-primary"
            />

            <span className="text-sm font-medium text-primary">
              Verified opportunities. Real Impact
            </span>
          </div>

          <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-secondary lg:text-4xl">
            Your next opportunity,
            <span className="text-primary"> Starts here..</span>
          </h1>

          <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
            Discover thousands of verified internships, scholarships,
            entry-level jobs tailored to your skills and career goals.
          </p>

          {/* Search */}
          <div className="relative mt-5 w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-primary"
            />

            <input
              type="text"
              placeholder="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              className="h-8 w-full rounded-xl border border-gray-200 bg-white p-5 px-8 text-sm text-black outline-none transition focus:border-primary"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-3 py-1 text-xs font-medium text-white"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative hidden aspect-[460/480] w-[42%] max-w-[460px] shrink-0 lg:block">
          {/* Main Image */}
          <div className="absolute right-0 top-0 h-[90%] w-[70%] overflow-hidden rounded-3xl">
            <Image
              src={HeroImage}
              alt="OpportunityHub"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Verified Card */}
          <div className="absolute left-0 top-[12%] w-[40%]">
            <Image
              src={VerifiedCard}
              alt="Verified Opportunities"
              width={185}
              height={185}
              priority
              className="h-auto w-full"
            />
          </div>

          {/* Save & Track Card */}
          <div className="absolute bottom-[8%] right-[-3%] w-[33%]">
            <Image
              src={SaveTrackCard}
              alt="Save and Track"
              width={150}
              height={150}
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