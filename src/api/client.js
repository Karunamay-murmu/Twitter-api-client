import axios from "axios";
// import store from "redux/store";

// console.log(store.getState());

export const cancelToken = axios.CancelToken.source();

axios.defaults.baseURL = process.env.REACT_APP_TWITTER_API_BASE_URL;
axios.defaults.mode = "cors";
axios.defaults.timeout = 20000;
axios.defaults.cancelToken = cancelToken.token;
axios.defaults.headers.get["Content-Type"] = "application/json";

// const baseURL = process.env.REACT_APP_TWITTER_API_BASE_URL;
// const defaultOptions = {
// 	baseURL,
// 	url: "",
// 	method: "GET",
// 	mode: "cors",
// 	timeout: 20000,
// 	cancelToken: cancelToken.token,
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// };

const request = async (options) => {
	try {
		console.log(options);
		const response = await axios.request(options);
		return response.data;
	} catch (e) {
		const error = e.response.data.error;
		throw new Error(error.message);
	}
};


class Client {

	static get(url, options = {}) {
		return request({
			url,
			method: "GET",
			...options
		});
	}

	// static post(url, opt = {}) {
	// 	const options = {
	// 		...defaultOptions,
	// 		...opt,
	// 		url,
	// 		method: "POST",
	// 	};
	// 	return request(options);
	// }

	// static put(url, opt = {}) {
	// 	const options = {
	// 		...defaultOptions,
	// 		...opt,
	// 		url,
	// 		method: "PUT",
	// 	};
	// 	return request(options);
	// }

	// static delete(url, opt = {}) {
	// 	const options = {
	// 		...defaultOptions,
	// 		...opt,
	// 		url,
	// 		method: "DELETE",
	// 	};
	// 	return request(options);
	// }
}

export default Client;