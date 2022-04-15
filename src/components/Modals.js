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
import AddPostModal from "./Modals/AddPostModal";

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
				removePost={props.removePost}
				postIdOptionsModal={props.postIdOptionsModal}
				commModalSetPostId={props.commModalSetPostId}
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
				setpostIdOptionsModal={props.setpostIdOptionsModal}
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
			<AddPostModal yourUsername={props.username} addPost={props.addPost} firestoreDocId={props.firestoreDocId} />
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
