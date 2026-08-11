import { apiFetch } from "@/lib/api-client";
import { SavedOpportunity } from "@/types/savedOpportunity";


export const getSavedOpportunities = async (): Promise<SavedOpportunity[]> => {
  return apiFetch("/me/opportunities/saved-opportunities/", {
    method: "GET",
  });
};

export const saveOpportunity = async (
  opportunityId: string
): Promise<SavedOpportunity> => {
  return apiFetch(`/me/opportunities/${opportunityId}/save/`, {
    method: "POST",
  });
};

export const removeSavedOpportunity = async (
  opportunityId: string
): Promise<void> => {
  return apiFetch(`/me/opportunities/${opportunityId}/save/`, {
    method: "DELETE",
  });
};