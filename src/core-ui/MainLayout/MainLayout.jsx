import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

import SidebarContainer from "core-ui/Sidebar/SidebarContainer.jsx";

import styles from "./MainLayout.module.css";
import MessageContainer from "components/Message/MessageContainer";

function MainLayout({ authUser, messageList }) {
	return (
		authUser ?
			<div className={styles.main}>
				<header className={styles.main__header}>
					<SidebarContainer />
				</header>
				<main className={styles.main__content}>
					<Outlet />
				</main>
				{messageList.length > 0 && (
					messageList.map(message => (
						<MessageContainer key={message.id} message={message} />
					))
				)}
			</div> :
			null
	);
}

MainLayout.propTypes = {
	authUser: PropTypes.object,
	messageList: PropTypes.array
};

export default MainLayout;
