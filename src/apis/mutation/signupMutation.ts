import { useMutation } from "@tanstack/react-query";
import { signUp } from "../function/authFunction";
import type { SignUp } from "../../types/authTypes";
import toast from "react-hot-toast";

export const useSignUp = () => { 
    return useMutation({
        mutationFn: (data: SignUp) => signUp(data),
        onSuccess: () => {
            toast.success('Account created successfully');
            
        },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
  const message = error?.response?.data?.message || 'Account Creation Failed!';
  toast.error(message);
},



    })
}