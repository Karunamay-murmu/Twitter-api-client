import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import SearchIcon from "@mui/icons-material/Search";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import MenuItemContainer from "components/MenuItem/MenuItemContainer.jsx";
import Button from "components/Button/Button.jsx";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles["sidebar--logo"]}>
				<TwitterIcon className="logo" id="id_logo" />
			</div>
			<div className={styles.sidebar__menu}>
				<MenuItemContainer active Icon={HomeRoundedIcon} text="Home" />
				<MenuItemContainer Icon={SearchIcon} text="Explore" />
				<MenuItemContainer Icon={NotificationsNoneRoundedIcon} text="Notifications" />
				<MenuItemContainer Icon={MailOutlineRoundedIcon} text="Messages" />
				<MenuItemContainer Icon={BookmarkBorderRoundedIcon} text="Bookmark" />
				<MenuItemContainer Icon={ListAltRoundedIcon} text="List" />
				<MenuItemContainer Icon={PersonOutlineRoundedIcon} text="Profile" />
				<MenuItemContainer Icon={MoreHorizRoundedIcon} text="More" />
			</div>
			<div className={styles["sidebar--tweet-btn"]} >
				<Button attributes={{
					title: "Tweet"
				}} text="Tweet">Tweet</Button>
			</div>
		</div>
	);
};

export default Sidebar;