import React from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
// import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
// import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";

import Avatar from "components/Avatar/Avatar";
import FeedTweetActionBarContainer from "components/FeedTweetActionBar/FeedTweetActionBarContainer";

import styles from "./FeedPost.module.css";

const FeedPost = React.forwardRef((props) => {
	const {
		tweetId,
		displayName = "Karunamay Murmu",
		username = "username",
		verified = true,
		text = "Risk management, be ready to enjoy the best case, be ready to handle the worst case. Don’t invest more than you can lose.",
		moreOptions,
	} = props;
	// const { isOpen } = useSelector((state) => state.modal);
	return (
		<>
			<div className={styles.post__wrapper} data-tweet-id={tweetId}>
				<div className={styles.post__avatar}>
					<Avatar />
				</div>
				<div className={styles.post__body}>
					<div className={styles.post__header}>
						<div className={styles.post__header__info}>
							<span className={styles.post__user__displayName}>{displayName}</span>
							{verified && <VerifiedRoundedIcon className={`${styles.post__user__verified}`} />}
							<span className={styles.post__user__username}>{username}</span>
						</div>
						<MoreOptionContainer moreOptions={moreOptions} />
					</div>
					<div className={styles.post__content}>
						<p className={styles.post__text}>{text}</p>
						<div className={styles.post__image__wrapper}>
							{/* <img src={Image} alt="" /> */}
						</div>
					</div>
					<div className={styles.post__footer}>
						<FeedTweetActionBarContainer tweetId={tweetId} />
					</div>
				</div>
			</div>

		</>
	);
});

FeedPost.displayName = "FeedPost";

FeedPost.propTypes = {
	tweetId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	verified: PropTypes.bool,
	text: PropTypes.string,
	moreOptions: PropTypes.object,
	showOptionsActive: PropTypes.bool,
};

export default FeedPost;
