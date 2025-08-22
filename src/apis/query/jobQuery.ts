import { useQuery } from "@tanstack/react-query";
import { getAllJobFunction , getSingleJobFunction } from "../function/jobFunction";
export const useGetAllJob = () => { 
    return useQuery({
        queryKey: ['jobs'],
        queryFn: () => getAllJobFunction(),
        retry: 2
    })
}

export const useGetSingleJob = (id:number) => { 
    return useQuery ({
        queryKey: ['job'],
        queryFn: () => getSingleJobFunction(id),
        retry: 2,
        enabled: !!id

    })
}