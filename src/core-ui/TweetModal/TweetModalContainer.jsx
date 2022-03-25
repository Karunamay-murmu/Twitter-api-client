import React from "react";

import TweetModal from "core-ui/TweetModal/TweetModal";
import withModal from "hoc/withModal";

function TweetModalContainer() {

	return <TweetModal />;
}

export default withModal(TweetModalContainer);