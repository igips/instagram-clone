import { useEffect, useState } from "react";
import { shareIcon } from "../Icons/ShareIcon";
import { closeModal } from "../Modals";
import testPic from "../../img/test-img.jpg";
import { CloseIcon } from "../Icons/CloseIcon";
import {
	PictureCardHeader,
	PictureCardIconsSection,
	PictureCardNumOfLikesSection,
	AddCommentSection,
} from "../PictureCard";
import { dropDown, hideDropDown } from "../DropDown";
import { getUserDataFromUsersArray, getPostDataFromPostsArray } from "../Home";
import uniqid from "uniqid";
import ava from "../../img/ava.jpeg";
import ReactTimeAgo from "react-time-ago";
import { showLikesModal } from "./LikesModal";
import { likeCommentIcon, likeCommentIconClicked } from "../Icons/LikeIcon";

function CommentsModal(props) {
	const [postData, setPostData] = useState({
		username: "",
		avatar: ava,
		comments: [],
		description: "",
		id: "",
		likes: { num: 0, users: [] },
		pic: {src: ""},
		date: new Date(),
	});

	useEffect(() => {
		if (props.commModalPostId) {
			setPostData(getPostDataFromPostsArray(props.posts, props.commModalPostId));
		}
	}, [props.commModalPostId]);

	useEffect(() => {
		if (props.commModalPostId) {
			setPostData(getPostDataFromPostsArray(props.posts, props.commModalPostId));
		}
	}, [props.posts]);

	useEffect(() => {
		const commentsModal = document.getElementById("comments-modal");

		commentsModal.addEventListener("click", (e) => {
			if (e.target === commentsModal) {
				hideCommentsModal();
			}
		});
	}, []);


	return (
		<div id="comments-modal" className="modal">
			<div onClick={() => hideCommentsModal()} id="comments-modal-close">
				{CloseIcon()}
			</div>
			<div id="comments-modal-content">
				<div id="comments-div-img">
					<img src={postData.pic.src} alt="" />
				</div>
				<div id="comments-div-modal">
					<div id="comms-modal-header-mobile">
						{closeModal(hideCommentsModal)}
						<span>Comments</span>
						{shareIcon()}
					</div>
					<div id="comments-modal-header-section">
						<PictureCardHeader
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={postData.username}
							avatar={postData.avatar}
							dropDownSetUserData={props.dropDownSetUserData}
							optionsModalSetUserData={props.optionsModalSetUserData}
							setpostIdOptionsModal={props.setpostIdOptionsModal}
							postId={postData.id}
						/>
					</div>
					<div id="modal-comments-section">
						<Comments
							comments={postData.comments}
							signedIn={props.signedIn}
							yourUsername={props.yourUsername}
							description={postData.description}
							users={props.users}
							username={postData.username}
							dropDownSetUserData={props.dropDownSetUserData}
							avatar={postData.avatar}
							likesModalSetLikes={props.likesModalSetLikes}
							postId={postData.id}
							likeComment={props.likeComment}
							removeComment={props.removeComment}
							date={postData.date}
						/>
					</div>
					<section id="icons-in-comments-section-modal" className="icons-in-comments-section">
						<PictureCardIconsSection
							yourUsername={props.yourUsername}
							postId={postData.id}
							likePicture={props.likePicture}
							likes={postData.likes}
							modal="modal"
						/>
					</section>
					<section id="number-of-likes-section-modal" className="number-of-likes-section">
						<PictureCardNumOfLikesSection
							likes={postData.likes}
							likesModalSetLikes={props.likesModalSetLikes}
						/>
					</section>
					<div id="when-added-div-modal" className="added-div">
						<ReactTimeAgo date={postData.date} locale="en-US" />
					</div>
					<div id="div-for-comment-section-in-comment-modal">
						<AddCommentSection
							yourUsername={props.yourUsername}
							postId={postData.id}
							signedIn={props.signedIn}
							addComment={props.addComment}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function hideCommentsModal() {
	const modal = document.getElementById("comments-modal");
	window.history.back();
	modal.style.display = "none";
}

function Comments(props) {
	useEffect(() => {
		if (document.getElementById("comments-modal").style.display === "flex") {
			const div = document.getElementById("modal-comments-section");
			div.scrollTop = div.scrollHeight;
		}
	}, [props.comments.length]);

	function showLikes(comment) {
		if (comment.likes.num === 0) {
			return "";
		} else if (comment.likes.num === 1) {
			return "1 like";
		} else {
			return comment.likes.num + " likes";
		}
	}

	function deleteComment(comment) {
		if (props.signedIn && comment.username === props.yourUsername) {
			return "Delete";
		}
	}

	function description() {
		if (props.description) {
			return (
				<div id="modal-first-comment">
					<span
						onMouseEnter={(e) => {
							dropDown(
								getUserDataFromUsersArray(props.users, props.username),
								props.dropDownSetUserData,
								e,
								"avaPic"
							);
						}}
						onMouseLeave={() => {
							hideDropDown();
						}}
						className="avatar-span-comments"
					>
						<img
							id="comments-modal-description-avatar"
							alt=""
							className="card-avatar-img"
							data-testid="user-avatar"
							draggable="false"
							src={props.avatar}
						/>
					</span>
					<div id="first-modal-comment-div" className="modal-comment-div">
						<div id="first-modal-comment-div-inner">
							<div className="name-span-modal" id="first-modal-comment-span">
								<span
									onMouseEnter={(e) => {
										dropDown(
											getUserDataFromUsersArray(props.users, props.username),
											props.dropDownSetUserData,
											e
										);
									}}
									onMouseLeave={() => {
										hideDropDown();
									}}
									className="first-modal-comment-span"
									id="description-comments-modal-username"
								>
									{props.username}
								</span>{" "}
								<span id="description-comments-modal-desc">{props.description}</span>
							</div>
							<div id="first-comment-when">
								<div id="short-when-added-and-likes-modal" className="short-when-added-and-likes">
									<ReactTimeAgo timeStyle="mini-minute-now" date={props.date} locale="en-US" />
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	return (
		<>
			{description()}
			<div id="container-for-comments-in-modal">
				{props.comments.map((comment) => {
					return (
						<div key={uniqid()} className="modal-comments">
							<span
								onMouseEnter={(e) => {
									dropDown(
										getUserDataFromUsersArray(props.users, comment.username),
										props.dropDownSetUserData,
										e,
										"avaPic"
									);
								}}
								onMouseLeave={() => {
									hideDropDown();
								}}
								className="avatar-span-comments"
							>
								<img
									alt=""
									className="card-avatar-img"
									data-testid="user-avatar"
									draggable="false"
									src={ava}
								/>
							</span>
							<div className="modal-comment-div">
								<div className="modal-comment-div-inner">
									<div className="name-span-modal">
										<span
											onMouseEnter={(e) => {
												dropDown(
													getUserDataFromUsersArray(props.users, comment.username),
													props.dropDownSetUserData,
													e
												);
											}}
											onMouseLeave={() => {
												hideDropDown();
											}}
											className="first-modal-comment-span"
										>
											{comment.username}
										</span>{" "}
										{comment.comment}
									</div>
									<div className="like-and-when-added-div">
										<div className="short-when-added-and-likes">
											<ReactTimeAgo
												timeStyle="mini-minute-now"
												date={comment.date}
												locale="en-US"
											/>
										</div>
										<div
											onClick={() => showLikesModal(comment.likes, props.likesModalSetLikes)}
											className="short-when-added-and-likes"
										>
											{showLikes(comment)}
										</div>
										<div
											onClick={() => props.removeComment(props.postId, comment.id)}
											className="short-when-added-and-likes"
										>
											{deleteComment(comment)}
										</div>
									</div>
								</div>
							</div>
							<div
								onClick={() => likeCommentIcon(props.likeComment, comment.id, props.postId)}
								className="like-comment-div like-comment-div-modal"
							>
								{likeCommentIconClicked(comment.likes.users, props.yourUsername)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

function showCommentsModal(postId, commModalSetPostId) {
	const modal = document.getElementById("comments-modal");
	if (!window.location.href.includes("commentsM")) {
		window.history.pushState("commentsM", "Title", "commentsM");
	}

	commModalSetPostId(postId);

	modal.style.display = "flex";
}

export default CommentsModal;
export {showCommentsModal, hideCommentsModal}
