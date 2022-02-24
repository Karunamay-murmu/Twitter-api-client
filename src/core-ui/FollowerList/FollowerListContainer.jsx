import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import FollowerList from "core-ui/FollowerList/FollowerList";
import Spinner from "components/Spinner/Spinner";
import { selectUser } from "redux/slice/userSlice";
import { clearFollowerList, fetchFollowers, selectFollowers, selectFollowing, selectStatus } from "redux/slice/followerSlice";

function FollowerListContainer({ path, ...props }) {

	const user = useSelector(state => selectUser(state));
	const followers = useSelector(state => selectFollowers(state));
	const following = useSelector(state => selectFollowing(state));
	const status = useSelector(state => selectStatus(state));
	const dispatch = useDispatch();

	useEffect(() => {
		let promise;
		if (user && user.id && (!followers.data || !following.data)) {
			promise = dispatch(fetchFollowers({ id: user.id, pathname: path }));
		}
		return () => {
			dispatch(clearFollowerList({ pathname: path }));
			if (status === "loading") {
				promise.abort();
			}
		};

	}, [user && user.username, path]);

	return (
		<>
			{!user ? <Spinner message="Loading..." /> : <FollowerList user={user} followers={path === "followers" && followers.data || path === "following" && following.data || ""} {...props} />}
		</>
	);


	// <FollowerList {...props} user={user} followers={followers} />;
}

FollowerListContainer.propTypes = {
	path: PropTypes.string.isRequired,
};

export default FollowerListContainer;
