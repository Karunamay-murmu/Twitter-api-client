import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default (WrappedComponent) => {
	const hocComponent = ({ ...props }) => {
		const location = useLocation();
		const query = queryString.parse(location.search);
		const { oauth_token = "", oauth_verifier = "" } = query;
		console.log(query);
		return <WrappedComponent {...props} oauth_token={oauth_token} oauth_verifier={oauth_verifier} />;
	};

	hocComponent.propTypes = {};

	return hocComponent;
};
