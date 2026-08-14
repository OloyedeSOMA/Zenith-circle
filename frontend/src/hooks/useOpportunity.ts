"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createOpportunity,
  deleteOpportunity,
  fetchMyOpportunityById,
  fetchMyOpportunities,
  updateOpportunity,fetchOpportunityFields,
  type CreateOpportunityPayload,
} from "@/lib/opportunity-api";

export const useMyOpportunities = () => {
  return useQuery({
    queryKey: ["my-opportunities"],
    queryFn: () =>
      fetchMyOpportunities({
        page_size: 100,
      }),
  });
};

export const useMyOpportunity = (
  opportunityId?: string
) => {
  return useQuery({
    queryKey: ["my-opportunity", opportunityId],
    queryFn: () =>
      fetchMyOpportunityById(opportunityId as string),
    enabled: !!opportunityId,
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateOpportunityPayload
    ) => createOpportunity(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-opportunities"],
      });
    },
  });
};

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      opportunityId,
      data,
    }: {
      opportunityId: string;
      data: CreateOpportunityPayload;
    }) =>
      updateOpportunity(opportunityId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-opportunities"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "my-opportunity",
          variables.opportunityId,
        ],
      });
    },
  });
};

export const useDeleteOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityId: string) =>
      deleteOpportunity(opportunityId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-opportunities"],
      });
    },
  });
};
export const useOpportunityFields = () => {
  return useQuery({
    queryKey: ["opportunity-fields"],
    queryFn: fetchOpportunityFields,
  });
};