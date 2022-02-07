import React from "react";
import PropTypes from "prop-types";

import FeedHeader from "components/FeedHeader/FeedHeader";

import styles from "./SettingDetail.module.css";

function SettingDetail({ backbtn, desc, header, children }) {
	return (
		<div className={styles.setting__wrapper}>
			<FeedHeader backbtn={backbtn}>
				<h3>{header}</h3>
			</FeedHeader>
			<div className={styles.setting__desc}>
				<span>
					{desc}
				</span>
			</div>
			<div className={styles.setting__link__wrapper}>
				{children}
			</div>
		</div>
	);
}

SettingDetail.propTypes = {
	desc: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	backbtn: PropTypes.bool,
};

export default SettingDetail;
