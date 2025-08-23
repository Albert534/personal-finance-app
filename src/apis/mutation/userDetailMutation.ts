import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editBalanceFunction } from '../function/userDetailFunction';
export const useUserDetailMutation = () => {
	return useMutation({
		mutationFn: (amount: number) => editBalanceFunction(amount),
		onSuccess: () => {
			toast.success('Balance Updated Successfully!');
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.error(error?.response?.data?.message);
		},
	});
};
