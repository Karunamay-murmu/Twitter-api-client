import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// import { getUserProfileFailure, getUserProfileStart, getUserProfileSuccess } from "redux/slice/userProfileSlice";
import { apiCallStart, apiCallSuccess, apiCallFailure, apiCallFinish } from "redux/slice/apiSlice";
import getEndpoint from "api/endpoints";

const BASE_URL = process.env.REACT_APP_TWITTER_API_BASE_URL;
console.log(BASE_URL);

const useFetch = (type) => {

	const [fetchStart, setFetchStart] = useState(false);
	const { data, isLoading, error, status } = useSelector(state => state.api);
	const dispatch = useDispatch();

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const url = getEndpoint(type);

	const options = {
		baseURL: BASE_URL,
		url,
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Authorization": `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
		},
		timeout: 1000,
		responseType: "json",
		responseEncoding: "utf8",
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "X-XSRF-TOKEN",
		cancelToken: source.token,
	};

	const doFetch = (urlSuffix, obj = {}) => {
		setFetchStart(true);
		options.url = options.url + urlSuffix;
		Object.keys(obj).map(key => {
			options[key] = obj[key];
		});
		console.log(options);
	};

	useEffect(() => {
		if (!fetchStart) {
			return;
		}
		const fetchData = async () => {
			dispatch(apiCallStart({
				url: options.url,
				method: options.method,
				body: options.body,
				params: options.params,
			}));
			try {
				const response = await axios.request(options);
				dispatch(apiCallSuccess(response));
			} catch (error) {
				if (axios.isCancel(error)) {
					dispatch(apiCallFailure(error.message));
				} else {
					// let errorObj;
					// if (error.response) {
					// 	errorObj = error.response;
					// } else if (error.request) {
					// 	errorObj = error.request;
					// }
					// else {
					// }
					dispatch(apiCallFailure(error.message));
				}
			} finally {
				dispatch(apiCallFinish());
			}
		};
		fetchData();
		return () => {
			source.cancel();
		};
	}, [fetchStart]);

	const api = {
		data,
		isLoading,
		error,
		status,
	};

	return [api, doFetch];
};


export default useFetch;