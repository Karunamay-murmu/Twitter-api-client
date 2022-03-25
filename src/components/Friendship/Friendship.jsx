import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";

function Friendship({ isFollowing, handleFollow }) {
	return (
		<>
			<div onClick={handleFollow} >
				<Button
					reverseColor={isFollowing}
					allowDangerousActionHoverStyle={isFollowing}
					style={{ height: "2.125rem" }}
				>
					{isFollowing ? "Following" : "Follow"}
				</Button>
			</div>
		</>
	);
}

Friendship.propTypes = {
	children: PropTypes.node,
	handleFollow: PropTypes.func,
	handleMouseOver: PropTypes.func,
	handleMouseOut: PropTypes.func,
	relationship: PropTypes.object,
	text: PropTypes.string,
	isFollowing: PropTypes.bool,
	status: PropTypes.string
};

export default Friendship;