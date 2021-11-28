import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName";
import FeedHeader from "components/FeedHeader/FeedHeader";

import styles from "./ProfileFeed.module.css";

function ProfileFeed({ username, tweetcount, ...props }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.feed}>
				<FeedHeader>
					<DisplayName name={username} className={styles.feed__title} />
					<div className={styles.feed__meta}>
						{tweetcount || "15.5K"} Tweets
					</div>
				</FeedHeader>
				<ProfileContainer {...props} />
				<div>
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
				</div>
			</div>
		</div >
	);
}

ProfileFeed.propTypes = {
	username: PropTypes.string.isRequired,
	tweetcount: PropTypes.string.isRequired,
};


export default ProfileFeed;
