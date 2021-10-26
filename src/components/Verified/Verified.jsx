import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

import styles from "./verified.module.css";

function Verified() {
	return (
		<div className={styles.verified__wrapper}>
			<VerifiedIcon className={styles.verified__icon} />
		</div>
	);
}

export default Verified;
