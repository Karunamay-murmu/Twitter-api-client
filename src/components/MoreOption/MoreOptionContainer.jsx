import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import MoreOption from "components/MoreOption/MoreOption";
import { open, close } from "redux/slice/moreSlice";

function MoreOptionContainer(props) {
	const [cardId,] = useState(uuid());
	const dispatch = useDispatch();
	const { currentCardId, isOpen } = useSelector((state) => state.more);

	const showCardOptions = (e) => {
		e.stopPropagation();
		const openCardId = e.target.dataset.cardId;
		(!isOpen || openCardId !== currentCardId) ? dispatch(open({ id: openCardId })) : dispatch(close());
	};

	return (
		<MoreOption cardOpen={isOpen} cardId={cardId} currentCardId={currentCardId} showCard={showCardOptions} {...props} />
	);
}

export default MoreOptionContainer;
