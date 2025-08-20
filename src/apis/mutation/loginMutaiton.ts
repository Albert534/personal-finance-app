import { useMutation } from "@tanstack/react-query"
import type { Login } from "../../types/authTypes"
import { login } from "../function/authFunction"
import toast from "react-hot-toast";
export const useLogin = () => { 
    return useMutation({
        mutationFn: (data: Login) => login(data),
        onSuccess: () => {
            toast.success('Login Success!');
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error : any) => {
            const message = error?.response?.data?.message || 'Account Creation Failed!';
            toast.error(message);
        }
    })

}