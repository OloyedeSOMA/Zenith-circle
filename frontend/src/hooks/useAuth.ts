"use client";

import { useMutation } from "@tanstack/react-query";
import { register, activateAccount, resendActivation, login, forgotPassword,resetPassword } from "@/lib/auth-api";

export const useRegister=()=>{
    return useMutation({
        mutationFn: register,
    });
}

export const useActivateAccount=()=>{
    return useMutation({
        mutationFn: activateAccount,
    });
}

export const useResendActivation=()=>{
    return useMutation({
        mutationFn: resendActivation,
    });
}
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
