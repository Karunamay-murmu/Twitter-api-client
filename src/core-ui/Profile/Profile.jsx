import React from "react";
import PropTypes from "prop-types";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import { Link } from "react-router-dom";

import Avatar from "components/Avatar/Avatar";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import Bio from "components/Bio/Bio.jsx";
import FollowInfo from "components/FollowInfo/FollowInfo.jsx";
import Button from "components/Button/Button.jsx";

import styles from "./Profile.module.css";

function Profile({ username, displayName, bio, website, location, following, followers }) {
	return (
		<div className={styles.profile}>
			<div className={styles.profile__wrapper}>
				<div className={styles.profile__coverphoto__container}></div>
				<div className={styles.profile__info__wrapper}>
					<div className={styles.profile__info}>
						<div className={styles.profile__avatar__container}>
							<Avatar className={styles.profile__avatar} />
						</div>
						<DisplayName name={displayName || "Karunamay"} className={styles.profile__displayName} />
						<Username name={username || "Karunamay"} />
						<Bio bio={bio || "this is my nio"} />
						<div className={styles.profile__extra}>
							<div className={styles.profile__extra__container}>
								<LocationOnOutlinedIcon className={styles.icon} />
								{location || "Bangalore"}
							</div>
							<div className={styles.profile__extra__container}>
								<LanguageOutlinedIcon className={styles.icon} />
								<a href={website} target="_blank" rel="noopener noreferrer" className={styles.link}>
									{website || "webiste.com"}
								</a>
							</div>
						</div>
						<FollowInfo following={following} followers={followers} />
					</div>
					<Button className={styles.profile__edit} attributes={{
						title: "Edit Profile",
						"aira-label": "Edit Profile",
					}}>
						Edit Profile
					</Button>
				</div>
			</div>
		</div>
	);
}


Profile.propTypes = {
	username: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	bio: PropTypes.string,
	website: PropTypes.string,
	location: PropTypes.string,
	following: PropTypes.number.isRequired,
	followers: PropTypes.number.isRequired
};


export default Profile;
