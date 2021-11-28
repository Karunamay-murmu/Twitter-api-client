import React from "react";
import PropTypes from "prop-types";

import FeedHeader from "components/FeedHeader/FeedHeader";
import ProfileBasicInfo from "components/ProfileBasicInfo/ProfileBasicInfo";

import styles from "./TweetDetail.module.css";

function TweetDetail({ displayName, username }) {
	return (
		<div>
			<FeedHeader title="Tweet" />
			<div className={styles.tweet__wrapper}>
				<ProfileBasicInfo displayName={displayName} username={username} />
			</div>
		</div>
	);
}

TweetDetail.propTypes = {
	displayName: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

export default TweetDetail;
