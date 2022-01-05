import React from "react";
import PropTypes from "prop-types";

// import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName";
import FeedHeader from "components/FeedHeader/FeedHeader";

import styles from "./ProfileFeed.module.css";
import TweetMenuBarContainer from "components/TweetMenuBar/TweetMenuBarContainer";


function ProfileFeed({ user, ...props }) {
	const { name, username, verified, public_metrics: { tweet_count } } = user.data;
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
						{tweet_count} Tweets
					</div>
				</FeedHeader>
				<ProfileContainer {...props} user={user.data} />
				<TweetMenuBarContainer menuItems={menuItems} />
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

};

export default React.memo(ProfileFeed, (prev, next) => {
	return prev.user.data === next.user.data;
});
