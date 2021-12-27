import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import { v4 as uuid } from "uuid";

import Profile from "core-ui/Profile/Profile.jsx";
// import { openModal } from "redux/slice/modalSlice";
import useFetch from "hooks/useFetch";

function ProfileContainer(props) {
	const { isOpen } = useSelector(state => state.modal);
	const location = useLocation();
	const params = useParams();

	const [api, doFetch] = useFetch();

	console.log(api);

	useEffect(() => {
		doFetch("user_by_username", params.username);
	}, [params.username]);

	const normalizeData = useMemo(() => {

		if (!api.data) {
			return;
		}

		const profile = api.data;
		let { entities, description } = profile;

		entities.description.urls.forEach(url => {
			const start = url.start;
			const end = url.end;
			const replacedText = description.slice(start, end);
			description = description.replace(replacedText, `<a href="${url.url}" target="_blank" rel="noopener noreferrer">${url.display_url}</a>`);
		});

		return {
			...profile,
			description,
		};

	}, [api.data]);

	return (
		<>
			{!api.data ? <div>Loading</div>

				:
				<Profile profile={normalizeData} routeLocation={location} isModalOpen={isOpen} {...props} />
			}
		</>
	);
}

export default ProfileContainer;
