import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import styles from "./FeedHeader.module.css";

function FeedHeader({ backbtn = true, meta, title, children }) {

	const [back, setBack] = useState(false);
	const navigate = useNavigate();
	
	const goBack = () => setBack(true);

	useEffect(() => {
		if (back) {
			navigate(-1);
		}
	}, [back]);

	return (
		<header className={styles.feed__header}>
			<div className={styles.feed__header__wrapper}>
				{backbtn &&
					<div className={styles.feed__back} onClick={goBack}>
						<ArrowBackOutlinedIcon className={styles.feed__back__icon} />
					</div>}
				<div className={styles.feed__info}>
					{children ||
						<>
							<div className={styles.feed__title} >{title}</div>
							<div className={styles.feed__meta} >{meta}</div>
						</>
					}
				</div>
			</div>
		</header>
	);
}

FeedHeader.propTypes = {
	meta: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.node,
	backbtn: PropTypes.bool,

};

export default FeedHeader;
