import axios from "axios";

export const cancelToken = axios.CancelToken.source();

axios.defaults.baseURL = process.env.REACT_APP_TWITTER_API_BASE_URL;
axios.defaults.mode = "cors";
axios.defaults.timeout = 20000;
axios.defaults.cancelToken = cancelToken.token;
axios.defaults.headers.get["Content-Type"] = "application/json";

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

	static get(url, options = {}) {
		return request({
			url,
			method: "GET",
			...options
		});
	}

	static post(url, options = {}) {
		return request({
			url,
			method: "POST",
			...options
		});
	}

}

export default Client;