import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import DOMPurify from "dompurify";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import Avatar from "components/Avatar/Avatar";
import FeedTweetActionBarContainer from "components/FeedTweetActionBar/FeedTweetActionBarContainer";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";
import TweetTextContainer from "components/TweetText/TweetTextContainer";
import Name from "components/Name/Name";
import { getPostDate } from "utils/convertDate";

import styles from "./FeedPostList.module.css";
import MediaContainer from "components/Media/MediaContainer";

const FeedPost = ({ tweet, media, navigateToTweetDetail }) => {
	const { username, screen_name, profile_image_url } = tweet.user;
	let { id, id_str, created_at, public_metrics, retweet_count = 0, favorite_count = 0, reply_count = 0, isPinned = false, isRetweet = false, replies = [] } = tweet;

	const moreOptions = [
		{
			"text": `follow ${username}`,
			"Icon": PersonAddAltOutlinedIcon,
		}, {
			"text": "Add/remove from Lists",
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": `Mute @${username}`,
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": `Block @${username}`,
			"Icon": BlockIcon,
		}
		, {
			"text": "Embed Tweet",
			"Icon": CodeIcon,
		}
		, {
			"text": "Report Tweet",
			"Icon": FlagOutlinedIcon,
		}
	];


	return (
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
				isRetweet && (
					<div className={styles.post__pin}>
						<RepeatRoundedIcon className={styles.post__pin__icon} />
						<div className={styles.post__pin__text}>{tweet?.retweeted_status?.user?.screen_name ?? tweet?.retweeted_by?.username} Retweeted</div>
					</div>
				)
			}
			<div className={styles.post__main}>
				<div className={styles.post__avatar__wrapper}>
					<div className={styles.post__avatar}>
						<Avatar image={profile_image_url} />
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
						{moreOptions && <MoreOptionContainer moreOptions={moreOptions} />}
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
						<FeedTweetActionBarContainer
							id={id}
							replyCount={public_metrics?.reply_count ?? reply_count}
							likeCount={public_metrics?.like_count ?? favorite_count}
							retweetCount={public_metrics?.retweet_count ?? retweet_count}
						/>
					</div>
				</div>
			</div>
		</div>

	);
};

FeedPost.displayName = "FeedPost";

FeedPost.propTypes = {
	moreOptions: PropTypes.array,
	user: PropTypes.object,
	tweet: PropTypes.object,
	media: PropTypes.array,
	media_keys: PropTypes.array,
	navigateToTweetDetail: PropTypes.func,
};

export default FeedPost;
