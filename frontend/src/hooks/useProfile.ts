import { useMutation, useQuery } from "@tanstack/react-query";
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

// recruiter
export const useCreateRecruiterProfile = () =>
  useMutation({ mutationFn: createRecruiterProfile });

export const useRecruiterProfile = () =>
  useQuery({ queryKey: ["recruiter-profile"], queryFn: getRecruiterProfile });

export const useUpdateRecruiterProfile = () =>
  useMutation({ mutationFn: updateRecruiterProfile });

export const useDeleteRecruiterProfile = () =>
  useMutation({ mutationFn: deleteRecruiterProfile });

// student
export const useCreateStudentProfile = () =>
  useMutation({ mutationFn: createStudentProfile });

export const useStudentProfile = () =>
  useQuery({ queryKey: ["student-profile"], queryFn: getStudentProfile });

export const useUpdateStudentProfile = () =>
  useMutation({ mutationFn: updateStudentProfile });

export const useDeleteStudentProfile = () =>
  useMutation({ mutationFn: deleteStudentProfile });