import { useState, useEffect } from "react";

function useLocalStorage() {
	const [value, setValue] = useState(null);
	const getItem = (key) => {
		try {
			const value = window.localStorage.getItem(key);
			setValue(JSON.parse(value));
		} catch (e) {
			setValue(null);
		}
	};
	const setItem = (key, value) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			setValue(value);
		} catch (error) {
			setValue(null);
		}
	};
	const removeItem = (key) => {
		window.localStorage.removeItem(key);
	};
	useEffect(() => value, [value]);
	return [getItem, setItem, removeItem];
}

export default useLocalStorage;