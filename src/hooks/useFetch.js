import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// import { getUserProfileFailure, getUserProfileStart, getUserProfileSuccess } from "redux/slice/userProfileSlice";
import { apiCallStart, apiCallSuccess, apiCallFailure, apiCallFinish } from "redux/slice/apiSlice";
import getEndpoint from "api/endpoints";

const BASE_URL = process.env.REACT_APP_TWITTER_API_BASE_URL;
console.log(BASE_URL);

const useFetch = () => {
	const [url, setUrl] = useState(null);
	const { data, isLoading, error, status } = useSelector(state => state.api);
	const dispatch = useDispatch();

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const options = useMemo(() => {
		return {
			baseURL: BASE_URL,
			url,
			method: "GET",
			mode: "cors",
			timeout: 1000,
			cancelToken: source.token,
		};
	}, [url]);

	const doFetch = (urlType, urlParam = null, obj = {}) => {
		Object.keys(obj).map(key => {
			options[key] = obj[key];
		});
		setUrl(BASE_URL + getEndpoint(urlType) + urlParam);
	};

	useEffect(() => {
		if (!url) {
			return;
		}
		const fetchData = async () => {
			console.log(options);
			dispatch(apiCallStart({
				url: options.url,
				method: options.method,
				body: options.body,
				params: options.params,
			}));
			try {
				const response = await axios.request(options);
				console.log(response);
				dispatch(apiCallSuccess(response.data.data));
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
	}, [url]);

	const api = {
		data,
		isLoading,
		error,
		status,
	};

	return [api, doFetch];
};


export default useFetch;