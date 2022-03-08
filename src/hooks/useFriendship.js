import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "redux/slice/authSlice";
import { blockFriendship, createFriendship, destroyFriendship, muteFriendship, unblockFriendship, unmuteFriendship } from "redux/slice/relationshipSlice";

function useFriendship(user) {

	const authUser = useSelector(state => selectAuthUser(state));
	const dispatch = useDispatch();

	const payload = useMemo(() => {
		return { source: authUser.twitter_id, target: user?.id_str ?? user?.id };
	}, [user]);

	const isFollowing = user?.connections?.includes("following") || user?.relationship?.source?.following;
	const isMuting = user?.connections?.includes("muting") ?? user?.relationship?.source?.following;
	const isBlocking = user?.connections?.includes("blocking") ?? user?.relationship?.source?.following;
	
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