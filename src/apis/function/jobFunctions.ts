import { data } from "../../utils/dummyIncome";
import { axiosInstance, jobEndPoints } from "../api"
import { baseUrl } from "../api";
import type { JobData } from "../mutation/jobMutation";
export const addJobFunction = async (data : JobData) => { 
    try { 
        const response = await axiosInstance.post(`${baseUrl}${jobEndPoints.addJob}` , data);
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const editJobFunction = async (data : JobData) => {
    try { 
        const response = await axiosInstance.put(`${baseUrl}${jobEndPoints.editJob}/${data.id}` , data , {withCredentials: true,});
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


export const deleteJobFunction = async (id : number) => {
    try { 
        const response = await axiosInstance.delete(`${baseUrl}${jobEndPoints.deleteJob}/${id}` , {withCredentials: true,});
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
    
}