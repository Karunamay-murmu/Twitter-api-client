import React from "react";
import PropTypes from "prop-types";

import MainLayout from "core-ui/MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MainLayoutContainer({ isAuthenticated, ...props }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			return navigate("login", { replace: true });
		}
	}, []);
	return <MainLayout {...props} />;
}

MainLayoutContainer.propTypes = {
	isAuthenticated: PropTypes.bool
};

export default MainLayoutContainer;