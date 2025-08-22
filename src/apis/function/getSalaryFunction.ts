import { baseUrl, salaryEndPoints } from '../api';
import { axiosInstance } from '../api';
export const getSalaryFunction = async () => {
	try {
		const response = await axiosInstance.get(
			`${baseUrl}${salaryEndPoints.getSalary}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
