import React from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import InputContainer from "components/Input/InputContainer.jsx";
import Button from "components/Button/Button.jsx";
import Avatar from "components/Avatar/Avatar.jsx";

import styles from "./Tweet.module.css";

function Tweet() {
	return (
		<div className={styles.tweet}>
			<div className={styles.tweet__avatar}>
				<Avatar />
			</div>
			<div className={styles.tweet__wrapper}>
				<InputContainer className={styles.tweet__input} tag="textarea" attributes={{
					placeholder: "What's happening?",
					rows: "2",
					name: "tweet"
				}} />
				<div className={styles.tweet__privacy}>
					<PublicOutlinedIcon className={styles["tweet__privacy--icon"]} />
					<span>Everyone can reply</span>
				</div>
				<div className={styles.tweet__footer}>
					<div className={styles.tweet__options}>
						<div className={styles.tweet__options__icon__wrapper}>
							<ImageOutlinedIcon className={styles["tweet__options--icon"]} />
						</div>
						<div className={styles.tweet__options__icon__wrapper}>
							<GifOutlinedIcon className={styles["tweet__options--icon"]} />
						</div>
						<div className={styles.tweet__options__icon__wrapper}>
							<PollOutlinedIcon className={styles["tweet__options--icon"]} />
						</div>
						<div className={styles.tweet__options__icon__wrapper}>
							<EmojiEmotionsOutlinedIcon className={styles["tweet__options--icon"]} />
						</div>
						<div className={styles.tweet__options__icon__wrapper}>
							<ScheduleOutlinedIcon className={styles["tweet__options--icon"]} />
						</div>
					</div>
					<Button className={styles.tweet__btn}>Tweet</Button>
				</div>
			</div>
		</div>
	);
}

export default Tweet;
