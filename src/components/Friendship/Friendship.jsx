import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";

function Friendship({ relationship, manageFriendship, text, handleMouseEnter, handleMouseLeave, children }) {
	return (
		<div onClick={() => manageFriendship()} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
			{
				children ?
					children :
					<Button
						reverseColor={relationship?.source?.following}
						allowDangerousActionHoverStyle={relationship?.source?.following}
						style={{ height: "2.125rem" }}
					>
						{text}
					</Button>
			}
		</div>
	);
}

Friendship.propTypes = {
	children: PropTypes.node,
	manageFriendship: PropTypes.func,
	handleMouseEnter: PropTypes.func,
	handleMouseLeave: PropTypes.func,
	relationship: PropTypes.object,
	text: PropTypes.string,
};

export default Friendship;