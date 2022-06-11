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
import DiscoverModal from "./Modals/DiscoverModal";

function Modals(props) {
	return (
		<>
			<DiscoverModal
				following={props.following}
				users={props.users}
				follow={props.follow}
				unFollow={props.unFollow}
				yourUsername={props.username}
				dropDownSetUserData={props.dropDownSetUserData}
			/>
			<SearchModal users={props.users} yourUsername={props.username} />
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
				setOptionsEdit={props.setOptionsEdit}
			/>
			<LikesModal
				users={props.users}
				follow={props.follow}
				unFollow={props.unFollow}
				following={props.following}
				likes={props.likesForLikesModal}
				dropDownSetUserData={props.dropDownSetUserData}
				setLikesModalInfo={props.setLikesModalInfo}
				likesModalInfo={props.likesModalInfo}
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
				yourUsername={props.username}
				likesModalSetLikes={props.likesModalSetLikes}
				likeComment={props.likeComment}
				removeComment={props.removeComment}
				likePicture={props.likePicture}
				addComment={props.addComment}
				commModalSetPostId={props.commModalSetPostId}
			/>
			<ShareModal yourUsername={props.username} firestoreDocId={props.firestoreDocId} users={props.users} />
			<NotificationModal
				notifications={props.notifications}
				following={props.following}
				username={props.username}
				follow={props.follow}
				unFollow={props.unFollow}
				users={props.users}
			/>
			<AddPostModal
				setPosts={props.setPosts}
				posts={props.posts}
				postIdOptionsModal={props.postIdOptionsModal}
				setOptionsEdit={props.setOptionsEdit}
				optionsEdit={props.optionsEdit}
				yourUsername={props.username}
				addPost={props.addPost}
				firestoreDocId={props.firestoreDocId}
				avatar={props.avatar}
				updateUsers={props.updateUsers}
			/>
		</>
	);
}

function closeModal(modal) {
	return CloseModalIcon(modal);
}

export default Modals;
export { closeModal };
