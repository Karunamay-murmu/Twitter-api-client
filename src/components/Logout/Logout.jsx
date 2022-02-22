import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";

function Logout({ logout }) {
	return (
		<Button onClick={() => logout({ returnInfo: window.location.origin })}>
			Logout
		</Button>
	);
}

Logout.propTypes = {
	logout: PropTypes.func
};

export default Logout;