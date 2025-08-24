import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSalaryFunction } from '../function/salaryFunction';
import toast from 'react-hot-toast';
export const useCreateSalary = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => addSalaryFunction(id),
		onSuccess: () => {
			toast.success('Salary Added Successfully!');
			queryClient.invalidateQueries({ queryKey: ['userDetail'] });
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.error(error?.response?.data?.message);
		},
	});
};
