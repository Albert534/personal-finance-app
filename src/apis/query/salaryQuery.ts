import { useQuery } from '@tanstack/react-query';
import { getSalaryFunction } from '../function/getSalaryFunction';
export const useGetSalary = () => {
	return useQuery({
		queryKey: ['salary'],
		queryFn: () => getSalaryFunction(),
		retry: 5,
	});
};
