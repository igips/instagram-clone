import React from "react";
import "../styles/Modals.css";
import LikesModal from "./Modals/LikesModal";
import OptionsModal from "./Modals/OptionsModal";
import CommentsModal from "./Modals/CommentsModal";
import NotificationModal from "./Modals/NotificationModal";
import SearchModal from "./Modals/SearchModal";
import ShareModal from "./Modals/ShareModal";
import SignUpModal from "./Modals/SignUpModal";
import SignInModal from "./Modals/SignInModal";
import { CloseModalIcon } from "./Icons/CloseIcon";

function Modals(props) {
	return (
		<>
			<SearchModal />
			<SignUpModal />
			<SignInModal />
			<OptionsModal
				follow={props.follow}
				unFollow={props.unFollow}
				following={props.following}
				userData={props.userDataOptionsModal}
			/>
			<LikesModal
				users={props.users}
				follow={props.follow}
				unFollow={props.unFollow}
				following={props.following}
				likes={props.likesForLikesModal}
				dropDownSetUserData={props.dropDownSetUserData}
			/>
			<CommentsModal
				users={props.users}
				follow={props.follow}
				unFollow={props.unFollow}
				following={props.following}
				dropDownSetUserData={props.dropDownSetUserData}
				optionsModalSetUserData={props.optionsModalSetUserData}
				posts={props.posts}
				commModalPostId={props.commModalPostId}
				signedIn={props.signedIn}
				yourUsername={props.username}
				likesModalSetLikes={props.likesModalSetLikes}
				likeComment={props.likeComment}
				removeComment={props.removeComment}
				likePicture={props.likePicture}
				addComment={props.addComment}
			/>
			<ShareModal />
			<NotificationModal
				notifications={props.notifications}
				following={props.following}
				username={props.username}
				follow={props.follow}
				unFollow={props.unFollow}
			/>
		</>
	);
}

function closeModal(modal) {
	return (
		CloseModalIcon(modal)	
	);
}

export default Modals;
export { closeModal };
