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
				follow={props.follow}
				unFollow={props.unFollow}
			/>
			<SearchModal />
			<SignUpModal />
			<SignInModal />
			<OptionsModal
				follow={props.follow}
				unFollow={props.unFollow}
				removePost={props.removePost}
			/>
			<LikesModal
				follow={props.follow}
				unFollow={props.unFollow}												
			/>
			<CommentsModal
				follow={props.follow}
				unFollow={props.unFollow}												
				likeComment={props.likeComment}
				removeComment={props.removeComment}
				likePicture={props.likePicture}
				addComment={props.addComment}
			/>
			<ShareModal />
			<NotificationModal
				follow={props.follow}
				unFollow={props.unFollow}
			/>
			<AddPostModal												
				addPost={props.addPost}
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
