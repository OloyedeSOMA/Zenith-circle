import Link from "next/link";
import { Briefcase, GraduationCap, Building2, Globe, type LucideIcon } from "lucide-react";

interface CategoryItem {
  label: string;
  count: string;
  href: string;
  icon: LucideIcon;
  color: "orange" | "green" | "blue" | "purple";
}

const iconColorClasses: Record<CategoryItem["color"], string> = {
  orange: "bg-[#fce1cd] text-[#b5610a]",
  green: "bg-[#d5f4cf] text-[#1b6b3a]",
  blue: "bg-[#dbe6fd] text-[#2354c9]",
  purple: "bg-[#e5defc] text-[#5b3fc9]",
};

const categories: CategoryItem[] = [
  { label: "Internships", count: "100+", href: "/internships", icon: Briefcase, color: "orange" },
  { label: "Scholarships", count: "50+", href: "/scholarships", icon: GraduationCap, color: "green" },
  { label: "Jobs", count: "70+", href: "/jobs", icon: Building2, color: "blue" },
  { label: "Remote", count: "50+", href: "/opportunities?remote=true", icon: Globe, color: "purple" },
];

const BrowseByCategory = () => (
  <div className="flex flex-col gap-4">
    <h2 className="text-lg font-semibold text-gray-900">Browse by category</h2>

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map(({ label, count, href, icon: Icon, color }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-col gap-3 rounded-[16px] border border-gray-100 bg-white p-4 transition hover:border-[#2b6b41]"
        >
          <div className="flex items-center justify-between">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${iconColorClasses[color]}`}>
              <Icon size={17} />
            </div>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
              {count}
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{label}</span>
        </Link>
      ))}
    </div>
  </div>
);

export default BrowseByCategory;