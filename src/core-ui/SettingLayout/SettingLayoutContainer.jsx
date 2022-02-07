import React from "react";
import { useNavigate } from "react-router";

import SettingLayout from "core-ui/SettingLayout/SettingLayout";

function SettingLayoutContainer(props) {
	const navigate = useNavigate();
	React.useEffect(() => {
		navigate("/settings/account");
	}, []);

	return (
		<SettingLayout {...props} />
	);
}

export default SettingLayoutContainer;
