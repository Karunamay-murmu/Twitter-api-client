import React from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import Login from "core-ui/Login/Login";
import withAuthentication from "hoc/withAuthentication";

function LoginContainer({ ...props }) {

	const { loginWithRedirect } = useAuth0();

	const onLogin = () => {
		loginWithRedirect({connection: "twitter"});
	};

	return <Login {...props} onLogin={onLogin} />;
}

LoginContainer.propTypes = {
	oauth_token: PropTypes.string,
	oauth_verifier: PropTypes.string,
};

export default withAuthentication(LoginContainer);