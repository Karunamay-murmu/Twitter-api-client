import React from "react";
import { useSelector } from "react-redux";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";

import Sidebar from "core-ui/Sidebar/Sidebar.jsx";
import { selectAuthUser } from "redux/slice/authSlice";
import { SETTINGS_ROUTE } from "routes/routes";

const SidebarContainer = () => {
	const [open, setOpen] = React.useState(false);
	const authUser = useSelector(state => selectAuthUser(state));

	const options = [
		{
			"text": "Topics",
			"Icon": TopicOutlinedIcon,
		}, {
			"text": "Moments",
			"Icon": OfflineBoltOutlinedIcon,
		}, {
			"text": "Settings and privacy",
			"Icon": SettingsOutlinedIcon,
			"href": SETTINGS_ROUTE,
		}, {
			"text": "Help Center",
			"Icon": HelpOutlineOutlinedIcon,
		}
	];

	// const authUserOptions = useMemo(() => [
	// 	{
	// 		"text": "Topics",
	// 		"Icon": TopicOutlinedIcon,
	// 	}, {
	// 		"text": "Moments",
	// 		"Icon": OfflineBoltOutlinedIcon,
	// 	}, {
	// 		"text": "Settings and privacy",
	// 		"Icon": SettingsOutlinedIcon,
	// 		"href": SETTINGS_ROUTE,
	// 	}, {
	// 		"text": "Help Center",
	// 		"Icon": HelpOutlineOutlinedIcon,
	// 	}
	// ])

	const showCard = () => setOpen(prev => !prev);
	return (
		<Sidebar
			options={options}
			showCard={showCard}
			showMoreOption={open}
			user={authUser}
		/>
	);
};

export default SidebarContainer;