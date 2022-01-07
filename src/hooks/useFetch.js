import { useState, useEffect, useMemo, } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { apiCallStart, apiCallSuccess, apiCallFailure, apiCallFinish } from "redux/slice/apiSlice";

const BASE_URL = process.env.REACT_APP_TWITTER_API_BASE_URL;

// const apiSelector = state => state.api;

const useFetch = () => {
	const cancelToken = useMemo(() => (axios.CancelToken.source()), []);
	const [options, setOptions] = useState({
		baseURL: BASE_URL,
		url: "",
		method: "GET",
		mode: "cors",
		timeout: 10000,
		cancelToken: cancelToken.token,
	});

	// console.log("running");

	// let { data, url, isFetching, error, status } = useSelector(apiSelector, (prev, next) => prev.data == next.data || prev.status === next.status);
	// console.log(options.url);
	// console.log(data, status);
	// console.log(url, status, isFetching, error, data);
	const dispatch = useDispatch();


	const doFetch = (endpoint, extraOption = {}) => {
		console.log("doFetch");
		setOptions((prev) => ({
			...prev,
			...extraOption,
			url: endpoint,
		}));
	};

	useEffect(() => {
		if (!options.url) {
			return;
		}
		const fetchData = async () => {
			console.log("dispathic");
			dispatch(apiCallStart({
				url: options.url,
				method: options.method,
				body: options.body,
				params: options.params,
			}));
			try {
				const response = await axios.request(options);
				dispatch(apiCallSuccess(response.data));
			} catch (error) {
				if (axios.isCancel(error)) {
					dispatch(apiCallFailure(error.message));
				} else {
					dispatch(apiCallFailure(error.message));
				}
			} finally {
				dispatch(apiCallFinish());
			}
		};
		fetchData();
		return () => {
			cancelToken.cancel();
		};
	}, [options.url]);

	// const api = {
	// 	data,
	// 	url,
	// 	isFetching,
	// 	error,
	// 	status,
	// };

	return [doFetch];
};


export default useFetch;