import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
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
import OptionCardContainer from "components/OptionCard/OptionCardContainer";
import ProfileButtonContainer from "components/ProfileButton/ProfileButtonContainer";

import styles from "./Sidebar.module.css";
import LogoutContainer from "components/Logout/LogoutContainer";

const Sidebar = React.forwardRef(({ options, showMoreOption, showCard, user }, ref) => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar__wrapper}>
				<div className={styles.sidebar__top__wrapper}>
					<div className={styles.sidebar__logo}>
						<TwitterIcon className="logo" id="id_logo" />
					</div>
					<>
						<NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={HomeRoundedIcon} text="Home" />
						</NavLink>
						<NavLink to="/explore" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={SearchIcon} text="Explore" />
						</NavLink>
						<NavLink to="/notifications" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={NotificationsNoneRoundedIcon} text="Notifications" />
						</NavLink>
						<NavLink to="/messages" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={MailOutlineRoundedIcon} text="Messages" />
						</NavLink>
						<NavLink to="/bookmarks" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={BookmarkBorderRoundedIcon} text="Bookmark" />
						</NavLink>
						<NavLink to="/list" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={ListAltRoundedIcon} text="List" />
						</NavLink>
						<NavLink to="/me" className={({ isActive }) => `${styles.link} ${isActive ? "active" : ""}`}>
							<MenuItemContainer Icon={PersonOutlineRoundedIcon} text="Profile" />
						</NavLink>
						<div onClick={showCard} className={`${styles.sidebar__options} ${showMoreOption && styles.sidebar__options__active}`}>
							<MenuItemContainer Icon={MoreHorizRoundedIcon} text="More" active={showMoreOption} />
							<div className={styles.sidebar__options__wrapper}>
								{showMoreOption && <OptionCardContainer options={options} ref={ref} />}
							</div>
						</div>
					</>
					<Button className={styles["sidebar--tweet-btn"]} attributes={{
						title: "Tweet"
					}} text="Tweet">Tweet</Button>
				</div>
				<div>
					<div className={styles.sidebar__user__wrapper}>
						<ProfileButtonContainer user={user} showFollowButton={false} nameProps={
							{ allowNavigate: false }
						} />
					</div>
					<LogoutContainer />
				</div>
			</div>
		</div>
	);
});


Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	showMoreOption: PropTypes.bool,
	showCard: PropTypes.func,
	user: PropTypes.object
};

export default Sidebar;