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
    <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-5">
      <h3 className="mb-4 text-base font-bold text-[#1f1f1f]">
        Account Information
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[140px_1fr] gap-4 text-sm"
          >
            <span className="text-[#70696b]">
              {item.label}
            </span>

            <span className="break-words text-[#363132]">
              {item.value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}