import { axiosInstance } from "../api"
import { baseUrl , jobEndPoints ,} from "../api";
export const getAllJobFunction = async () => { 
    try {
        const response = await axiosInstance.get(`${baseUrl}${jobEndPoints.getJob}`);
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error : any){
        console.log(error);
        throw error;
    }
}

export const getSingleJobFunction = async (id:number) => { 
    try { 
        const response = await axiosInstance.get(`${baseUrl}${jobEndPoints.singleJob}/${id}`);
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}