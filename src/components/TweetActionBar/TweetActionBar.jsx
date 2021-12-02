import React from "react";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";


function TweetActionBar() {
	return (
		<div>
			<div>
				<ChatBubbleOutlineRoundedIcon />
			</div>
			<div>
				<AutorenewRoundedIcon />
			</div>
			<div>
				<FavoriteBorderRoundedIcon />
			</div>
			<div>
				<FileUploadOutlinedIcon />
			</div>
		</div>
	);
}

export default TweetActionBar;
