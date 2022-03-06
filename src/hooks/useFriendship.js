import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "redux/slice/authSlice";
import { blockFriendship, createFriendship, destroyFriendship, muteFriendship, selectRelationship, unblockFriendship, unmuteFriendship } from "redux/slice/relationshipSlice";
import { updateRelationship } from "redux/slice/userSlice";

function useFriendship(user) {

	const relationship = useSelector(state => selectRelationship(state));
	const authUser = useSelector(state => selectAuthUser(state));
	const dispatch = useDispatch();

	const payload = useMemo(() => {
		return { source: authUser.twitter_id, target: user?.id_str ?? user?.id };
	}, [relationship]);

	const userId = useMemo(() => user?.id_str ?? user?.id, [user]);

	const handleFollow = (event) => {
		event.stopPropagation();
		dispatch(relationship[userId].source.following ? destroyFriendship(payload) : createFriendship(payload)).unwrap().then(response => {
			dispatch(updateRelationship({
				relationshipType: "following",
				data: response.data.following
			}));
		});
	};

	const handleMute = useCallback((event) => {
		event.stopPropagation();
		dispatch(relationship[userId].source.muting ? unmuteFriendship(payload) : muteFriendship(payload));
	}, [relationship]);

	const handleBlock = useCallback((event) => {
		event.stopPropagation();
		dispatch(relationship[userId].source.blocking ? unblockFriendship(payload) : blockFriendship(payload));
	}, [relationship]);

	return {
		isFollowing: relationship[userId]?.source?.following,
		isMuted: relationship[userId]?.source?.muting,
		isBlocked: relationship[userId]?.source?.blocking,
		handleMute,
		handleBlock,
		handleFollow,
	};

}

export default useFriendship;