import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { apiCallStart, apiCallSuccess, apiCallFailure, apiCallFinish } from "redux/slice/apiSlice";

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
	});
	let { data, url, isLoading, error, status } = useSelector(state => state.api);
	const dispatch = useDispatch();


	const doFetch = (endpoint, extraOption = {}) => {
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
			dispatch(apiCallStart({
				url: options.url,
				method: options.method,
				body: options.body,
				params: options.params,
			}));
			try {
				const response = await axios.request(options);
				dispatch(apiCallSuccess(response.data.data));
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

	const api = {
		data,
		url,
		isLoading,
		error,
		status,
	};

	return [api, doFetch];
};


export default useFetch;