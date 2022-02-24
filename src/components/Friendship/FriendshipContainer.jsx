import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Friendship from "components/Friendship/Friendship";
// import { useState } from "react";
import { createFriendship, destroyFriendship } from "redux/slice/userSlice";

function FriendshipContainer({ relationship, ...props }) {
	const [text, setText] = useState(relationship.source.following ? "Following" : "Follow");

	const dispatch = useDispatch();

	const handleMouseEnter = useCallback(() => setText("Unfollow"));
	const handleMouseLeave = useCallback(() => setText("Following"));

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
			handleMouseEnter={handleMouseEnter}
			handleMouseLeave={handleMouseLeave}
			text={text}
		/>
	);
}

FriendshipContainer.propTypes = {
	isFollowing: PropTypes.bool,
	relationship: PropTypes.object
};

export default FriendshipContainer;