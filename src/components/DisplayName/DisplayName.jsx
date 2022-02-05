import React from "react";
import PropTypes from "prop-types";
import twemoji from "twemoji";
import DOMPurify from "dompurify";


import Verified from "components/Verified/Verified.jsx";

import styles from "./displayName.module.css";

function DisplayName({ name, verified, className, onHeader }) {
	const node = twemoji.parse(name);
	return (
		<div className={`${styles.name__wrapper} ${className} ${onHeader ? styles.header : ""}`}>
			<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.trim()) }} className={styles.name}></div>
			{verified &&
				<span>
					<Verified />
				</span>
			}
		</div>
	);
}

DisplayName.propTypes = {
	name: PropTypes.string,
	verified: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
	onHeader: PropTypes.bool,
};

DisplayName.defaultProps = {
	name: "DISPLAY NAME",
	verified: false,
	onHeader: false,
	className: ""
};

export default DisplayName;
