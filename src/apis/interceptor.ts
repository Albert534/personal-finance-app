import { axiosInstance } from './api';
import { baseUrl } from './api';
import axios from 'axios';

console.log('🔧 INTERCEPTOR: Setting up interceptors...');

// Make sure axiosInstance sends cookies with requests

console.log('🔧 INTERCEPTOR: withCredentials set to true');

function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		const lastPart = parts.pop();
		if (lastPart) return lastPart.split(';').shift();
		return null;
	}
	return null;
}

function deleteCookie(name: string) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
	console.log('🍪 COOKIE DELETED:', name);
}

function setCookie(name: string, value: string, days = 7) {
	const isProduction = window.location.protocol === 'https:';
	const cookieOptions =
		isProduction ? '; Path=/; SameSite=None; Secure' : '; Path=/; SameSite=Lax';

	// Set expiration date
	const expires = new Date();
	expires.setDate(expires.getDate() + days);

	document.cookie = `${name}=${value}; Expires=${expires.toUTCString()}${cookieOptions}`;
	console.log('🍪 COOKIE SET:', name, 'Expires:', expires.toUTCString());
}

// Debug function to log all cookies
function debugCookies() {
	console.log('🍪 ALL COOKIES:', document.cookie);
	console.log('🍪 ACCESS TOKEN:', getCookie('accessToken'));
	console.log('🍪 REFRESH TOKEN:', getCookie('refreshToken'));
}

axiosInstance.interceptors.request.use(
	(request) => {
		console.log('🚀 REQUEST INTERCEPTOR TRIGGERED');
		console.log('🚀 Request URL:', request.url);
		console.log('🚀 Request method:', request.method?.toUpperCase());
		console.log('🚀 Base URL:', request.baseURL);
		console.log('🚀 Full URL:', `${request.baseURL || ''}${request.url}`);

		debugCookies();

		const accessToken = getCookie('accessToken');
		console.log('🔑 Access token found:', !!accessToken);
		console.log(
			'🔑 Access token value:',
			accessToken ? `${accessToken.substring(0, 20)}...` : 'null'
		);

		if (accessToken) {
			request.headers.Authorization = `Bearer ${accessToken}`;
			console.log('🔑 Authorization header set');
		} else {
			console.log('❌ No access token - Authorization header NOT set');
		}

		console.log('🚀 Request headers:', request.headers);
		console.log('🚀 Request withCredentials:', request.withCredentials);

		return request;
	},
	(error) => {
		console.log('❌ REQUEST INTERCEPTOR ERROR:', error);
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		console.log('✅ RESPONSE INTERCEPTOR - SUCCESS');
		console.log('✅ Response status:', response.status);
		console.log('✅ Response URL:', response.config.url);
		console.log('✅ Response data:', response.data);
		return response;
	},
	async (error) => {
		console.log('❌ RESPONSE INTERCEPTOR - ERROR');
		console.log('❌ Error status:', error.response?.status);
		console.log('❌ Error URL:', error.config?.url);
		console.log('❌ Error message:', error.message);
		console.log('❌ Full error response:', error.response);

		const originalRequest = error.config;

		if (!originalRequest) {
			console.log('❌ No original request config found');
			return Promise.reject(error);
		}

		console.log('🔍 Original request _retry flag:', originalRequest._retry);

		// Check if error response exists and has status
		if (error.response?.status === 401 && !originalRequest._retry) {
			console.log('🔄 ATTEMPTING TOKEN REFRESH...');
			originalRequest._retry = true;

			try {
				debugCookies();

				const refreshToken = getCookie('refreshToken');
				console.log('🔄 Refresh token found:', !!refreshToken);
				console.log(
					'🔄 Refresh token value:',
					refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null'
				);

				if (!refreshToken) {
					console.log('❌ No refresh token available - throwing error');
					throw new Error('No refresh token available');
				}

				console.log('🔄 Making refresh request to:', `${baseUrl}/auth/refresh`);

				// Make refresh request with credentials
				const response = await axios.post(
					`${baseUrl}/auth/refresh`,
					{},
					{
						headers: {
							Authorization: `Bearer ${refreshToken}`,
						},
						withCredentials: true,
					}
				);

				console.log('✅ REFRESH SUCCESS:', response.status);
				console.log('✅ Refresh response data:', response.data);

				const { accessToken, refreshToken: newRefreshToken } = response.data;

				if (!accessToken || !newRefreshToken) {
					console.log('❌ Missing tokens in refresh response');
					throw new Error('Invalid refresh response - missing tokens');
				}

				console.log(
					'🔄 New access token:',
					accessToken ? `${accessToken.substring(0, 20)}...` : 'null'
				);
				console.log(
					'🔄 New refresh token:',
					newRefreshToken ? `${newRefreshToken.substring(0, 20)}...` : 'null'
				);

				// Store new tokens using helper function
				setCookie('accessToken', accessToken);
				setCookie('refreshToken', newRefreshToken);

				// Verify cookies were set
				debugCookies();

				// Update the authorization header for future requests
				axiosInstance.defaults.headers.common['Authorization'] =
					`Bearer ${accessToken}`;
				console.log('🔄 Updated default Authorization header');

				// Update the original request with new token
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				console.log('🔄 Updated original request Authorization header');

				console.log('🔄 Retrying original request...');
				console.log('🔄 Original request config:', originalRequest);

				const retryResponse = await axiosInstance(originalRequest);
				console.log('✅ RETRY SUCCESS:', retryResponse.status);

				return retryResponse;
			} catch (refreshError) {
				console.log('❌ TOKEN REFRESH FAILED');
				console.error('❌ Refresh error details:', refreshError);
				console.log(
					'❌ Refresh error response:',
					(refreshError as any)?.response
				);

				deleteCookie('accessToken');
				deleteCookie('refreshToken');

				// Clear default authorization header
				delete axiosInstance.defaults.headers.common['Authorization'];

				window.location.href = '/login';

				return Promise.reject(refreshError);
			}
		} else if (error.response?.status === 401) {
			console.log(
				'❌ 401 error but already retried - not attempting refresh again'
			);
		} else {
			console.log('❌ Non-401 error or different error type - passing through');
		}

		return Promise.reject(error);
	}
);

console.log('🔧 INTERCEPTOR: Setup complete');

// Export a debug function you can call from browser console
(window as any).debugInterceptor = () => {
	console.log('=== INTERCEPTOR DEBUG INFO ===');
	debugCookies();
	console.log('🔧 axiosInstance defaults:', axiosInstance.defaults);
	console.log('🔧 axiosInstance interceptors:', {
		request: axiosInstance.interceptors.request,
		response: axiosInstance.interceptors.response,
	});
};
