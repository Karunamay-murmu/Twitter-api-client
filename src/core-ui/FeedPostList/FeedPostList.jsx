import React from "react";
import PropTypes from "prop-types";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";

import Avatar from "components/Avatar/Avatar";
import FeedTweetActionBarContainer from "components/FeedTweetActionBar/FeedTweetActionBarContainer";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";
import TweetTextContainer from "components/TweetText/TweetTextContainer";
import Name from "components/Name/Name";
import { getPostDate } from "utils/convertDate";

import styles from "./FeedPostList.module.css";
import MediaContainer from "components/Media/MediaContainer";
import TweetOptionsContainer from "components/TweetOptions/TweetOptionsContainer";

const FeedPost = ({ tweet, media, navigateToTweetDetail, isTweetDetail }) => {
	const { username, screen_name, profile_image_url } = tweet.user;
	const { id, id_str, created_at, public_metrics, retweet_count = 0, favorite_count = 0, reply_count = 0, isPinned = false, is_retweet = false, is_quoted = false, replies = [] } = tweet;

	return !isTweetDetail && (
		<div className={styles.post__wrapper} onClick={(e) => navigateToTweetDetail(e, {
			id: id_str ?? id,
			username: username ?? screen_name,
		})} data-id={id_str ?? id}>
			{
				isPinned && (
					<div className={styles.post__pin}>
						<PushPinRoundedIcon className={styles.post__pin__icon} />
						<div className={styles.post__pin__text}>Pinned Tweet</div>
					</div>
				)
			}
			{
				is_retweet && (
					<div className={styles.post__pin}>
						<RepeatRoundedIcon className={styles.post__pin__icon} />
						<div className={styles.post__pin__text}>{tweet?.retweeted_status?.user?.screen_name ?? tweet?.retweeted_by?.username} Retweeted</div>
					</div>
				)
			}
			<div className={styles.post__main} style={is_quoted ? { gap: ".5rem" } : {}}>
				<div className={styles.post__avatar__wrapper}>
					<div className={styles.post__avatar}>
						<Avatar image={profile_image_url} style={is_quoted ? { width: "1.5rem", height: "1.5rem" } : {}} />
					</div>
					{
						(replies.length !== 0) && (
							<div className={styles.post__link}></div>
						)
					}
				</div>
				<div className={styles.post__body}>
					<div className={styles.post__header}>
						<div className={styles.post__header__info}>
							<Name user={tweet.user} />
							<span className={styles.post__header__info__date__separator}>
								&bull;
							</span>
							<time className={styles.post__header__info__date__wrapper} dateTime={created_at}>
								<span>{getPostDate(created_at)}</span>
							</time>
						</div>
						{!is_quoted && <MoreOptionContainer>
							<TweetOptionsContainer tweet={tweet} />
						</MoreOptionContainer>}
					</div>
					<div className={styles.post__content}>
						<div className={styles.post__text__wrapper}>
							<TweetTextContainer tweet={tweet} />
						</div>
						{
							media && <MediaContainer media={media} />
						}
					</div>
					<div className={styles.post__footer}>
						{!is_quoted && <FeedTweetActionBarContainer
							tweet={tweet}
							replyCount={public_metrics?.reply_count ?? reply_count}
							likeCount={public_metrics?.like_count ?? favorite_count}
							retweetCount={public_metrics?.retweet_count ?? retweet_count}
						/>}
					</div>
				</div>
			</div>
		</div>

	);
};

FeedPost.displayName = "FeedPost";

FeedPost.propTypes = {
	tweet: PropTypes.object,
	media: PropTypes.array,
	navigateToTweetDetail: PropTypes.func,
	isTweetDetail: PropTypes.bool,
};

export default FeedPost;
