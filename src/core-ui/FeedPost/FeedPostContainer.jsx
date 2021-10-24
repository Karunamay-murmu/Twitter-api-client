import React, { useRef, useState, useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Post from "core-ui/FeedPost/FeedPost.jsx";

function FeedPostContainer() {
	const [open, setOpen] = useState(false);
	const optionsCard = useRef(null);
	const options = [{
		"text": "Unfollow Animae & manga",
		"Icon": ErrorOutlineIcon,
		"tag": "p"
	}];

	useEffect(() => {
		open && (optionsCard.current.style.display = "initial") || (optionsCard.current.style.display = "none");
	}, [open]);

	const showOptions = () => setOpen(prev => !prev);

	return (
		<Post
			options={options ?? null}
			showOptions={showOptions}
			ref={optionsCard}
			showOptionsActive={open}
		/>
	);
}

export default FeedPostContainer;
