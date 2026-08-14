interface StatCardProps {
  value: number | string;
  label: string;
  sublabel: string;
  color: "orange" | "green" | "purple" | "blue";
  highlighted?: boolean;
}

const colorClasses: Record<StatCardProps["color"], string> = {
  orange: "bg-[#fce1cd] text-[#b5610a]",
  green: "bg-[#d5f4cf] text-[#1b6b3a]",
  purple: "bg-[#e5defc] text-[#5b3fc9]",
  blue: "bg-[#dbe6fd] text-[#2354c9]",
};

const StatCard = ({ value, label, sublabel, color, highlighted }: StatCardProps) => (
  <div
    className={`flex flex-1 flex-col gap-3 rounded-[16px] border bg-white px-5 py-4 ${
      highlighted ? "border-[#6172e8]" : "border-primary"
    }`}
  >
    <div
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-bold ${colorClasses[color]}`}
    >
      {value}
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-xs text-gray-400">{sublabel}</p>
    </div>
  </div>
);

export default StatCard;