export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string;
  responsibilities: string;
  requirements: string;
  skills_required: string;
  benefits: string;
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
}

export interface SavedOpportunity {
  id: string;
  opportunity: Opportunity;
  created_at: string;
}
