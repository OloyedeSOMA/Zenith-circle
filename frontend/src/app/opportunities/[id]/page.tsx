import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchOpportunityById } from "@/data/opportunities";

interface OpportunityDetailsPageProps {
  params: { id: string };
}

const TAG_STYLES: Record<string, string> = {
  New: "bg-blue-100 text-blue-600",
  Featured: "bg-orange-100 text-orange-600",
  "Closing soon": "bg-red-100 text-red-600",
};

export default async function OpportunityDetailsPage({
  params,
}: OpportunityDetailsPageProps) {
  const opportunity = await fetchOpportunityById(Number(params.id));

  if (!opportunity) {
    notFound();
  }

  const {
    tag,
    title,
    company,
    location,
    workMode,
    type,
    commitment,
    deadline,
    description,
  } = opportunity;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/opportunities"
        className="mb-6 inline-block text-sm font-medium text-gray-600 hover:underline"
      >
        ← Back to opportunities
      </Link>

      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${TAG_STYLES[tag]}`}>
        {tag}
      </span>

      <h1 className="mt-3 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-gray-500">
        {company} · {location} · {workMode}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
          {type}
        </span>
        <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-600">
          {commitment}
        </span>
      </div>

      <div className="my-6 border-t border-gray-200" />

      <p className="text-sm text-gray-700">
        {description ?? "No further details available for this opportunity yet."}
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Deadline: <span className="text-gray-700">{deadline}</span>
      </p>
    </main>
  );
}