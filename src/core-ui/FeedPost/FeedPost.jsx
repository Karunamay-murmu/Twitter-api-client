import React, { useCallback } from "react";
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
import { short } from "utils/number";

import styles from "./FeedPost.module.css";

const FeedPost = ({ user, tweet, media, navigateToTweetDetail }) => {
	const { profile_image_url } = user;
	let { id, created_at, public_metrics: { reply_count, like_count, retweet_count } = {}, isPinned = false, isRetweet = false, replies = [] } = tweet;

	const moreOptions = [
		{
			"text": `follow ${user.username}`,
			"Icon": PersonAddAltOutlinedIcon,
		}, {
			"text": "Add/remove from Lists",
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": `Mute @${user?.username}`,
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": `Block @${user?.username}`,
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

	const imageGrid = useCallback(() => {
		if (tweet?.media) {
			const style = {
				display: "grid",
				gridTemplateColumns: "repeat(2, 1fr)",
				gridTemplateRows: `repeat(${Math.floor(media.length / 2)}, 283.5px)`,
				gridGap: "1px"
			};
			switch (media.length) {
			case 1: {
				const { width, height } = tweet?.media[0];
				if (width > height) {
					style.gridTemplateColumns = "repeat(1, 1fr)";
					style.gridTemplateRows = "repeat(1, 1fr)";
				}
				return {
					display: "flex",
					width: `${width >= height ? "100%" : "385px"}`,
					height: `${height > width ? "510px" : "auto"}`,
				};
			}
			case 2:
				style.gridTemplateAreas = `
"image_1 image_2"
`;
				break;
			case 3:
				style.gridTemplateRows = "repeat(2, 140px)";
				style.gridTemplateAreas = `
"image_1 image_2"
"image_1 image_3"
`;
				break;
			case 4:
				style.gridTemplateRows = "repeat(2, 140px)";
				style.gridTemplateAreas = `
"image_1 image_2"
"image_3 image_4"
`;
				break;
			default:
				break;
			}
			return style;
		}
	});

	return (
		<div className={styles.post__wrapper} onClick={navigateToTweetDetail}>
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
						<div className={styles.post__pin__text}>Retweeted</div>
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
							<Name user={user} />
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
						{media && <div className={`${tweet?.media ? styles.post__media__wrapper : ""}`} style={imageGrid()}>
							{
								media?.map((media, index) => {
									const views = media?.public_metrics?.view_count;
									return (<div key={index} className={styles.post__media} style={{ gridArea: `image_${index + 1}` }}>
										<img className={styles.post__image} src={media.url ?? media.preview_image_url} width={`${media.width}px`} height={`${media.height}px`} />
										{media.type === "video" && <span className={styles.post__image__metrics}>{short(views)} views</span>}
									</div>);
								})
							}
						</div>}
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
