import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import OpportunitiesSection from "@/components/OpportunitiesSection";

export default function InternshipsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      <main className="mx-auto flex w-full max-w-[100%] flex-col justify-center gap-10">
        <section className="mx-auto mt-6 w-[90%] max-w-[1276px]">
          <h1 className="text-3xl font-semibold text-secondary">Internships</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse internship opportunities from the latest listings.
          </p>
          <OpportunitiesSection filters={{ opportunity_type: "internship" }} />
        </section>

        
        <Footer />
      </main>
    </div>
  );
}
