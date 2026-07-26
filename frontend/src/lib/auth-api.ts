import { apiFetch } from "./api-client";
import {
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const register = (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  return apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};