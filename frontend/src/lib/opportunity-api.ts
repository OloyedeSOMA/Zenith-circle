import { apiFetch } from "./api-client";
import {
  Opportunity,
  OpportunityQueryParams,
  PaginatedOpportunityResponse,
} from "@/types/opportunity";

const buildQueryString = (params: OpportunityQueryParams) => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.page_size) searchParams.set("page_size", String(params.page_size));
  if (params.search) searchParams.set("search", params.search);
  if (params.opportunity_type)
    searchParams.set("opportunity_type", params.opportunity_type);
  if (params.field) searchParams.set("field", params.field);
  if (params.organisation)
    searchParams.set("organisation", params.organisation);
  if (params.location) searchParams.set("location", params.location);
  if (typeof params.is_remote === "boolean") {
    searchParams.set("is_remote", String(params.is_remote));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const fetchOpportunities = (
  params: OpportunityQueryParams = {}
): Promise<PaginatedOpportunityResponse> => {
  return apiFetch<PaginatedOpportunityResponse>(
    `/opportunities/${buildQueryString(params)}`
  );
};

export const fetchOpportunityBySlug = (
  slug: string
): Promise<Opportunity> => {
  return apiFetch<Opportunity>(`/opportunities/${slug}/`);
};
