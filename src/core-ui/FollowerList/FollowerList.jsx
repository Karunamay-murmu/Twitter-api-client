import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FeedHeader from "components/FeedHeader/FeedHeader";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import TweetMenuBarContainer from "components/TweetMenuBar/TweetMenuBarContainer";
import ProfileButtonContainer from "components/ProfileButton/ProfileButtonContainer";
import Spinner from "components/Spinner/Spinner";
import { selectStatus } from "redux/slice/followerSlice";

function FollowerList({ user, followers, ...props }) {

	const status = useSelector(state => selectStatus(state));

	return (<>
		<FeedHeader>
			<DisplayName name={user.name} verified onHeader />
			<Username name={user.username} />
		</FeedHeader>
		<TweetMenuBarContainer
			menuItems={[{
				name: "Followers",
				href: `/${user.username}/followers`,
			},
			{
				name: "Following",
				href: `/${user.username}/following`,
			},]}
		/>
		{
			followers && status === "succeeded" ?
				<div>
					{
						followers?.map(follower => (
							<ProfileButtonContainer key={follower.id} user={follower} {...props} />
						))
					}
				</div> :
				<Spinner message="Loading ..." />
		}
	</>);
}

FollowerList.propTypes = {
	user: PropTypes.object.isRequired,
	followers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FollowerList;
