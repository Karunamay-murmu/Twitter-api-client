import React from "react";
import PropTypes from "prop-types";

import Media from "components/Media/Media";

function MediaContainer({ media, ...props }) {

	const imageGrid = () => {
		const style = {
			display: "grid",
			gridTemplateColumns: "repeat(2, 1fr)",
			gridTemplateRows: `repeat(${Math.floor(media.length / 2)}, 283.5px)`,
			gridGap: "3px"
		};
		if (media) {
			switch (media.length) {
				case 1: {
					const { width, height } = media[0];
					if (width > height) {
						style.gridTemplateColumns = "repeat(1, 1fr)";
						style.gridTemplateRows = "repeat(1, 1fr)";
					}
					return {
						display: "flex",
						width: "100%",
						height: "auto",
					};
				}
				case 2:
					style.gridTemplateAreas = `
"image_1 image_2"
`;
					break;
				case 3:
					style.gridTemplateRows = "repeat(2, 157.63px)";
					style.gridTemplateAreas = `
"image_1 image_2"
"image_1 image_3"
`;
					break;
				case 4:
					style.gridTemplateRows = "repeat(2, 157.63px)";
					style.gridTemplateAreas = `
"image_1 image_2"
"image_3 image_4"
`;
					break;
				default:
					break;
			}
			return style;
		}
	};
	return <Media {...props} media={media} gridStyle={imageGrid} />;
}

MediaContainer.propTypes = {
	media: PropTypes.arrayOf(PropTypes.object),
};

export default MediaContainer;
