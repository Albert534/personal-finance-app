import { useMutation } from '@tanstack/react-query';
import { addSalaryFunction } from '../function/salaryFunction';
import toast from 'react-hot-toast';
export const useCreateSalary = () => {
	return useMutation({
		mutationFn: (id: number) => addSalaryFunction(id),
		onSuccess: () => {
			toast.success('Salary Added Successfully!');
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.error(error?.response?.data?.message);
		},
	});
};
