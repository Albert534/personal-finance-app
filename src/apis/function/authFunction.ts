
import axios from "axios";
import type { Login, SignUp } from "../../types/authTypes";
import { authEndPoints } from "../api";
import { baseUrl } from "../api";

export const signUp = async (data : SignUp) => {
    try { 
        const response = await axios.post(`${baseUrl}${authEndPoints.signup}`, data);
        return response.data;

    } catch (error) {
       console.log(error);
       throw error;
    }



}

export const login = async (data : Login) => {
    try { 
        const response = await axios.post(`${baseUrl}${authEndPoints.login}`, data);
        return response.data;
    } 
    catch (error) { 
        console.log(error);
        throw error;

    }

}