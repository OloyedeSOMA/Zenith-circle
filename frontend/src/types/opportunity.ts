export type OpportunityTag = "New" | "Featured" | "Closing soon";

export interface Opportunity {
  id: number;
  tag: OpportunityTag;
  logo: string; 
  title: string;
  company: string;
  location: string;
  workMode: string; // "on-site" | "Hybrid" | "Remote"
  type: string; // "Internship" | "Scholarship" | "Graduate program"
  commitment: string; // "Full time" | "Part time"
  deadline: string;
  description?: string;
}

export interface PaginatedOpportunities {
  data: Opportunity[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}