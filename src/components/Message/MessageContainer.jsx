import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Message from "components/Message/Message";
import { removeMessage } from "redux/slice/messageSlice";

function MessageContainer({ message }) {
	const [width, setWidth] = useState(0);
	const [intervalId, setIntervalId] = useState(null);
	const [pauseTimer, setPauseTimer] = useState(false);

	const dispatch = useDispatch();

	const handleRemoveMessage = (id) => {
		dispatch(removeMessage(id));
	};

	useEffect(() => {
		const id = setInterval(() => {
			if (!pauseTimer) {
				setWidth(prev => {
					if (width < 100)
						return prev + .5;
					return prev;
				});
			}
		}, 20);
		!intervalId && setIntervalId(id);
		return () => clearInterval(id);
	}, [pauseTimer]);

	const pauseRemoveMessageTimer = () => {
		setPauseTimer(true);
	};

	const playRemoveMessageTimer = () => {
		setPauseTimer(false);
	};

	useEffect(() => {
		if (width === 100) {
			handleRemoveMessage(message.id);
		}
	}, [width]);

	return (
		<Message
			barWidth={width}
			closeMessage={handleRemoveMessage}
			pauseRemoveMessageTimer={pauseRemoveMessageTimer}
			playRemoveMessageTimer={playRemoveMessageTimer}
			message={message}
		/>
	);
}

MessageContainer.propTypes = {
	message: PropTypes.object
};

export default MessageContainer;