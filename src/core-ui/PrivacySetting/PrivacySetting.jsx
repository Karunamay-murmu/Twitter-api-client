import React from "react";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

import Link from "components/Link/Link";
import SettingDetailContainer from "core-ui/SettingDetail/SettingDetailContainer";

import styles from "./PrivacySetting.module.css";

function PrivacySetting() {
	return (
		<SettingDetailContainer
			backbtn={false}
			header="Privacy and safety"
			desc="Manage what information you see and share on Twitter."
		>
			{/* TODO: Privacy setting UI */}
			<header className={styles.link__header__wrapper}>
				<h3 className={styles.link__header}>Your Twitter activity</h3>
			</header>
			<div className={styles.link__wrapper}>
				<Link to="your_twitter_data/account" title="Audience and tagging" info="Manage what information you allow other people on Twitter to see." Icon={GroupsOutlinedIcon} />
				<Link to="your_twitter_data/account" title="Your Tweets" info="Manage the information associated with your Tweets." Icon={CreateOutlinedIcon} />
				<Link to="your_twitter_data/account" title="Content you see" info="Decide what you see on Twitter based on your preferences like Topics and interests" Icon={ArticleOutlinedIcon} />
				<Link to="your_twitter_data/account" title="Mute and block" info="Manage the accounts, words, and notifications that you’ve muted or blocked." Icon={VolumeOffOutlinedIcon} />
				<Link to="your_twitter_data/account" title="Direct Messages" info="Manage who can message you directly." Icon={MailOutlineRoundedIcon} />
			</div>
		</SettingDetailContainer>
	);
}

export default PrivacySetting;
