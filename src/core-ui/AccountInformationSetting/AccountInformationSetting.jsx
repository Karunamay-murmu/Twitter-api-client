import React from "react";
import PropTypes from "prop-types";

import Link from "components/Link/Link";
import SettingDetailContainer from "core-ui/SettingDetail/SettingDetailContainer";

import styles from "./AccountInformationSetting.module.css";

function AccountInformationSetting() {
	return (
		<SettingDetailContainer
			backbtn
			header="Account Information"
		>
			<Link to="/settings/screen_name" title="Username" info="@KarunamayMurmu" />
			<Link to="/settings/phone" title="Phone" info="+91-8926-5625-2221" />
			<Link to="/settings/email" title="Email" info="Email@email.com" />
			<Link to="/settings/verified" title="Verified" info="No" />
			<hr className={styles.devider} />
			<Link to="/settings/audience_and_tagging" title="Protected Tweets" info="No" />
			<Link to="/settings/audience_and_tagging" title="Account creation" info="Jun 17, 2017, 8:07:52 AM" />
			<hr className={styles.devider} />
			<Link to="/settings/country" title="Country" info="India" />
			<Link to="/settings/languages" title="Languages" info="English" />
			<Link to="/settings/gender" title="Gender" info="Male" />
		</SettingDetailContainer>
	);
}

AccountInformationSetting.propTypes = {
	user: PropTypes.object.isRequired,
};

// AccountInformationSetting.defaultProps = {
// 	user: {},
// };


export default AccountInformationSetting;
