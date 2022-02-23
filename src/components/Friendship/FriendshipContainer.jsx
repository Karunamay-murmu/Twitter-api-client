import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Friendship from "components/Friendship/Friendship";
// import { useState } from "react";
import { createFriendship } from "redux/slice/userSlice";

function FriendshipContainer({ relationship, ...props }) {

	const dispatch = useDispatch();

	const handleFriendShip = () => {
		const promise = dispatch(createFriendship({
			sourceUser: relationship.source.id_str,
			targetUser: relationship.target.id_str,
			meta: {
				action: relationship.source.following ? "create" : "destroy"
			}
		}));
		return () => promise.abort();
	};

	// console.log(isFollowing);

	return (
		<Friendship {...props} manageFriendship={handleFriendShip} />
	);
}

FriendshipContainer.propTypes = {
	isFollowing: PropTypes.bool,
	relationship: PropTypes.object
};

export default FriendshipContainer;