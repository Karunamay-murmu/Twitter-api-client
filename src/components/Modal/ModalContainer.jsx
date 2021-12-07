import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Modal from "components/Modal/Modal";

function ModalContainer(props) {
	const { isOpen } = useSelector(state => state.modal);
	const navigate = useNavigate();

	const onCloseModal = () => {
		isOpen && navigate(-1);
	};

	return (
		<Modal closeModal={onCloseModal} {...props} />
	);
}

export default ModalContainer;
