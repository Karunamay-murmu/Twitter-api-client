import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Friendship from "components/Friendship/Friendship";
import useFriendship from "hooks/useFriendship";
import { useSelector } from "react-redux";
// import { selectRelationshipFetchingStatus } from "redux/slice/relationshipSlice";
import { selectRelationshipFetchingStatus, showFriendship } from "redux/slice/relationshipSlice";
// import { selectUser } from "redux/slice/userSlice";
import { selectUser, setRelationship } from "redux/slice/userSlice";
import { selectAuthUser } from "redux/slice/authSlice";



function FriendshipContainer({ userProfile, needFetchingRelationship, initialFollowing }) {
	const authUser = useSelector(state => selectAuthUser(state));
	const relationshipFetchingStatus = useSelector(state => selectRelationshipFetchingStatus(state));
	const user = userProfile ?? useSelector(state => selectUser(state));
	const { handleFollow } = useFriendship(user);

	const dispatch = useDispatch();
	console.log(dispatch);

	useEffect(() => {
		console.log("ad");
		// console.log(user)
		if (needFetchingRelationship) {
			dispatch(showFriendship({ source: authUser.twitter_id, target: user.id })).unwrap().then(response => {
				dispatch(setRelationship({ relationship: response.relationship }));
			});
		}
	}, []);

	return (
		<Friendship
			handleFollow={handleFollow}
			isFollowing={initialFollowing || (user?.relationship?.source?.following ?? false)}
			status={relationshipFetchingStatus}
		/>
	);
}

FriendshipContainer.propTypes = {
	userProfile: PropTypes.object,
	needFetchingRelationship: PropTypes.bool,
	initialFollowing: PropTypes.bool
};

FriendshipContainer.defaultProps = {
	needFetchingRelationship: true,
	initialFollowing: false
};

export default FriendshipContainer;