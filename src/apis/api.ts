import axios from 'axios';

export const axiosInstance =  axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
export const baseUrl = 'http://localhost:3000/api/v1';


export const authEndPoints = {
    login: `/auth/login`,
    signup: '/auth/signup',
}

export const forgetPasswordEndPoints = { 
    forgetPassword: '/forgetPassword',
    changePassword: "/changePassword",
    verify: "/verifyCode"

    

}