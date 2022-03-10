import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Friendship from "components/Friendship/Friendship";
import useFriendship from "hooks/useFriendship";
import { useSelector } from "react-redux";
import { selectRelationshipFetchingStatus, showFriendship } from "redux/slice/relationshipSlice";
import { setRelationship } from "redux/slice/userSlice";
import { selectAuthUser } from "redux/slice/authSlice";


function FriendshipContainer({ user }) {
	const authUser = useSelector(state => selectAuthUser(state));
	const relationshipFetchingStatus = useSelector(state => selectRelationshipFetchingStatus(state));
	const { isFollowing, handleFollow } = useFriendship(user);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!user?.connections) {
			dispatch(showFriendship({ source: authUser.twitter_id, target: user.id })).unwrap().then(response => {
				dispatch(setRelationship({ relationship: response.relationship }));
			});
		}
	}, []);

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