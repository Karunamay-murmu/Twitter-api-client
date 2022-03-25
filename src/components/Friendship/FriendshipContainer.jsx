import React from "react";
import PropTypes from "prop-types";

import Friendship from "components/Friendship/Friendship";
import useFriendship from "hooks/useFriendship";
import { useSelector } from "react-redux";
import { selectRelationshipFetchingStatus } from "redux/slice/relationshipSlice";

function FriendshipContainer({ user }) {
	const relationshipFetchingStatus = useSelector(state => selectRelationshipFetchingStatus(state));
	const { isFollowing, handleFollow } = useFriendship(user);

	return (
		<Friendship
			handleFollow={handleFollow}
			isFollowing={isFollowing}
			status={relationshipFetchingStatus}
		/>
	);
}

FriendshipContainer.propTypes = {
	user: PropTypes.object,
};

FriendshipContainer.defaultProps = {
	needFetchingRelationship: true,
	initialFollowing: false
};

export default FriendshipContainer;