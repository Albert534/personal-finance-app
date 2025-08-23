import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});
export const baseUrl = 'http://localhost:3000/api/v1';

export const authEndPoints = {
	login: `/auth/login`,
	signup: '/auth/signup',
};

export const forgetPasswordEndPoints = {
	forgetPassword: '/forgetPassword',
	changePassword: '/changePassword',
	verify: '/verifyCode',
};

export const meEndPoints = {
	me: '/me/meData',
	user_detail: '/salary/userDetail',
};

export const jobEndPoints = {
	addJob: '/job/create',
	getJob: '/job/allJobs',
	editJob: '/job/editJob',
	deleteJob: '/job/deleteJob',
	singleJob: '/job/singleJob',
};

export const salaryEndPoints = {
	getSalary: '/salary/getSalary',
	addSalary: '/salary/addSalary',
	editBalance: '/salary/changeBalance',
};
