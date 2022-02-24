import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";

function Friendship({ relationship, manageFriendship, text, handleMouseOver, handleMouseOut, children }) {
	return (
		<div onClick={() => manageFriendship()} onMouseOver={() => handleMouseOver()} onMouseOut={() => handleMouseOut()}>
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
	handleMouseOver: PropTypes.func,
	handleMouseOut: PropTypes.func,
	relationship: PropTypes.object,
	text: PropTypes.string,
};

export default Friendship;