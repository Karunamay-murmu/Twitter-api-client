import React from "react";
import PropTypes from "prop-types";

import OptionsCardContainer from "components/OptionCard/OptionCardContainer";

function TweetOptions({ options, ...props }) {
	return (
		<OptionsCardContainer options={options} {...props} />
	);
}

TweetOptions.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TweetOptions;