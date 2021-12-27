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

function Profile({ profile, routeLocation }) {
	let {
		name,
		location,
		username,
		verified,
		url,
		description,
		public_metrics: {
			followers_count,
			following_count,
		},
	} = profile;

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
							<DisplayName name={name} verified={verified} className={styles.profile__displayName} />
							<Username name={username} />
							<Bio bio={description} />
							<div className={styles.profile__extra}>
								<div className={styles.profile__extra__container}>
									<LocationOnOutlinedIcon className={styles.icon} />
									{location}
								</div>
								<div className={styles.profile__extra__container}>
									<LanguageOutlinedIcon className={styles.icon} />
									<a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
										{url}
									</a>
								</div>
							</div>
							<FollowInfo following={`${following_count}`} followers={followers_count} />
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
	// username: PropTypes.string,
	// name: PropTypes.string,
	// description: PropTypes.string,
	// url: PropTypes.string,
	// location: PropTypes.string,
	// following_count: PropTypes.number,
	// followers_count: PropTypes.number,
	// editProfile: PropTypes.func,
	// isModalOpen: PropTypes.bool,

	routeLocation: PropTypes.object,
	profile: PropTypes.object,
};


export default Profile;
