import React from "react";
import PropTypes from "prop-types";

function Friendship({ manageFriendship, children }) {
	console.log("render");
	// TODO: implement friendship functionality
	return (
		<div onClick={() => manageFriendship()}>
			{children}
			ds
		</div>

	);
}

Friendship.propTypes = {
	children: PropTypes.node,
	manageFriendship: PropTypes.func
};

export default Friendship;