

import { useMutation } from "@tanstack/react-query";
import { forgotPasswordFunction } from "../function/forgetPasswordFunction";
import { changePassword } from "../function/forgetPasswordFunction";
import toast from "react-hot-toast";
import { verifyCode } from '../function/forgetPasswordFunction';
export const useForgotPassword = () => {

    return useMutation ({
        mutationFn : (email : string | null) => forgotPasswordFunction(email),
        onSuccess: () => {
            toast.success('Verification code sent successfully');
            
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error : any) => { 
            toast.error(error?.response?.data?.message);

        }

    })
}

export const resendCode = () => { 

}

export const useVerifyCode = () => { 
    return useMutation ({
        mutationFn:(code: string) => verifyCode(code),
        onSuccess: () => {
            toast.success('Verification code sent successfully');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => { 
            toast.error(error?.response?.data?.message);
        }
    })
}

export const useChangePasswordMutation = () => { 
    return useMutation ({
        mutationFn: ({ password, verified_email }: { password: string, verified_email: string | null }) => changePassword(password, verified_email),
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => { 
            toast.error(error?.response?.data?.message);
        }
    })
}