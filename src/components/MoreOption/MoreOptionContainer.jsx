import React from "react";

import MoreOption from "components/MoreOption/MoreOption";

function MoreOptionContainer(props) {
	const [cardOpen, setCardOpen] = React.useState(false);
	const showCardOptions = () => setCardOpen(prev => !prev);

	return (
		<MoreOption cardOpen={cardOpen} showCard={showCardOptions} {...props}/>
	);
}

export default MoreOptionContainer;
