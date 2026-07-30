"use client";

import { ChevronDown, Briefcase, Globe, MapPin, RotateCcw } from "lucide-react";
import Button from "./Button";

const filters = [
  {
    title: "Country",
    value: "All Countries",
    icon: Globe,
  },
  {
    title: "Levels",
    value: "All Levels",
    icon: Briefcase,
  },
  {
    title: "Job Type",
    value: "All job types",
    icon: Briefcase,
  },
  {
    title: "Workspace",
    value: "All workspace",
    icon: MapPin,
  },
];

const FilterSection = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="mx-auto w-full max-w-[90%] rounded-lg border border-primary bg-white p-6 md:p-8">
        {/* Wrapper */}
        <div className="flex justify-center">
          <div className="flex w-full flex-col items-start gap-6 lg:w-fit">
            {/* Heading */}
            <h2 className="text-2xl font-semibold text-gray-900">
              Find opportunities that match your Preference
            </h2>

            {/* Filters */}
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {filters.map((filter) => {
                const Icon = filter.icon;

                return (
                  <button
                    key={filter.title}
                    className="
                      flex h-14 w-full
                      items-center justify-between
                      rounded-lg border border-primary
                      bg-white px-4
                      transition hover:border-primary-light
                      sm:w-[230px]
                      lg:min-w-[170px]
                      lg:flex-1
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <Icon
                          size={16}
                          className="text-white"
                        />
                      </div>

                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-900">
                          {filter.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {filter.value}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={18}
                      className="text-gray-500"
                    />
                  </button>
                );
              })}

              {/* Clear */}
              <button className="flex items-center justify-center gap-2 text-sm text-primary">
                <RotateCcw size={16} />
                Clear all
              </button>

              {/* Button */}
              <Button
                variant="primary"
                className="h-14 w-full rounded-xl sm:w-auto sm:min-w-[160px]"
              >
                View Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;