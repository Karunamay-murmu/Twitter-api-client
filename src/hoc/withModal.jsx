import React from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { openModal, closeModal } from "redux/slice/modalSlice";

function withModal(WrappedComponent) {
	function NewComponent() {
		const { isOpen } = useSelector(state => state.modal);
		const dispatch = useDispatch();
		const location = useLocation();

		React.useEffect(() => {
			if (!isOpen) {
				dispatch(openModal({ id: 1, location: location.pathname }));
			}
			return () => {
				dispatch(closeModal());
			};
		}, []);

		return <WrappedComponent />;
	}
	NewComponent.displayName = "NewComponent";
	return NewComponent;
}

export default withModal;
