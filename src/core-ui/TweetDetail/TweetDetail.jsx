import React, { useMemo } from "react";
import PropTypes from "prop-types";

import FeedHeader from "components/FeedHeader/FeedHeader";
import ProfileBasicInfo from "components/ProfileBasicInfo/ProfileBasicInfo";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";
import TweetStats from "components/TweetStats/TweetStats";
import TweetActionBarContainer from "components/TweetActionBar/TweetActionBarContainer";
import TweetRepliesContainer from "core-ui/TweetReplies/TweetRepliesContainer";
import TweetTextContainer from "components/TweetText/TweetTextContainer";
import MediaContainer from "components/Media/MediaContainer";

import styles from "./TweetDetail.module.css";

function TweetDetail({ tweet, moreOptions, user, media }) {
	const { username, name, profile_image_url } = user;
	const { created_at, public_metrics: { retweet_count, like_count, quote_count }, source } = tweet;

	const time = useMemo(() => new Date(created_at).toLocaleString("en-us", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}));

	const date = useMemo(() => new Date(created_at).toLocaleString("en-us", {
		month: "short",
		year: "numeric",
		day: "numeric",
	}));

	return (
		<div>
			<FeedHeader title="Tweet" />
			<div className={styles.tweet__wrapper}>
				<div className={styles.tweet__profile}>
					<ProfileBasicInfo displayName={name} username={username} image={profile_image_url} />
					<MoreOptionContainer moreOptions={moreOptions} />
				</div>
				<div className={styles.tweet__content}>
					<TweetTextContainer className={styles.tweet__post} tweet={tweet} />
					{media && media.length > 0 && <MediaContainer media={media} />}
				</div>
				<div className={styles.tweet__date}>
					<span>{time}</span> <span className={styles.dot}>&middot;</span>
					<span>{date}</span> <span className={styles.dot}>&middot;</span>
					<span>{source}</span>
				</div>
				<div className={styles.tweet__stats__wrapper}>
					<TweetStats reTweets={retweet_count} quoteTweets={quote_count} likes={like_count} />
				</div>
				<TweetActionBarContainer />
			</div>
			<TweetRepliesContainer />
		</div>
	);
}

TweetDetail.propTypes = {
	tweet: PropTypes.object.isRequired,
	moreOptions: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	media: PropTypes.array.isRequired,
	location: PropTypes.object,
};

export default TweetDetail;
