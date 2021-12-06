import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "redux/slice/modalSlice";

import Modal from "components/Modal/Modal";

function ModalContainer(props) {
	const { isOpen } = useSelector(state => state.modal);
	const dispatch = useDispatch();

	const onCloseModal = () => {
		if (isOpen) {
			dispatch(closeModal());
		}
	};

	return (
		<Modal closeModal={onCloseModal} {...props} />
	);
}

export default ModalContainer;
