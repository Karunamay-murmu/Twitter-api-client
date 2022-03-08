import React, { useMemo } from "react";
import PropTypes from "prop-types";

import ProfileButton from "components/ProfileButton/ProfileButton.jsx";

function ProfileButtonContainer({ user, ...props }) {
	const isFollowing = useMemo(() => {
		return user?.connections?.includes("following");
	}, [user?.connections]);

	return <ProfileButton user={user} isFollowing={isFollowing} {...props} />;
}

ProfileButtonContainer.propTypes = {
	user: PropTypes.object
};

export default ProfileButtonContainer;

// class ProfileButtonContainer extends React.PureComponent {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			showCard: false
// 		};
// 		this.onShowProfileCard = this.onShowProfileCard.bind(this);
// 	}

// 	onShowProfileCard(e) {
// 		e.stopPropagation();
// 		this.setState(prevState => ({ showCard: !prevState.showCard }));
// 	}

// 	render() {
// 		return (
// 			<ProfileButton {...this.props} showCard={this.state.showCard} onShowProfileCard={this.onShowProfileCard} />
// 		);
// 	}
// }

// export default ProfileButtonContainer;
