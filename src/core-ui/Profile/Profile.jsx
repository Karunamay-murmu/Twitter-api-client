import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import Avatar from "components/Avatar/Avatar";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import BioContainer from "components/Bio/BioContainer.jsx";
import FollowInfo from "components/FollowInfo/FollowInfo.jsx";
import { EDIT_PROFILE } from "routes/routes";

import styles from "./Profile.module.css";

function Profile({ profile, routeLocation }) {
	let {
		created_at,
		name,
		location,
		username,
		verified,
		description,
		public_metrics: {
			followers_count,
			following_count,
		},
		entities,
		profile_image_url,
		profile_display_url,
		profile_url
	} = profile;

	return (
		<>
			<div className={styles.profile}>
				<div className={styles.profile__wrapper}>
					<div className={styles.profile__photos__wrapper}>
						<div className={styles.profile__coverphoto__container}></div>
						<div className={styles.profile__avatar__container}>
							<Avatar className={styles.profile__avatar} image={profile_image_url} />
						</div>
					</div>
					<div className={styles.profile__edit__wrapper}>
						<Link to={EDIT_PROFILE} state={{ background: routeLocation }} className={styles.profile__edit} attributes={{
							title: "Edit Profile",
							"aira-label": "Edit Profile",
						}}>
							Edit Profile
						</Link>
					</div>
					<div className={styles.profile__info__wrapper}>
						<div className={styles.profile__info}>
							<DisplayName name={name} verified={verified} className={styles.profile__displayName} />
							<Username name={username} />
							{description && <BioContainer entities={entities.description} bio={description} />}
							<div className={styles.profile__extra}>
								{location && <div className={styles.profile__extra__container}>
									<LocationOnRoundedIcon className={styles.icon} />
									{location}
								</div>}
								{profile_display_url && <div className={styles.profile__extra__container}>
									<LanguageOutlinedIcon className={styles.icon} />
									<a href={profile_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
										{profile_display_url}
									</a>
								</div>}
								{created_at && <div className={styles.profile__extra__container}>
									<DateRangeOutlinedIcon className={styles.icon} />
									Joined {created_at}
								</div>}
							</div>
							<FollowInfo following={`${following_count}`} followers={`${followers_count}`} />
						</div>
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
