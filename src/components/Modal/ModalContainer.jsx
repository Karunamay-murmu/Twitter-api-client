import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import Modal from "components/Modal/Modal";
import { closeModal } from "redux/slice/modalSlice";

function ModalContainer(props) {

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const id = location.state.modalId;

	const onCloseModal = () => {
		dispatch(closeModal({ id }));
		navigate(-1);
	};

	return (
		<Modal closeModal={onCloseModal} {...props} />
	);
}

export default ModalContainer;
