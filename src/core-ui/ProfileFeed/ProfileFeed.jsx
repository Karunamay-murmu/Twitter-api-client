import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName";
import FeedHeader from "components/FeedHeader/FeedHeader";

import styles from "./ProfileFeed.module.css";

function ProfileFeed({ user, ...props }) {
	console.log(user.data);
	const { name, verified, public_metrics: { tweet_count } } = user.data;
	return (
		<div className={styles.wrapper}>
			<div className={styles.feed}>
				<FeedHeader>
					<DisplayName name={name} className={styles.feed__title} verified={verified} />
					<div className={styles.feed__meta}>
						{tweet_count} Tweets
					</div>
				</FeedHeader>
				<ProfileContainer {...props} user={user} />
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
	user: PropTypes.object,

};


export default ProfileFeed;
// export default React.memo(ProfileFeed, (prev, next) => {
// 	return prev.user.data === next.user.data;
// });
