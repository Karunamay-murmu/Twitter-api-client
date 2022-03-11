import React from "react";
import { Outlet } from "react-router";

import FeedHeader from "components/FeedHeader/FeedHeader.jsx";
import Link from "components/Link/Link.jsx";
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
							<Link to="/settings/account" title="Your account" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to="/settings/security_and_account_access" title="Security and account access" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to="/settings/privacy_and_safety" title="Privacy and safety" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to="/settings/notifications" title="Notifications" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to="/settings/accessibility_display_and_language" title="Accessibility, display, and languages" />
						</li>
						<li className={styles.setting__link__itel}>
							<Link to="/settings/additional_resources" title="Additional resources" />
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
