import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import Login from "components/Login/Login";
import { useNavigate } from "react-router-dom";

function LoginContainer({ isAuthenticated, ...props }) {

	const { loginWithRedirect } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		return isAuthenticated && navigate("/");
	}, []);

	const onLogin = () => {
		loginWithRedirect({connection: "twitter"});
	};

	return <Login {...props} onLogin={onLogin} />;
}

LoginContainer.propTypes = {
	isAuthenticated: PropTypes.bool
};

export default LoginContainer;