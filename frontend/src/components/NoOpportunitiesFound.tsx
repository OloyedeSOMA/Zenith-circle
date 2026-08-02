import Image from "next/image";
import Link from "next/link";

export default function NoOpportunitiesFound() {
  return (
    <div className="col-span-full flex w-full flex-col items-center justify-center rounded-[28px] border border-[#D0D9CF] bg-[linear-gradient(180deg,#F5E9EB_0%,#F4EDEE_100%)] px-6 py-12 text-center shadow-sm">
      <div className="mb-6 flex w-full items-center justify-center">
        <Image
          src="/no-opportunity.png"
          alt="No opportunities illustration"
          width={420}
          height={190}
          priority
          className="h-auto w-full max-w-[420px] object-contain"
        />
      </div>

      <h3 className="text-[28px] font-semibold text-[#0F172A] sm:text-[32px]">
        No Opportunities Found
      </h3>
      <p className="mt-2 text-sm text-[#475467] sm:text-base">
        Try changing your filters or search keyword
      </p>

      <Link
        href="/opportunities"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#21682F] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_0_0_rgba(13,53,18,0.55)] transition hover:bg-[#1b5726]"
      >
        View other opportunity
      </Link>
    </div>
  );
}
