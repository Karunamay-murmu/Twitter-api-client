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
	status: PropTypes.bool,
	actionType: PropTypes.object
};

export default TweetOptions;