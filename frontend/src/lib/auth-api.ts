import { apiFetch } from "./api-client";
import { RegisterRequest, RegisterResponse,
    ActivateAccountRequest,ActivateAccountResponse,
    ResendActivationRequest, ResendActivationResponse,
    LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse,
    ResetPasswordRequest, ResetPasswordResponse} from "@/types/auth";


export const register = (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  return apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const activateAccount =(payload: ActivateAccountRequest): Promise<ActivateAccountResponse> =>{
    console.log("Payload received:", payload);
    return apiFetch(`/auth/activate-account/?id=${payload.id}&token=${payload.token}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    });
}

export const resendActivation =(payload: ResendActivationRequest): Promise<ResendActivationResponse> =>{
    console.log("Payload received:", payload);
    return apiFetch("/auth/resend-activation/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    });
}

export const login =(payload: LoginRequest): Promise<LoginResponse> =>{
    return apiFetch("/auth/login/",
        {
            method: "POST",
            body: JSON.stringify(payload),
        }
    )
}

export const forgotPassword = (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  return apiFetch("/auth/forgot-password/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const resetPassword = (payload:ResetPasswordRequest):Promise<ResetPasswordResponse>=>{
    return apiFetch(
        `/auth/reset-password/?id=${payload.id}&token=${payload.token}`,
        {
            method:"POST",
            body:JSON.stringify({
                id: payload.id,
                token: payload.token,
                password:payload.password,
            }),
        }
    );
}