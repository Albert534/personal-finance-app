import { axiosInstance, baseUrl, meEndPoints } from '../api';
export const getMefunction = async () => {
	try {
		const response = await axiosInstance.get(`${baseUrl}${meEndPoints.me}`);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
