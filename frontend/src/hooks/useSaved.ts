import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getSavedOpportunities,
  removeSavedOpportunity,
  saveOpportunity,
} from "@/lib/saved-opportunity-api";

const SAVED_OPPORTUNITIES_QUERY_KEY = ["saved-opportunities"];

export const useGetSaved = () => {
  return useQuery({
    queryKey: SAVED_OPPORTUNITIES_QUERY_KEY,
    queryFn: getSavedOpportunities,
  });
};

export const useSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveOpportunity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-opportunities"],
      });

      queryClient.invalidateQueries({
        queryKey: ["opportunities"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recommended-opportunities"],
      });
    },
  });
};

export const useRemoveSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSavedOpportunity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-opportunities"],
      });

      queryClient.invalidateQueries({
        queryKey: ["opportunities"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recommended-opportunities"],
      });
    },
  });
};