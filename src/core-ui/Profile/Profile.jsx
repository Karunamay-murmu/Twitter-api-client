import React from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DOMPurify from "dompurify";
import twemoji from "twemoji";

import Avatar from "components/Avatar/Avatar";
import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import BioContainer from "components/Bio/BioContainer.jsx";
import FollowInfo from "components/FollowInfo/FollowInfo.jsx";
import FeedHeader from "components/FeedHeader/FeedHeader";
import TweetMenuBarContainer from "components/TweetMenuBar/TweetMenuBarContainer";
import FriendshipContainer from "components/Friendship/FriendshipContainer";
import { EDIT_PROFILE } from "routes/routes";
import { short } from "utils/number";

import styles from "./Profile.module.css";
// import Name from "components/Name/Name";

function Profile({ authUser, profile, routeLocation }) {
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
			tweet_count,
		},
		entities,
		profile_image_url,
		profile_banner_url,
		profile_display_url,
		profile_url,
	} = profile;

	const menuItems = [
		{
			name: "Tweet",
			href: `/${username}`,
		},
		{
			name: "Tweets & replies",
			href: `/${username}/with_replies`,
		},
		{
			name: "Media",
			href: `/${username}/media`,
		},
		{
			name: "Likes",
			href: `/${username}/likes`,
		}
	];

	return (
		<>
			<FeedHeader>
				<DisplayName name={name} onHeader verified={verified} />
				<div className={styles.profile__feed__meta}>
					{short(tweet_count)} Tweets
				</div>
			</FeedHeader>
			<div className={styles.profile}>
				<div className={styles.profile__wrapper}>
					<div className={styles.profile__photos__wrapper}>
						<div className={styles.profile__coverphoto__container}>
							<img src={profile_banner_url} alt="banner image" />
						</div>
						<div className={styles.profile__avatar__container}>
							<Avatar className={styles.profile__avatar} image={profile_image_url} />
						</div>
					</div>
					<div className={styles.profile__edit__wrapper}>
						{
							authUser?.username === username ?
								<Link to={EDIT_PROFILE} state={{ background: routeLocation }} className={styles.profile__edit} attributes={{
									title: "Edit Profile",
									"aira-label": "Edit Profile",
								}}>
									Edit Profile
								</Link> :
								<FriendshipContainer user={profile} />
						}
					</div>
					<div className={styles.profile__info__wrapper}>
						<div className={styles.profile__info}>
							<div className={styles.profile__name__wrapper}>
								<DisplayName name={name} verified={verified} className={styles.profile__displayName}>
									{name}
								</DisplayName>
								<Username name={username} />
							</div>
							{description && <BioContainer entities={entities?.description} bio={description} />}
							<div className={styles.profile__extra}>
								{location && <div className={styles.profile__extra__container}>
									<LocationOnRoundedIcon className={styles.icon} />
									<span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(twemoji.parse(location)) }}></span>
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
							<FollowInfo following={following_count} followers={followers_count} />
						</div>
					</div>
				</div>
			</div>
			<TweetMenuBarContainer menuItems={menuItems} />
			<Outlet />
		</>

	);
}


Profile.propTypes = {
	routeLocation: PropTypes.object,
	profile: PropTypes.object,
	authUser: PropTypes.object,
};


// export default React.memo(Profile, (prev, next) => prev.profile.id === next.profile.id);
export default Profile;
