import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import styles from "./Message.module.css";

function Message({ message, barWidth, closeMessage, pauseRemoveMessageTimer, playRemoveMessageTimer }) {
	return ReactDOM.createPortal(
		<div className={styles.message} onMouseEnter={pauseRemoveMessageTimer} onMouseLeave={playRemoveMessageTimer}>
			<div className={styles.message__wrapper}>
				<div className={styles.message__text}>{message.message}</div>
				<div className={styles.message__close__wrapper} onClick={() => closeMessage(message.id)}>
					<CloseRoundedIcon className={styles.message__close} />
				</div>
			</div>
			<div className={styles.message__bar} style={{ width: `${barWidth}%` }}></div>
		</div>,
		document.getElementById("message")
	);
}

Message.propTypes = {
	messages: PropTypes.array,
	barWidth: PropTypes.number,
	closeMessage: PropTypes.func,
	pauseRemoveMessageTimer: PropTypes.func,
	playRemoveMessageTimer: PropTypes.func
};

export default Message;