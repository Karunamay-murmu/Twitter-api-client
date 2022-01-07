import React from "react";
import PropTypes from "prop-types";

// import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";
import { Outlet } from "react-router-dom";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName";
import FeedHeader from "components/FeedHeader/FeedHeader";

import styles from "./ProfileFeed.module.css";
import TweetMenuBarContainer from "components/TweetMenuBar/TweetMenuBarContainer";
import { short } from "utils/number";
// import Spinner from "components/Spinner/Spinner";


function ProfileFeed({ user, ...props }) {
	console.log(user);
	const {
		name,
		screen_name,
		verified,
		statuses_count,
	} = user;
	const menuItems = [
		{
			name: "Tweet",
			href: `/${screen_name}`,
		},
		{
			name: "Tweets & replies",
			href: `/${screen_name}/with_replies`,
		},
		{
			name: "Media",
			href: `/${screen_name}/media`,
		},
		{
			name: "Likes",
			href: `/${screen_name}/likes`,
		}
	];
	// const pinnedTweet = user?.includes?.tweets;
	return (
		<div className={styles.wrapper}>
			<div className={styles.feed}>
				<FeedHeader>
					<DisplayName name={name} className={styles.feed__title} verified={verified} />
					<div className={styles.feed__meta}>
						{short(statuses_count)} Tweets
					</div>
				</FeedHeader>
				<ProfileContainer {...props} user={user} />
				<TweetMenuBarContainer menuItems={menuItems} />
				{/* <ProfileTweetsContainer /> */}
				{/* {
					pinnedTweet && pinnedTweet.map((tweet, idx) => (
						<FeedPostContainer key={idx} user={user} tweet={tweet} />
					))
				} */}
				<Outlet />
				{/* {
					!tweets.data ? (
						<Spinner />
					) : (
					)
				} */}
				{/* {
					pinnedTweet.length && <FeedPostContainer user={user.data} tweet={pinnedTweet} />
				}
				<div>
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
				</div> */}
			</div>
		</div >
	);
}

ProfileFeed.propTypes = {
	user: PropTypes.object,
	tweets: PropTypes.object,
};

export default React.memo(ProfileFeed, (prev, next) => {
	return prev.user.data === next.user.data;
});
