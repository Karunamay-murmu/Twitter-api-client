import React from "react";
import PropTypes from "prop-types";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import DOMPurify from "dompurify";

import Avatar from "components/Avatar/Avatar";
import FeedTweetActionBarContainer from "components/FeedTweetActionBar/FeedTweetActionBarContainer";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import { getPostDate } from "utils/convertDate";
import { trimText } from "utils/string";
// import { short } from "utils/number";

import styles from "./FeedPost.module.css";

const FeedPost = ({ user, tweet, media, moreOptions }) => {
	const { name, username, verified, profile_image_url } = user;
	let { id, created_at, text, public_metrics: { reply_count, like_count, retweet_count } = {}, entities, isPinned = false, replies = [] } = tweet;
	text = trimText({
		text,
		trim: true,
		replace: false,
		entities
	});
	// console.log(media_keys);
	return (
		<>
			<div className={styles.post__wrapper} >
				{/* {tweet.text} */}
				{
					isPinned && (
						<div className={styles.post__pin}>
							<PushPinRoundedIcon className={styles.post__pin__icon} />
							<div className={styles.post__pin__text}>Pinned Tweet</div>
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
							<p className={styles.post__text} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></p>
							{
								media?.map((media, index) => {
									// const views = media?.public_metrics?.view_count;
									return (<div key={index} data-media={media} className={styles.post__image__wrapper}>
										{/* <img className={styles.post__image} src={media.url ?? media.preview_image_url} width={media.width} height={media.height} />
										{media.type === "video" && <span className={styles.post__image__metrics}>{short(views)} views</span>} */}
									</div>);
								})
							}
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
