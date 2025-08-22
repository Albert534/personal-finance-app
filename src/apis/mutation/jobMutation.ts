import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJobFunction , deleteJobFunction } from "../function/jobFunctions";
import toast from "react-hot-toast";
import { editJobFunction } from "../function/jobFunctions";
export interface JobData {
    id: number;
  title: string;
  salary: string;
  experiences: string;
  isMonthly: boolean;
  status: string;
}
export const useAddJob = () => { 
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data : JobData) => addJobFunction(data),
        onSuccess: () => {
            toast.success('Job Added Successfully!');
           queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error : any) => { 
            toast.error(error?.response?.data?.message);
        }
    })
}

export const useEditJob  = () => { 
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data : JobData) => editJobFunction(data),
        onSuccess: () => {
            toast.success('Job Updated Successfully!');
           queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error : any) => { 
            toast.error(error?.response?.data?.message);
        }
    })
}

export const useDeleteJob = () => { 
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id : number) => deleteJobFunction(id),
        onSuccess: () => {
            toast.success('Job Deleted Successfully!');
           queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError:(error : any) => { 
            toast.error(error?.response?.data?.message);
        }
    })
}