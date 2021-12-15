import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import Avatar from "components/Avatar/Avatar";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import Bio from "components/Bio/Bio.jsx";
import FollowInfo from "components/FollowInfo/FollowInfo.jsx";
import { EDIT_PROFILE } from "routes/routes";

import styles from "./Profile.module.css";

function Profile({
	username = "USERNAME",
	displayName = "DISPLAY_NAME",
	bio = "BIO",
	website = "WEBSITE.COM",
	location = "LOCATION",
	following,
	followers,
	routeLocation
}) {
	return (
		<>
			<div className={styles.profile}>
				<div className={styles.profile__wrapper}>
					<div className={styles.profile__coverphoto__container}></div>
					<div className={styles.profile__info__wrapper}>
						<div className={styles.profile__info}>
							<div className={styles.profile__avatar__container}>
								<Avatar className={styles.profile__avatar} />
							</div>
							<DisplayName name={displayName} className={styles.profile__displayName} />
							<Username name={username} />
							<Bio bio={bio} />
							<div className={styles.profile__extra}>
								<div className={styles.profile__extra__container}>
									<LocationOnOutlinedIcon className={styles.icon} />
									{location}
								</div>
								<div className={styles.profile__extra__container}>
									<LanguageOutlinedIcon className={styles.icon} />
									<a href={website} target="_blank" rel="noopener noreferrer" className={styles.link}>
										{website}
									</a>
								</div>
							</div>
							<FollowInfo following={following} followers={followers} />
						</div>
						<Link to={EDIT_PROFILE} state={{ background: routeLocation }} className={styles.profile__edit} attributes={{
							title: "Edit Profile",
							"aira-label": "Edit Profile",
						}}>
							Edit Profile
						</Link>
					</div>
				</div>
			</div>
		</>

	);
}


Profile.propTypes = {
	username: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	bio: PropTypes.string,
	website: PropTypes.string,
	location: PropTypes.string,
	following: PropTypes.number.isRequired,
	followers: PropTypes.number.isRequired,
	editProfile: PropTypes.func.isRequired,
	isModalOpen: PropTypes.bool,
	routeLocation: PropTypes.string,
};


export default Profile;
