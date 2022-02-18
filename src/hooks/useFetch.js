import { useState, useEffect, useMemo, } from "react";
import axios from "axios";

// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

const BASE_URL = process.env.REACT_APP_TWITTER_API_BASE_URL;

const useFetch = () => {
	const cancelToken = useMemo(() => (axios.CancelToken.source()), []);
	const [options, setOptions] = useState({
		baseURL: BASE_URL,
		url: "",
		method: "GET",
		mode: "cors",
		timeout: 10000,
		cancelToken: cancelToken.token,
		xsrfCookieName: "csrftoken",
		xsrfHeaderName: "X-CSRFToken",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		}
	});

	const makeRequest = (endpoint, extraOption = {}) => {
		setOptions((prev) => ({
			...prev,
			...extraOption,
			url: endpoint,
			headers: { ...prev.headers, ...extraOption.headers }
		}));
	};

	useEffect(() => {
		if (!options.url) {
			return;
		}
		(async () => {
			console.log(options);
			try {
				await axios(options);
			} catch (error) {
				console.log(error);
				cancelToken.cancel();
			}
		})();
		return () => {
			cancelToken.cancel();
		};
	}, [options.url]);

	return [makeRequest];
};


export default useFetch;