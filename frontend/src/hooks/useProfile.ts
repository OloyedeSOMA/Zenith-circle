import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createRecruiterProfile,
  getRecruiterProfile,
  updateRecruiterProfile,
  deleteRecruiterProfile,
  createStudentProfile,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
} from "@/lib/profile-api";

// RECRUITER

export const useCreateRecruiterProfile = () =>
  useMutation({
    mutationFn: createRecruiterProfile,
  });

export const useRecruiterProfile = (enabled = true) =>
  useQuery({
    queryKey: ["recruiter-profile"],
    queryFn: getRecruiterProfile,
    enabled,
  });

export const useUpdateRecruiterProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecruiterProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-profile"],
      });
    },
  });
};

export const useDeleteRecruiterProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecruiterProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-profile"],
      });
    },
  });
};

// STUDENT

export const useCreateStudentProfile = () =>
  useMutation({
    mutationFn: createStudentProfile,
  });

export const useStudentProfile = (enabled = true) =>
  useQuery({
    queryKey: ["student-profile"],
    queryFn: getStudentProfile,
    enabled,
  });

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-profile"],
      });
    },
  });
};

export const useDeleteStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudentProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-profile"],
      });
    },
  });
};