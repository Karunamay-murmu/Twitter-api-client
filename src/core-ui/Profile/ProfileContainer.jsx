import React, { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

import Profile from "core-ui/Profile/Profile.jsx";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";

function ProfileContainer(props) {
	const location = useLocation();
	const params = useParams();

	const [api, doFetch] = useFetch();

	console.log(api);

	useEffect(() => {
		doFetch(endpoints.getUserByUsername(params.username));
	}, [params.username]);



	const normalizeData = useMemo(() => {

		if (!api.data) {
			return;
		}

		const profile = api.data;
		let { entities, description, url } = profile;

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

		return {
			...profile,
			...expand_profile,
			description,
			entities,
			url,

		};

	}, [api.data]);

	return (
		<>
			{!api.data ? <div>Loading</div>

				:
				<Profile profile={normalizeData} routeLocation={location} {...props} />
			}
		</>
	);
}


export default ProfileContainer;
