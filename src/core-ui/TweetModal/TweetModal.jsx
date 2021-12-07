import React from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import ModalContainer from "components/Modal/ModalContainer";
import TweetContainer from "core-ui/Tweet/TweetContainer";
import { openModal, closeModal } from "redux/slice/modalSlice";


function TweetModal() {
	const { isOpen } = useSelector(state => state.modal);
	const dispatch = useDispatch();
	const location = useLocation();

	console.log(location);

	React.useEffect(() => {
		if (!isOpen) {
			dispatch(openModal({ id: location.state.tweetId, location: location.pathname }));
		}
		return () => {
			dispatch(closeModal());
		};
	}, []);

	return (
		<ModalContainer emptyHeaderBtn emptyHeaderText>
			<TweetContainer inputPlaceholder="Tweet your reply" inputRow="5" />
		</ModalContainer>
	);
}


export default TweetModal;
