export type OpportunityTag = "New" | "Featured" | "Closing soon";

export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills_required: string[];
  benefits: string[]
  opportunity_type: string;
  organisation: string;
  organisation_logo: string;
  application_url: string;
  location: string;
  field: string;
  deadline: string;
  is_remote: boolean;
  is_saved: boolean;
  created_at: string;
  tag?: OpportunityTag;
  logo?: string;
  company?: string;
  workMode?: string;
  type?: string;
  commitment?: string;
}

export interface OpportunityQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  opportunity_type?: string;
  field?: string;
  organisation?: string;
  location?: string;
  is_remote?: boolean;
}

export interface PaginatedOpportunityResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Opportunity[];
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