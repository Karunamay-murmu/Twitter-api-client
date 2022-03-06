import React from "react";

import ProfileButton from "components/ProfileButton/ProfileButton.jsx";

function ProfileButtonContainer(props) {
	return <ProfileButton {...props} />;
}

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
