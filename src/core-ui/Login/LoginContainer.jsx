import React from "react";

import Login from "core-ui/Login/Login";

function LoginContainer(props) {

	const onLogin = () => {};
		

	return <Login {...props} onLogin={onLogin}/>;
}

export default LoginContainer;