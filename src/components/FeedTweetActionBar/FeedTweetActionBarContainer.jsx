import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import FeedTweetActionBar from "components/FeedTweetActionBar/FeedTweetActionBar.jsx";
import { openModal } from "redux/slice/modalSlice";

function FeedTweetActionBarContainer({ tweetId, ...props }) {
	const { modalId, isOpen } = useSelector(state => state.modal);
	const dispatch = useDispatch();

	const handleModalOpen = () => {
		if (!isOpen) {
			dispatch(openModal({ id: tweetId }));
		}
	};

	return (
		<FeedTweetActionBar isModalOpen={isOpen} modalId={modalId} tweetId={tweetId} handleModalOpen={handleModalOpen} {...props} />
	);
}

FeedTweetActionBarContainer.propTypes = {
	tweetId: PropTypes.string.isRequired,
};

export default FeedTweetActionBarContainer;
