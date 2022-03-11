import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "redux/slice/authSlice";
import { blockFriendship, createFriendship, destroyFriendship, muteFriendship, showFriendship, unblockFriendship, unmuteFriendship } from "redux/slice/relationshipSlice";
import { setRelationship } from "redux/slice/userSlice";

function useFriendship(user) {

	console.log("useFriendship", user);

	const authUser = useSelector(state => selectAuthUser(state));
	const dispatch = useDispatch();

	const payload = useMemo(() => {
		return { source: authUser.twitter_id, target: user?.id_str ?? user?.id };
	}, [user]);

	useEffect(() => {
		if (!user?.connections) {
			dispatch(showFriendship({ source: authUser.twitter_id, target: user.id })).unwrap().then(response => {
				dispatch(setRelationship({ relationship: response.relationship }));
			});
		}
	}, [user]);

	const isFollowing = user?.connections?.source?.following ?? user?.connections?.includes("following");
	const isMuting = user?.connections?.source?.following ?? user?.connections?.includes("muting");
	const isBlocking = user?.connections?.source?.following ?? user?.connections?.includes("blocking");

	const handleFollow = (event) => {
		event.stopPropagation();
		dispatch(isFollowing ? destroyFriendship(payload) : createFriendship(payload));
	};

	const handleMute = (event) => {
		event.stopPropagation();
		dispatch(isMuting ? unmuteFriendship(payload) : muteFriendship(payload));
	};

	const handleBlock = (event) => {
		event.stopPropagation();
		dispatch(isBlocking ? unblockFriendship(payload) : blockFriendship(payload));
	};

	return {
		isFollowing,
		isMuting,
		isBlocking,
		handleMute,
		handleBlock,
		handleFollow,
	};

}

export default useFriendship;