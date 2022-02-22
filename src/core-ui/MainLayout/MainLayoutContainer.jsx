import React from "react";
import PropTypes from "prop-types";

import MainLayout from "core-ui/MainLayout/MainLayout";
// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MainLayoutContainer({ isAuthenticated, ...props }) {
	// const { isAuthenticated } = useAuth0();
	const navigate = useNavigate();

	console.log(isAuthenticated);

	useEffect(() => {
		if (!isAuthenticated) {
			console.log("navigate");
			return navigate("login", { replace: true });
		}
	}, []);
	return <MainLayout {...props} />;
}

MainLayoutContainer.propTypes = {
	isAuthenticated: PropTypes.bool
};

export default MainLayoutContainer;