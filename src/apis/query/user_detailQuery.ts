import { useQuery } from '@tanstack/react-query';
import { getUserDetailFunction } from '../function/userDetailFunction';

export const useUserDetailQuery = () => {
	return useQuery({
		queryKey: ['userDetail'],
		queryFn: () => getUserDetailFunction(),
		retry: 2,
	});
};
