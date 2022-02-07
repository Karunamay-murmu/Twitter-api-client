import axios from "axios";

export const cancelToken = axios.CancelToken.source();
const baseURL = process.env.REACT_APP_TWITTER_API_BASE_URL;
const defaultOptions = {
	baseURL,
	url: "",
	method: "GET",
	mode: "cors",
	timeout: 20000,
	cancelToken: cancelToken.token,
};

const request = async (options) => {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (e) {
		const error = e.response.data.error;
		throw new Error(error.message);
	}
};


class Client {

	static get(url, opt = {}) {
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

export default Client;