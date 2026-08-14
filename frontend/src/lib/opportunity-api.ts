import { apiFetch } from "./api-client";
import {
  Opportunity,
  OpportunityQueryParams,
  PaginatedOpportunityResponse,OpportunityField
} from "@/types/opportunity";

const buildQueryString = (params: OpportunityQueryParams) => {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.page_size) {
    searchParams.set("page_size", String(params.page_size));
  }

  if (params.search) searchParams.set("search", params.search);

  if (params.opportunity_type) {
    searchParams.set(
      "opportunity_type",
      params.opportunity_type
    );
  }

  if (params.field) {
    searchParams.set("field", params.field);
  }

  if (params.organisation) {
    searchParams.set(
      "organisation",
      params.organisation
    );
  }

  if (params.location) {
    searchParams.set("location", params.location);
  }

  if (typeof params.is_remote === "boolean") {
    searchParams.set(
      "is_remote",
      String(params.is_remote)
    );
  }

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
};

/* GET ALL OPPORTUNITIES*/

export const fetchOpportunities = (
  params: OpportunityQueryParams = {}
): Promise<PaginatedOpportunityResponse> => {
  return apiFetch<PaginatedOpportunityResponse>(
    `/opportunities/${buildQueryString(params)}`
  );
};

/* GET MY OPPORTUNITIES*/

export const fetchMyOpportunities = (
  params?: OpportunityQueryParams
): Promise<Opportunity[]> => {
  return apiFetch<Opportunity[]>(
    `/me/opportunities/${buildQueryString(params || {})}`
  );
};

/* GET SINGLE MY OPPORTUNITY*/

export const fetchMyOpportunityById = (
  opportunityId: string
): Promise<Opportunity> => {
  return apiFetch<Opportunity>(
    `/me/opportunities/${opportunityId}/`
  );
};

/* CREATE */

export interface CreateOpportunityPayload {
  title: string;
  description: string;
  responsibilities: string;
  requirements: string[];
  skills_required: string[];
  benefits: string[];
  opportunity_type: string;
  organisation: string;
  application_url: string;
  location: string;
  field: string;
  deadline: string;
  is_remote: boolean;
}

export const createOpportunity = (
  data: CreateOpportunityPayload
): Promise<Opportunity> => {
  return apiFetch<Opportunity>(
    `/me/opportunities/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

/* =========================
   UPDATE
========================= */

export const updateOpportunity = (
  opportunityId: string,
  data: CreateOpportunityPayload
): Promise<Opportunity> => {
  return apiFetch<Opportunity>(
    `/me/opportunities/${opportunityId}/`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
};

/* =========================
   DELETE
========================= */

export const deleteOpportunity = (
  opportunityId: string
): Promise<void> => {
  return apiFetch<void>(
    `/me/opportunities/${opportunityId}/`,
    {
      method: "DELETE",
    }
  );
};

/* =========================
   PUBLIC SINGLE OPPORTUNITY
========================= */

export const fetchOpportunityBySlug = (
  slug: string
): Promise<Opportunity> => {
  return apiFetch<Opportunity>(
    `/opportunities/${slug}/`
  );
};
export const fetchOpportunityFields = (): Promise<OpportunityField[]> => {
  return apiFetch<OpportunityField[]>(
    "/opportunities/fields/"
  );
};