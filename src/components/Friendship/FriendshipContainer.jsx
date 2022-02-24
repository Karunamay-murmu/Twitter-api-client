import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Friendship from "components/Friendship/Friendship";
// import { useState } from "react";
import { createFriendship, destroyFriendship } from "redux/slice/userSlice";

function FriendshipContainer({ relationship, ...props }) {
	const [text, setText] = useState(relationship.source.following ? "Following" : "Follow");

	// TODO: Fix follow button hover issue
	const dispatch = useDispatch();

	const handleMouseOver = useCallback(() => relationship.source.following && setText("Unfollow"));
	const handleMouseOut = useCallback(() => relationship.source.following && setText("Following"));

	const handleFriendShip = useCallback(() => {
		dispatch(relationship.source.following ? destroyFriendship({
			sourceUser: relationship.source.id_str,
			targetUser: relationship.target.id_str,
		}) : createFriendship({
			sourceUser: relationship.source.id_str,
			targetUser: relationship.target.id_str,
		}));
	});

	return (
		<Friendship 
			{...props} 
			manageFriendship={handleFriendShip} 
			relationship={relationship} 
			handleMouseOver={handleMouseOver}
			handleMouseOut={handleMouseOut}
			text={text}
		/>
	);
}

FriendshipContainer.propTypes = {
	isFollowing: PropTypes.bool,
	relationship: PropTypes.object
};

export default FriendshipContainer;