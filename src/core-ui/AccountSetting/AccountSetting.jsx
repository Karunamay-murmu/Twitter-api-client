import React from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

import Link from "components/Link/Link";
import SettingDetailContainer from "core-ui/SettingDetail/SettingDetailContainer";

function AccountSetting() {
	return (
		<SettingDetailContainer
			backbtn={false}
			header="Your Account"
			desc="See information about your account, download an archive of your data, or learn about your account deactivation options"
		>
			<Link to="/settings/your_twitter_data/account" title="Account information" info="See your account information like your phone number and email address." Icon={PersonOutlineRoundedIcon} />
			<Link to="your_twitter_data/account" title="Change your password" info="Change your password at any time." Icon={LockOutlinedIcon} />
			<Link to="your_twitter_data/account" title="Download an archive of your data" info="Get insights into the type of information stored for your account." Icon={FileDownloadOutlinedIcon} />
			<Link to="your_twitter_data/account" title="TweetDeck Team" info="Invite anyone to Tweet from this account using the Teams feature in TweetDeck." Icon={GroupOutlinedIcon} />
			<Link to="your_twitter_data/account" title="Deactivate your account" info="Find out how you can deactivate your account." Icon={RemoveCircleOutlineRoundedIcon} />
		</SettingDetailContainer>
	);
}

export default AccountSetting;
