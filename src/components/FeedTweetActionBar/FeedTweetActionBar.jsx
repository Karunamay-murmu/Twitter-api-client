import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import { short } from "utils/number";
import { nanoid } from "@reduxjs/toolkit";

import styles from "./FeedTweetActionBar.module.css";

function FeedTweetActionBar({
	tweet,
	replyCount,
	likeCount,
	retweetCount,
}) {
	const location = useLocation();
	return (
		<div className={styles.actionbar__wrapper}>
			<Link to="/compose/tweet" state={{ background: location, modalId: nanoid(), tweet }} className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--reply"]}`} title="Reply" onClick={e => e.stopPropagation()}>
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<ChatBubbleOutlineRoundedIcon className={styles.actionbar__icon} />
				</div>
				{replyCount && <span>{short(replyCount)}</span>}
			</Link>
			<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--retweet"]}`} title="Retweets">
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<RepeatRoundedIcon className={styles.actionbar__icon} />
				</div>
				{retweetCount && <span>{short(retweetCount)}</span>}
			</div>
			<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--like"]}`} title="Like">
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<FavoriteBorderRoundedIcon className={styles.actionbar__icon} />
				</div>
				{likeCount && <span>{short(likeCount)}</span>}
			</div>
		</div>
	);
}

FeedTweetActionBar.propTypes = {
	tweet: PropTypes.object,
	id: PropTypes.string,
	replyCount: PropTypes.number,
	likeCount: PropTypes.number,
	retweetCount: PropTypes.number,
};

export default FeedTweetActionBar;
