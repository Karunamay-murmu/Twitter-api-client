import React from "react";
import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName";
import FeedHeader from "components/FeedHeader/FeedHeader";

import styles from "./ProfileFeed.module.css";
import TweetMenuBarContainer from "components/TweetMenuBar/TweetMenuBarContainer";
import { short } from "utils/number";


function ProfileFeed({ user, ...props }) {
	const {
		name,
		username,
		verified,
		public_metrics: {
			tweet_count
		},
	} = user;
	const menuItems = [
		{
			name: "Tweet",
			href: `/${username}`,
		},
		{
			name: "Tweets & replies",
			href: `/${username}/with_replies`,
		},
		{
			name: "Media",
			href: `/${username}/media`,
		},
		{
			name: "Likes",
			href: `/${username}/likes`,
		}
	];
	return (
		<div className={styles.wrapper}>
			<div className={styles.feed}>
				<FeedHeader>
					<DisplayName name={name} className={styles.feed__title} verified={verified} />
					<div className={styles.feed__meta}>
						{short(tweet_count)} Tweets
					</div>
				</FeedHeader>
				<ProfileContainer {...props} user={user} />
				<TweetMenuBarContainer menuItems={menuItems} />
				<Outlet />
			</div>
		</div >
	);
}

ProfileFeed.propTypes = {
	user: PropTypes.object,
};

export default React.memo(ProfileFeed, (prev, next) => {
	return prev.user.data === next.user.data;
});
