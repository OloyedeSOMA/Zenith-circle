import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSavedOpportunities,
  saveOpportunity,
  removeSavedOpportunity,
} from "@/lib/saved-opportunity-api";

export const SAVED_OPPORTUNITIES_QUERY_KEY = [
  "saved-opportunities",
];

export function useGetSavedOpportunities() {
  return useQuery({
    queryKey: SAVED_OPPORTUNITIES_QUERY_KEY,
    queryFn: getSavedOpportunities,
  });
}

export function useSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) =>
      saveOpportunity(opportunityId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SAVED_OPPORTUNITIES_QUERY_KEY,
      });
    },
  });
}

export function useRemoveSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) =>
      removeSavedOpportunity(opportunityId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SAVED_OPPORTUNITIES_QUERY_KEY,
      });
    },
  });
}
