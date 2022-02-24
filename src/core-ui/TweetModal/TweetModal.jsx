import React from "react";

import ModalContainer from "components/Modal/ModalContainer";
import TweetContainer from "core-ui/Tweet/TweetContainer";
import withModal from "hoc/withModal";

function TweetModal() {
	return (
		<ModalContainer emptyHeaderBtn emptyHeaderText>
			<TweetContainer inputPlaceholder="Tweet your reply" inputRow="5" />
		</ModalContainer>
	);
}


export default withModal(TweetModal);
