import { apiFetch } from "./api-client";
import {
  RecruiterProfileRequest,
  RecruiterProfileResponse,
  StudentProfileRequest,
  StudentProfileResponse,
} from "@/types/profile";

const STUDENT_PROFILE_ENDPOINT = "/me/profile/student/";
const RECRUITER_PROFILE_ENDPOINT = "/me/profile/recruiter/";

//helper

function buildFormData<T>(data: Partial<T>): FormData {
  const formData = new FormData();

  Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item as string));
      return;
    }

    formData.append(key, value as string | Blob);
  });

  return formData;
}

export async function createRecruiterProfile(
  data: RecruiterProfileRequest
): Promise<RecruiterProfileResponse> {
  return apiFetch<RecruiterProfileResponse>(RECRUITER_PROFILE_ENDPOINT, {
    method: "POST",
    body: buildFormData(data),
  });
}

export async function getRecruiterProfile(): Promise<RecruiterProfileResponse> {
  return apiFetch<RecruiterProfileResponse>(RECRUITER_PROFILE_ENDPOINT, {
    method: "GET",
  });
}

export async function updateRecruiterProfile(
  data: Partial<RecruiterProfileRequest>
): Promise<RecruiterProfileResponse> {
  return apiFetch<RecruiterProfileResponse>(RECRUITER_PROFILE_ENDPOINT, {
    method: "PATCH",
    body: buildFormData(data),
  });
}

export async function deleteRecruiterProfile(): Promise<RecruiterProfileResponse> {
  return apiFetch<RecruiterProfileResponse>(RECRUITER_PROFILE_ENDPOINT, {
    method: "DELETE",
  });
}


export async function createStudentProfile(
  data: StudentProfileRequest
): Promise<StudentProfileResponse> {
  return apiFetch<StudentProfileResponse>(STUDENT_PROFILE_ENDPOINT, {
    method: "POST",
    body: buildFormData(data),
  });
}

export async function getStudentProfile(): Promise<StudentProfileResponse> {
  return apiFetch<StudentProfileResponse>(STUDENT_PROFILE_ENDPOINT, {
    method: "GET",
  });
}

export async function updateStudentProfile(
  data: Partial<StudentProfileRequest>
): Promise<StudentProfileResponse> {
  return apiFetch<StudentProfileResponse>(STUDENT_PROFILE_ENDPOINT, {
    method: "PATCH",
    body: buildFormData(data),
  });
}

export async function deleteStudentProfile(): Promise<StudentProfileResponse> {
  return apiFetch<StudentProfileResponse>(STUDENT_PROFILE_ENDPOINT, {
    method: "DELETE",
  });
}