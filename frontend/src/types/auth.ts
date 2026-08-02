export interface RegisterRequest{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: string;
}
export interface RegisterResponse{
    [key: string] : unknown;
}
export interface ActivateAccountRequest{
    id: string;
    token: string;
}
export interface ActivateAccountResponse{
    [key: string] : unknown;
}
export interface ResendActivationRequest{
    email: string;
}
export interface ResendActivationResponse{
    [key: string] : unknown;
}
export interface LoginRequest{
    email: string;
    password: string;
}
export interface LoginResponse{
    tokens: {
    access_token: string;
    refresh_token: string;
  };

  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    is_verified: boolean;
    created_at: string;
    last_login: string;
  };
}
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  [key: string]: unknown;
}
export interface ResetPasswordRequest{
    id:string;
    token:string;
    password:string;
}

export interface ResetPasswordResponse{
    [key:string]:unknown;
}

export interface LogOutRequest{
    refresh_token: string;
}
export interface LogOutResponse{
    [key:string]: unknown;
}