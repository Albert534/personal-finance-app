import { axiosInstance } from '../api';

import { baseUrl, salaryEndPoints } from '../api';

export const addSalaryFunction = async (id: number) => {
	try {
		const response = await axiosInstance.post(
			`${baseUrl}${salaryEndPoints.addSalary}/${id}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
