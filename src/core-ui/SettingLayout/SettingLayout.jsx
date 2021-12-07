import React from "react";
import { Outlet } from "react-router";

import FeedHeader from "components/FeedHeader/FeedHeader.jsx";
import Link from "components/Link/Link.jsx";
import {
	ACCOUNT_ROUTE,
	SECURITY_AND_ACCOUNT_ACCESS_ROUTE,
	PRIVACY_AND_SAFETY_ROUTE,
	NOTIFICATIONS_ROUTE,
	ACCESSIBILITY_DISPLAY_AND_LANGUAGE_ROUTE,
	ADDITIONAL_RESOURCES_ROUTE
} from "routes/routes";

import styles from "./SettingLayout.module.css";

function SettingLayout() {
	return (
		<section className={styles.setting__wrapper}>
			<section className={styles.setting__navigation}>
				<FeedHeader backbtn={false}>
					<h3>Settings</h3>
				</FeedHeader>
				<div className={styles.setting__body}>
					<ul className={styles.setting__link__wrapper}>
						<li className={styles.setting__link__itel}>
							<Link to={ACCOUNT_ROUTE} title="Your account" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to={SECURITY_AND_ACCOUNT_ACCESS_ROUTE} title="Security and account access" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to={PRIVACY_AND_SAFETY_ROUTE} title="Privacy and safety" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to={NOTIFICATIONS_ROUTE} title="Notifications" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to={ACCESSIBILITY_DISPLAY_AND_LANGUAGE_ROUTE} title="Accessibility, display, and languages" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to={ADDITIONAL_RESOURCES_ROUTE} title="Additional resources" />
						</li>
					</ul>
				</div>
			</section>
			<div className={styles.setting__detail}>
				<Outlet />
			</div>
		</section>
	);
}

export default SettingLayout;
