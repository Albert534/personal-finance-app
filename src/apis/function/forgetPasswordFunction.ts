import axios from "axios"
import { baseUrl , forgetPasswordEndPoints } from "../api";
export const forgotPasswordFunction = async (email : string | null) => { 
    try {
        const response = await axios.post(`${baseUrl}${forgetPasswordEndPoints.forgetPassword}`, {email});
        return response.data
        
    }
    catch (error) { 
        console.log(error);
        throw error;
    }
}

export const verifyCode = async (code : string) => { 
    try { 
        const response = await axios.post(`${baseUrl}${forgetPasswordEndPoints.verify}`, {code});
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


export const changePassword = async (password: string , verified_email: string | null) => { 
    try { 
        const response = await axios.post(`${baseUrl}${forgetPasswordEndPoints.changePassword}`, {password , email: verified_email});
        return response.data;
    }

    catch(error){
        console.log(error);
        throw error;
    }
    

}