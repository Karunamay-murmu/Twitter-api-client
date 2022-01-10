import React from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
// import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
// import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
// import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";

import Avatar from "components/Avatar/Avatar";
import FeedTweetActionBarContainer from "components/FeedTweetActionBar/FeedTweetActionBarContainer";

import styles from "./FeedPost.module.css";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import { getPostDate } from "utils/convertDate";
import { trimText } from "utils/string";

const FeedPost = ({ moreOptions, ...props }) => {
	const { name, username, verified, profile_image_url } = props?.user;
	const { id, created_at, text, public_metrics: { reply_count, like_count, retweet_count } = {}, entities, attachments: { media_keys } = {}, isPinnedTweet = false } = props.tweet;
	return (
		<>
			<div className={styles.post__wrapper} >
				{
					isPinnedTweet && (
						<div className={styles.post__pin}>
							<PushPinRoundedIcon className={styles.post__pin__icon} />
							<div className={styles.post__pin__text}>Pinned Tweet</div>
						</div>
					)
				}
				<div className={styles.post__main}>
					<div className={styles.post__avatar}>
						<Avatar image={profile_image_url} />
					</div>
					<div className={styles.post__body}>
						<div className={styles.post__header}>
							<div className={styles.post__header__info}>
								<DisplayName name={name} verified={verified} />
								<Username name={username} />
								<time className={styles.post__header__info__date} dateTime={created_at}>
									<span className={styles.post__header__info__date__separator}>
										&bull;
									</span>
									{getPostDate(created_at)}
								</time>
							</div>
							<MoreOptionContainer moreOptions={moreOptions} />
						</div>
						<div className={styles.post__content}>
							<p className={styles.post__text}>{trimText({
								text,
								trim: true,
								replace: false,
								entities
							})}</p>
							<div className={styles.post__image__wrapper}>
								{
									media_keys && media_keys.map((media_key, index) => {
										const media = props.media[media_key];
										if (media.type === "photo") {
											return <img key={index} className={styles.post__image} src={media.url} width={media.width} height={media.height} />;
										}
									})
								}
							</div>
						</div>
						<div className={styles.post__footer}>
							<FeedTweetActionBarContainer
								id={id}
								replyCount={reply_count}
								likeCount={like_count}
								retweetCount={retweet_count}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

FeedPost.displayName = "FeedPost";

FeedPost.propTypes = {
	moreOptions: PropTypes.array,
	user: PropTypes.object,
	tweet: PropTypes.object,
	media: PropTypes.object,
	media_keys: PropTypes.array
};

// FeedPost.defaultProps = {
// 	tweetId: "",
// 	username: "USERNAME",
// 	displayName: "DISPLAY NAME",
// 	verified: false,
// 	text: "TEXT",
// 	moreOptions: [],
// };

export default FeedPost;
