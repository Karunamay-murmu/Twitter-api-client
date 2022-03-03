import React from "react";
import PropTypes from "prop-types";

import styles from "./Media.module.css";

function Media({ media, gridStyle }) {
	return (
		<div className={`${media.length ? styles.post__media__wrapper : ""}`} style={gridStyle()}>
			{
				media?.map((media, index) => {
					return (
						<React.Fragment key={index}>
							{media.type === "photo" && <div className={styles.post__media} style={{ gridArea: `image_${index + 1}` }}>
								<img className={styles.post__image} src={media?.media_url_https ?? media?.url} />
							</div>}
							{media.type === "video" && <div className={styles.post__media} >
								<video style={{ backgroundColor: "#000" }} width="100%" height={`${media?.video_info?.aspect_ratio[0] < media?.video_info?.aspect_ratio[1] ? "500px" : "100%"}`} poster={media.media_url_https} autoPlay controls muted>
									{media?.video_info?.variants?.map((variant, idx) =>
										variant?.content_type === "video/mp4" && <source key={idx} src={variant?.url} type={variant?.content_type} />
									)}
								</video>
							</div>}
						</React.Fragment>
					);
				})
			}
		</div>
	);
}

Media.propTypes = {
	mediaCount: PropTypes.number,
	media: PropTypes.array,
	gridStyle: PropTypes.func,
};

export default Media;
