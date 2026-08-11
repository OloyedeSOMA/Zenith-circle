import StatCard from "./StatCard";

export interface StatItem {
  value: number | string;
  label: string;
  sublabel: string;
  color: "orange" | "green" | "purple" | "blue";
  highlighted?: boolean;
}

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection = ({ stats }: StatsSectionProps) => (
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {stats.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </div>
);

export default StatsSection;