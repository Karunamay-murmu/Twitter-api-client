import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import { openModal } from "redux/slice/modalSlice";

function withModal(WrappedComponent) {
	function NewComponent() {

		const dispatch = useDispatch();
		const location = useLocation();
		const id = location.state.modalId;

		useEffect(() => {
			dispatch(openModal({ id, location: location.pathname }));
		}, []);

		return <WrappedComponent />;
	}
	NewComponent.displayName = "NewComponent";
	return NewComponent;
}

export default withModal;
