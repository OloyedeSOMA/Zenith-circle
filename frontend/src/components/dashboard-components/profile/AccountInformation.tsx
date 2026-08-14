interface AccountInformationProps {
  items: {
    label: string;
    value: string;
  }[];
}

export default function AccountInformation({
  items,
}: AccountInformationProps) {
  return (
    <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-4">
      <h3 className="mb-3 text-xs font-bold text-[#1f1f1f]">
        Account Information
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[110px_1fr] gap-3 text-[11px]"
          >
            <span className="text-[#70696b]">
              {item.label}
            </span>

            <span className="text-[#363132]">
              {item.value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}