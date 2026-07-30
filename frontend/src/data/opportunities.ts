import { Opportunity, PaginatedOpportunities } from "@/types/opportunity";

const LOGOS = {
  microsoft: "/jobimage1.png",
  pwc: "/jobimage4.png",
  daad: "/jobimage2.png",
  getequity: "/jobimage4.png",
};

export const opportunities: Opportunity[] = [
  {
    id: 1,
    tag: "New",
    logo: LOGOS.microsoft,
    title: "Software Engineering Intern",
    company: "Microsoft",
    location: "Lagos, Nigeria",
    workMode: "on-site",
    type: "Internship",
    commitment: "Full time",
    deadline: "31 July, 2026",
    postedAt: "Posted 3 days ago",
    description:
      "Join Microsoft's engineering team in Lagos to build and ship real product features alongside senior engineers.",
  },
  {
    id: 2,
    tag: "Featured",
    logo: LOGOS.pwc,
    title: "Graduate associate program",
    company: "PricewaterhouseCoopers (PWC)",
    location: "Abuja, Nigeria",
    workMode: "Hybrid",
    type: "Graduate program",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
    postedAt: "Posted 5 days ago",
    description:
      "A structured graduate track across PwC's advisory practice, with rotations and mentorship built in.",
  },
  {
    id: 3,
    tag: "New",
    logo: LOGOS.daad,
    title: "DAAD Scholarship 2026",
    company: "DAAD",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
    postedAt: "Posted 1 week ago",
    description:
      "Fully funded scholarship for postgraduate study in Germany, covering tuition and living costs.",
  },
  {
    id: 4,
    tag: "Closing soon",
    logo: LOGOS.getequity,
    title: "Product Designer (Junior)",
    company: "GetEquity",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
    postedAt: "Posted a week ago",
    description:
      "Work on product design for GetEquity's investment platform, from research through to shipped UI.",
  },
  {
    id: 5,
    tag: "New",
    logo: LOGOS.microsoft,
    title: "Software Engineering Intern",
    company: "Microsoft",
    location: "Lagos, Nigeria",
    workMode: "on-site",
    type: "Internship",
    commitment: "Full time",
    deadline: "31 July, 2026",
  },
  {
    id: 6,
    tag: "New",
    logo: LOGOS.daad,
    title: "DAAD Scholarship 2026",
    company: "DAAD",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 7,
    tag: "Featured",
    logo: LOGOS.pwc,
    title: "Graduate associate program",
    company: "PricewaterhouseCoopers (PWC)",
    location: "Abuja, Nigeria",
    workMode: "Hybrid",
    type: "Graduate program",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 8,
    tag: "New",
    logo: LOGOS.daad,
    title: "DAAD Scholarship 2026",
    company: "DAAD",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 9,
    tag: "New",
    logo: LOGOS.microsoft,
    title: "Backend Engineering Intern",
    company: "Microsoft",
    location: "Lagos, Nigeria",
    workMode: "on-site",
    type: "Internship",
    commitment: "Full time",
    deadline: "31 July, 2026",
  },
  {
    id: 10,
    tag: "Featured",
    logo: LOGOS.pwc,
    title: "Audit associate program",
    company: "PricewaterhouseCoopers (PWC)",
    location: "Abuja, Nigeria",
    workMode: "Hybrid",
    type: "Graduate program",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 11,
    tag: "New",
    logo: LOGOS.daad,
    title: "DAAD Scholarship 2026",
    company: "DAAD",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 12,
    tag: "Closing soon",
    logo: LOGOS.getequity,
    title: "Product Designer (Mid)",
    company: "GetEquity",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 13,
    tag: "New",
    logo: LOGOS.microsoft,
    title: "Data Analyst Intern",
    company: "Microsoft",
    location: "Lagos, Nigeria",
    workMode: "on-site",
    type: "Internship",
    commitment: "Full time",
    deadline: "31 July, 2026",
  },
  {
    id: 14,
    tag: "Featured",
    logo: LOGOS.pwc,
    title: "Tax associate program",
    company: "PricewaterhouseCoopers (PWC)",
    location: "Abuja, Nigeria",
    workMode: "Hybrid",
    type: "Graduate program",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 15,
    tag: "New",
    logo: LOGOS.daad,
    title: "DAAD Scholarship 2026",
    company: "DAAD",
    location: "Germany",
    workMode: "Hybrid",
    type: "Scholarship",
    commitment: "Full time",
    deadline: "21 Aug, 2026",
  },
  {
    id: 16,
    tag: "New",
    logo: LOGOS.microsoft,
    title: "Cloud Engineering Intern",
    company: "Microsoft",
    location: "Lagos, Nigeria",
    workMode: "on-site",
    type: "Internship",
    commitment: "Full time",
    deadline: "31 July, 2026",
  },
];

/*GET /api/opportunities?page=&perPage=*/
export function fetchOpportunities({
  page = 1,
  perPage = 8,
}: {
  page?: number;
  perPage?: number;
} = {}): Promise<PaginatedOpportunities> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * perPage;
      const data = opportunities.slice(start, start + perPage);
      const totalPages = Math.ceil(opportunities.length / perPage);

      resolve({
        data,
        meta: {
          page,
          perPage,
          total: opportunities.length,
          totalPages,
        },
      });
    }, 400);
  });
}

/*Mimics GET /api/opportunities/:id*/
export function fetchOpportunityById(
  id: number
): Promise<Opportunity | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(opportunities.find((o) => o.id === id));
    }, 300);
  });
}