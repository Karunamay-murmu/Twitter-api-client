import React from "react";
import PropTypes from "prop-types";

import { short } from "utils/number";

import styles from "./Media.module.css";

function Media({ media, gridStyle }) {
	return (
		media && <div className={`${media.length ? styles.post__media__wrapper : ""}`} style={gridStyle()}>
			{
				media?.map((media, index) => {
					const views = media?.public_metrics?.view_count;
					return (<div key={index} className={styles.post__media} style={{ gridArea: `image_${index + 1}` }}>
						<img className={styles.post__image} src={media.url ?? media.preview_image_url} width={`${media.width}px`} height={`${media.height}px`} />
						{media.type === "video" && <span className={styles.post__image__metrics}>{short(views)} views</span>}
					</div>);
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
