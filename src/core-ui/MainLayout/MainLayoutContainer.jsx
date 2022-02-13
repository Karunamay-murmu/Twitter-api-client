import React from "react";
// import { useNavigate } from "react-router-dom";

// import useAuthentication from "hooks/useAuthentication";

import MainLayout from "core-ui/MainLayout/MainLayout";

// TODO: check for validations of access token

function MainLayoutContainer() {
	// const [isAuthenticated] = useAuthentication();
	// const navigate = useNavigate();



	return <MainLayout />;
	// return (
	// 	isAuthenticated ? <MainLayout /> : <div>no</div>
	// );
}

export default MainLayoutContainer;