"use client";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import FilterSection from "@/components/FilterSection";
import OpportunitiesSection from "@/components/OpportunitiesSection";
import Footer from "@/components/Footer";
import LoadingSplash from "@/components/LoadingSplash";
import { fetchOpportunities } from "@/lib/opportunity-api";

interface FilterState {
  opportunity_type?: string;
  field?: string;
  organisation?: string;
  location?: string;
  is_remote?: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    opportunity_type: "",
    field: "",
    organisation: "",
    location: "",
    is_remote: false,
  });

  const { data: filterData } = useQuery({
    queryKey: ["filter-options"],
    queryFn: async () => {
      const [pageOne, pageTwo] = await Promise.all([
        fetchOpportunities({ page: 1, page_size: 100 }),
        fetchOpportunities({ page: 2, page_size: 100 }),
      ]);

      return [...pageOne.results, ...pageTwo.results];
    },
  });

  const filterOptions = useMemo(() => {
    const locations = Array.from(
      new Set((filterData ?? []).map((item) => item.location).filter(Boolean))
    )
      .filter((location) => location.toLowerCase() !== "remote")
      .sort();
    const fields = Array.from(
      new Set((filterData ?? []).map((item) => item.field).filter(Boolean))
    ).sort();
    const opportunityTypes = Array.from(
      new Set((filterData ?? []).map((item) => item.opportunity_type).filter(Boolean))
    ).sort();
    const organisations = Array.from(
      new Set((filterData ?? []).map((item) => item.organisation).filter(Boolean))
    ).sort();

    return {
      location: ["Remote", ...locations],
      field: fields,
      opportunity_type: opportunityTypes,
      organisation: organisations,
    };
  }, [filterData]);

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
    <div className="min-h-screen mx-auto w-full max-w-[100%] bg-white gap-2">
      <HeaderNav />

      <main className="w-full max-w-[100%] flex flex-col justify-center gap-5">
        <HeroSection onSearch={setSearch} />
        <FilterSection
          onApplyFilters={setFilters}
          filterOptions={filterOptions}
          onResetFilters={() => setFilters({
            opportunity_type: "",
            field: "",
            organisation: "",
            location: "",
            is_remote: false,
          })}
        />
        <section className="mt-3 w-full max-w-[100%] flex justify-center mb-5">
          <div className="mx-auto w-[90%] max-w-[1276px] flex flex-col gap-3">
            <div className="flex w-full flex-row items-center justify-between md:flex-row">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Recommended for you
                </h2>
                <p className="text-sm text-gray-500">
                  Opportunities handpicked based on your profile and interests
                </p>
              </div>
              <Link
                href="/opportunities"
                className="text-sm font-medium text-gray-700 hover:underline sm:block"
              >
                View all
              </Link>
            </div>
            <OpportunitiesSection search={search} filters={filters} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
