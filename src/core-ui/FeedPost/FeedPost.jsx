import React from "react";
import PropTypes from "prop-types";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import Avatar from "components/Avatar/Avatar";
import OptionCardContainer from "components/OptionCard/OptionCardContainer";

import styles from "./FeedPost.module.css";

const FeedPost = React.forwardRef((props, ref) => {
	const {
		displayName,
		username,
		verified = true,
		text,
		options,
		showOptions,
		showOptionsActive
	} = props;
	console.log(options);
	return (
		<div className={styles.post__wrapper}>
			<div className={styles.post__avatar}>
				<Avatar />
			</div>
			<div className={styles.post__body}>
				<div className={styles.post__header}>
					<div className={styles.post__header__info}>
						<span className={styles.post__user__displayName}>{displayName || "Karunamay Murmu"}</span>
						{verified && <VerifiedRoundedIcon className={`${styles.post__user__verified}`} />}
						<span className={styles.post__user__username}>{username || "@username"}</span>
					</div>
					<div onClick={showOptions} className={`${styles.post__icon__wrapper} ${showOptionsActive && styles["post__icon__wrapper--active"]}`}>
						<MoreHorizRoundedIcon className={`${styles["post__header__more-icon"]}`} />
					</div>
				</div>
				<div className={styles.post__content}>
					<p className={styles.post__text}>{text || "Risk management, be ready to enjoy the best case, be ready to handle the worst case. Don’t invest more than you can lose."}</p>
					<div className={styles.post__image__wrapper}>
						{/* <img src={Image} alt="" /> */}
					</div>
				</div>
				<div className={styles.post__footer}>
					<div className={`${styles.post__footer__analytics} ${styles["post__footer__analytics--reply"]}`}>
						<div className={`${styles.post__icon__wrapper}`}>
							<ChatBubbleOutlineRoundedIcon className={styles.post__footer__icon} />
						</div>
						<span>4.9K</span>
					</div>
					<div className={`${styles.post__footer__analytics} ${styles["post__footer__analytics--retweet"]}`}>
						<div className={`${styles.post__icon__wrapper}`}>
							<RepeatRoundedIcon className={styles.post__footer__icon} />
						</div>
						<span>59</span>
					</div>
					<div className={`${styles.post__footer__analytics} ${styles["post__footer__analytics--like"]}`}>
						<div className={`${styles.post__icon__wrapper}`}>
							<FavoriteBorderRoundedIcon className={styles.post__footer__icon} />
						</div>
						<span>1.1M</span>
					</div>
					<div className={`${styles.post__footer__analytics} ${styles["post__footer__analytics--share"]}`}>
						<div className={`${styles.post__icon__wrapper}`}>
							<IosShareRoundedIcon className={styles.post__footer__icon} />
						</div>
						<span>5</span>
					</div>
				</div>
			</div>
			<OptionCardContainer options={options} ref={ref} />
		</div>
	);
});

FeedPost.displayName = "FeedPost";

FeedPost.propTypes = {
	username: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	verified: PropTypes.bool,
	text: PropTypes.string,
	options: PropTypes.object,
	showOptions: PropTypes.func,
	showOptionsActive: PropTypes.bool,
};

export default FeedPost;
