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
import TweetOptionsCntainer from "components/TweetOptions/TweetOptionsContainer";
import FeedPostListContainer from "core-ui/FeedPostList/FeedPostListContainer";

function TweetDetail({ tweets, media }) {
	const render = (data) => {
		return data.map(tweet => {
			const { username, name, profile_image_url } = tweet.user;
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

			return !tweet?.replies ?
				(<React.Fragment key={tweet.id}>
					<div className={styles.tweet__wrapper}>
						<div className={styles.tweet__profile}>
							<ProfileBasicInfo displayName={name} username={username} image={profile_image_url} />
							<MoreOptionContainer>
								<TweetOptionsCntainer tweet={tweet} />
							</MoreOptionContainer>
						</div>
						<div className={styles.tweet__content}>
							<TweetTextContainer className={styles.tweet__post} tweet={tweet} />
							{media?.length && <MediaContainer media={media} />}
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
				</React.Fragment>)
				:
				<>
					<FeedPostListContainer tweets={tweets} />
					{render(tweet.replies)}
				</>;
		});
	};


	return (
		<div>
			<FeedHeader title="Tweet" />
			{render(tweets)}
		</div>
	);
}

TweetDetail.propTypes = {
	tweets: PropTypes.array.isRequired,
	media: PropTypes.array,
};

export default TweetDetail;
