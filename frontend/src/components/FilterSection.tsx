"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Briefcase, Globe, MapPin, RotateCcw } from "lucide-react";
import Button from "./Button";

interface FilterSectionProps {
  onApplyFilters?: (filters: {
    opportunity_type?: string;
    field?: string;
    organisation?: string;
    location?: string;
    is_remote?: boolean;
  }) => void;
  onResetFilters?: () => void;
  filterOptions?: {
    location?: string[];
    field?: string[];
    opportunity_type?: string[];
    organisation?: string[];
  };
}

const FilterSection = ({
  onApplyFilters,
  onResetFilters,
  filterOptions,
}: FilterSectionProps) => {
  const [selectedFilters, setSelectedFilters] = useState({
    opportunity_type: "",
    field: "",
    organisation: "",
    location: "",
    is_remote: false,
  });

  const getDisplayValue = (filterKey: string) => {
    const rawValue = selectedFilters[
      filterKey as keyof typeof selectedFilters
    ];

    if (typeof rawValue === "string" && rawValue.trim().length > 0) {
      return rawValue;
    }

    return filterConfigDefaults[filterKey as keyof typeof filterConfigDefaults];
  };

  const filterConfigDefaults = {
    location: "All locations",
    field: "All fields",
    opportunity_type: "All job types",
    organisation: "All organisations",
  };

  const filterConfig = useMemo(
    () => [
      {
        title: "Location",
        defaultValue: "All locations",
        icon: Globe,
        key: "location",
        options: ["All locations", ...(filterOptions?.location ?? [])],
      },
      {
        title: "Field",
        defaultValue: "All fields",
        icon: Briefcase,
        key: "field",
        options: ["All fields", ...(filterOptions?.field ?? [])],
      },
      {
        title: "Job Type",
        defaultValue: "All job types",
        icon: Briefcase,
        key: "opportunity_type",
        options: ["All job types", ...(filterOptions?.opportunity_type ?? [])],
      },
      {
        title: "Organisation",
        defaultValue: "All organisations",
        icon: MapPin,
        key: "organisation",
        options: ["All organisations", ...(filterOptions?.organisation ?? [])],
      },
    ],
    [filterOptions]
  );

  const handleChange = (key: string, value: string) => {
    setSelectedFilters((current) => {
      const nextState = {
        ...current,
        [key]: value === "All locations" || value === "All fields" || value === "All job types" || value === "All organisations"
          ? ""
          : value,
      } as typeof current;

      if (key === "location") {
        if (value === "Remote") {
          nextState.location = "";
          nextState.is_remote = true;
        } else if (value === "All locations") {
          nextState.location = "";
          nextState.is_remote = false;
        } else {
          nextState.location = value;
          nextState.is_remote = false;
        }
      }

      return nextState;
    });
  };

  const handleReset = () => {
    setSelectedFilters({
      opportunity_type: "",
      field: "",
      organisation: "",
      location: "",
      is_remote: false,
    });
    onResetFilters?.();
  };

  const handleSubmit = () => {
    onApplyFilters?.(selectedFilters);
  };

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
              {filterConfig.map((filter) => {
                const Icon = filter.icon;
                const currentValue = getDisplayValue(filter.key);

                return (
                  <div
                    key={filter.title}
                    className="relative flex h-16 w-full items-center rounded-xl border border-primary bg-white px-4 shadow-sm transition hover:border-primary-light sm:w-[250px] lg:min-w-[200px] lg:flex-1"
                  >
                    <div className="pointer-events-none flex w-full items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Icon size={16} className="text-white" />
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-[11px] font-semibold text-gray-900">
                          {filter.title}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {currentValue}
                        </p>
                      </div>
                    </div>

                    <select
                      value={currentValue}
                      onChange={(event) => handleChange(filter.key, event.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 outline-none"
                    >
                      {filter.options.map((option) => (
                        <option key={`${filter.title}-${option}`} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                  </div>
                );
              })}

              {/* Clear */}
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 text-sm text-primary"
              >
                <RotateCcw size={16} />
                Clear all
              </button>

              {/* Button */}
              <Button
                variant="primary"
                className="h-14 w-full rounded-xl sm:w-auto sm:min-w-[160px]"
                onClick={handleSubmit}
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