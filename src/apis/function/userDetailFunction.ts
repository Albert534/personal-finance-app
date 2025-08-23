import { axiosInstance, salaryEndPoints } from '../api';

import { baseUrl, meEndPoints } from '../api';

export const getUserDetailFunction = async () => {
	try {
		const response = await axiosInstance.get(
			`${baseUrl}${meEndPoints.user_detail}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const editBalanceFunction = async (amount: number) => {
	try {
		const response = await axiosInstance.post(
			`${baseUrl}${salaryEndPoints.editBalance}`,
			{ amount }
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
