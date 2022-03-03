import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MainLayout from "core-ui/MainLayout/MainLayout";
import { selectMessages } from "redux/slice/messageSlice";

function MainLayoutContainer({ isAuthenticated, ...props }) {
	const navigate = useNavigate();
	const messages = useSelector(state => selectMessages(state));
	const messageList = Object.values(messages);

	useEffect(() => {
		if (!isAuthenticated) {
			return navigate("login", { replace: true });
		}
	}, []);
	return <MainLayout messageList={messageList} {...props} />;
}

MainLayoutContainer.propTypes = {
	isAuthenticated: PropTypes.bool
};

export default MainLayoutContainer;