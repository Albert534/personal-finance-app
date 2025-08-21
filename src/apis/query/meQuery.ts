import { useQuery } from '@tanstack/react-query';
import { getMefunction } from '../function/meFunction';
export const useMeQuery = (isAuthenticated: boolean) => {
	return useQuery({
		queryKey: ['me'],
		queryFn: () => getMefunction(),
		retry: 2,
		enabled: isAuthenticated,
	});
};
