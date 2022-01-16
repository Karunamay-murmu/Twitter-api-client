import axios from "axios";

const cancelToken = axios.CancelToken.source();
const baseURL = process.env.REACT_APP_TWITTER_API_BASE_URL;
const defaultOptions = {
	baseURL,
	url: "",
	method: "GET",
	mode: "cors",
	timeout: 10000,
	cancelToken: cancelToken.token,
};

const request = async (options) => {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		return error.message;
	}
};


class Client {

	static get(url, opt = {}) {
		console.log(url);
		const options = {
			...defaultOptions,
			...opt,
			url,
			method: "GET",
		};
		return request(options);
	}

	static post(url, opt = {}) {
		const options = {
			...defaultOptions,
			...opt,
			url,
			method: "POST",
		};
		return request(options);
	}

	static put(url, opt = {}) {
		const options = {
			...defaultOptions,
			...opt,
			url,
			method: "PUT",
		};
		return request(options);
	}

	static delete(url, opt = {}) {
		const options = {
			...defaultOptions,
			...opt,
			url,
			method: "DELETE",
		};
		return request(options);
	}
}

// const client = {
//     get: (url, opt) => {
//         const options = {
//             ...defaultOptions,
//             ...options,
//             url,
//             method: "GET",
//         };
//         return request(options);
//     },
//     post: (url, options) => {
//         return request(url, {
//             method: "POST",
//             ...options,
//         });
//     },
//     put: (url, options) => {
//         return request(url, {
//             method: "PUT",
//             ...options,
//         });
//     },
//     delete: (url, options) => {
//         return request(url, {
//             method: "DELETE",
//             ...options,
//         });
//     }
// }

// const client = async (url, extraOptions) => {
//     try {
//         const response = await axios.request({
//             url,
//             ...options,
//             ...extraOptions,
//         });
//         return response.data;
//     } catch (error) {
//         return error.message;
//     }
// }

export default Client;