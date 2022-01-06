import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import Profile from "core-ui/Profile/Profile.jsx";
import Spinner from "components/Spinner/Spinner";

function ProfileContainer(props) {
	const location = useLocation();
	const user = props.user;

	const normalizeData = useMemo(() => {

		if (!user) {
			return;
		}

		const profile = user;
		let { entities, description, url, created_at } = profile;

		let expand_profile = {};

		for (const value of Object.values(entities.url)) {
			if (value.length) {
				value.forEach(value => {
					expand_profile = {
						profile_display_url: value.display_url,
						profile_url: value.url,
						profile_expanded_url: value.expanded_url,
					};
				});
			}
		}

		const date = new Date(created_at);
		const year = date.getFullYear();
		const month = date.toLocaleDateString("default", { month: "long" });

		return {
			...profile,
			...expand_profile,
			description,
			entities,
			url,
			created_at: `${month} ${year}`,

		};

	}, [user]);

	return (
		<>
			{!user ? <div>
				<Spinner />
			</div>

				:
				<Profile profile={normalizeData} routeLocation={location} {...props} />
			}
		</>
	);
}

ProfileContainer.propTypes = {
	user: PropTypes.object,
};


export default React.memo(ProfileContainer, (prev, next) => {
	return prev.user === next.user;
});
