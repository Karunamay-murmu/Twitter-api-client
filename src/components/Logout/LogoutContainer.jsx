import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Logout from "components/Logout/Logout";

function LogoutContainer(props) {

	const { logout } = useAuth0();

	return (
		<Logout {...props} logout={logout} />
	);
}

export default LogoutContainer;