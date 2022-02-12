import { useState, useEffect } from "react";

import useLocalStorage from "hooks/useLocalStorage";

function useAuthentication() {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState(null);
	const [getItem, setItem, removeItem] = useLocalStorage();

	const logout = () => removeItem("token");
	const login = (token) => setItem("token", token);

	useEffect(() => {
		const token = getItem("token");
		if (token) {
			setIsAuthenticated(true);
			setUserId(token.userId);
		}
	}, [isAuthenticated, userId]);


	return [isAuthenticated, userId, login, logout];
}

export default useAuthentication;