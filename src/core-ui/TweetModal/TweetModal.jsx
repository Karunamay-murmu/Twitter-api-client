import React from "react";

import ModalContainer from "components/Modal/ModalContainer";
import TweetContainer from "core-ui/Tweet/TweetContainer";

import styles from "./TweetModal.module.css";

function TweetModal() {
	return (
		<ModalContainer emptyHeaderBtn emptyHeaderText className={styles.modal}>
			<TweetContainer inputPlaceholder="Tweet your reply" inputRow="5" />
		</ModalContainer>
	);
}


export default TweetModal;
