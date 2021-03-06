import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import uniqid from "uniqid";
import "../styles/PictureCard.css";
import ReactTimeAgo from "react-time-ago";
import Picker from "emoji-picker-react";
import { dropDown, hideDropDown } from "./DropDown";
import { likeCommentIcon, likeCommentIconClicked, likeIcon, likeIconClicked } from "./Icons/LikeIcon";
import { showLikesModal } from "./Modals/LikesModal";
import { EmojiiIcon } from "./Icons/EmojiiIcon";
import { options } from "./Modals/OptionsModal";
import { OptionsIcon } from "./Icons/OptionsIcon";
import { getUserDataFromUsersArray } from "./Home";
import { CommentIcon } from "./Icons/CommentIcon";
import { showCommentsModal } from "./Modals/CommentsModal";
import { tagPosition } from "./Modals/AddPostModal";
import { TagIcon } from "./Icons/TagIcon";
import { Link } from "react-router-dom";
import ava from "../img/ava.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setPostIdOptionsModal } from "../features/modalsSlice";


function PictureCard(props) {
	const [img, setImg] = useState(props.post.pic);
	const [id, setId] = useState(uniqid());
	const users = useSelector((state) => state.usersAndPosts.users);
	const [userData, setUserData] = useState(getUserDataFromUsersArray(users, props.post.username));

	
	useEffect(() => {
		if (img.tags.length > 0) {
			document.getElementById("tag-ico" + id).style.display = "flex";
		} else {
			document.getElementById("tag-ico" + id).style.display = "none";
		}
	}, [img]);

	function showTags() {
		const tagContainer = document.getElementById("tag-cont" + id);

		if (tagContainer.style.display === "flex") {
			tagContainer.style.display = "none";
		} else {
			tagContainer.style.display = "flex";
		}
	}

	return (
		<div className="picture-card-article">
			<div className="picture-card-div">
				<PictureCardHeader
					follow={props.follow}
					unFollow={props.unFollow}
					username={props.post.username}
					avatar={userData.avatar ? userData.avatar : ava}
					postId={props.post.id}
				/>
			</div>
			<div className="picture-div">
				<div className="picture-div-inner">
					<img className="main-picture" src={img.src} alt="" />

					<div id={"tag-cont" + id} className="tag-container-picture-card">
						{img.tags.map((tag) => {
							return (
								<Link key={uniqid()} to={`/profile/${tag.username}`}>
									<div style={tagPosition(tag)} className="tag-div-picture-card">
										<span>{tag.username}</span>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				<div onClick={() => showTags()} id={"tag-ico" + id} className="tag-icon-container">
					{TagIcon()}
				</div>
			</div>
			<div className="comments-div">
				<div className="comments-inner-div">
					<section className="icons-in-comments-section">
						<PictureCardIconsSection
							likes={props.post.likes}
							likePicture={props.likePicture}
							postId={props.post.id}
						/>
					</section>

					<section className="number-of-likes-section">
						<PictureCardNumOfLikesSection
							likes={props.post.likes}
						/>
					</section>

					<PictureCardCommentsSection
						comments={props.post.comments}
						username={props.post.username}
						description={props.post.description}
						likeComment={props.likeComment}
						postId={props.post.id}
						avatar={userData.avatar ? userData.avatar : ava}
					/>
					<div className="added-div">
						<ReactTimeAgo date={props.post.date} locale="en-US" />
					</div>
					<AddCommentSection
						postId={props.post.id}
						addComment={props.addComment}
					/>
				</div>
			</div>
		</div>
	);
}

function PictureCardNumOfLikesSection(props) {
	const dispatch = useDispatch();

	function showLikes(likes) {
		if (likes.num === 0) {
			return "";
		} else if (likes.num === 1) {
			return "1 like";
		} else {
			return likes.num + " likes";
		}
	}

	return (
		<div className="number-of-likes-div">
			<span onClick={() => showLikesModal(props.likes, dispatch)} className="likes-span">
				{showLikes(props.likes)}
			</span>
		</div>
	);
}

function AddCommentSection(props) {
	const [id, setId] = useState(uniqid());
	const [commentValue, setCommentValue] = useState("");
	const signedIn = useSelector((state) => state.user.signedIn);
	const yourUsername = useSelector((state) => state.user.username);


	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById(id + "button");

		if (button.classList.contains("post-div-active")) {
			props.addComment(
				{
					username: yourUsername,
					comment: commentValue,
					id: uniqid(),
					likes: { num: 0, users: [] },
					date: Date.now(),
				},
				props.postId
			);

			setCommentValue("");
			button.classList.remove("post-div-active");
			button.disabled = true;
		}
	}

	function handleCommentTextAreaChange(e) {
		setCommentValue(e.target.value);

		const button = document.getElementById(id + "button");

		if (e.target.value !== "" && !button.classList.contains("post-div-active")) {
			button.classList.add("post-div-active");
			button.disabled = false;
		} else if (e.target.value === "") {
			button.classList.remove("post-div-active");
			button.disabled = true;
		}
	}

	function handleCommentEmoji(e, emojiObject) {
		const textarea = document.getElementById(id + "text");
		setCommentValue(textarea.value + emojiObject.emoji);

		const button = document.getElementById(id + "button");

		if (!button.classList.contains("post-div-active")) {
			button.classList.add("post-div-active");
			button.disabled = false;
		}
	}

	function showEmojiiPicker(e) {
		function hideEmojiiPicker(e) {
			let found = false;

			e.path.forEach((ele) => {
				if (ele.id === id + "emo" || ele.id === id + "svg" || ele.id === id + "path") {
					found = true;
				}
			});

			if (!found) {
				ReactDOM.unmountComponentAtNode(document.getElementById(id + "emo"));
				window.removeEventListener("click", hideEmojiiPicker);
			}
		}

		if (!document.getElementById(id + "emo").firstChild) {
			render(
				<Picker
					natvie={true}
					disableSearchBar={true}
					pickerStyle={{ position: "absolute", bottom: "35px", left: "0px" }}
					onEmojiClick={(e, emojiObject) => handleCommentEmoji(e, emojiObject)}
				/>,
				document.getElementById(id + "emo")
			);

			window.addEventListener("click", hideEmojiiPicker);
		} else if (e.target.tagName === "svg" || e.target.tagName === "path") {
			ReactDOM.unmountComponentAtNode(document.getElementById(id + "emo"));
		}
	}

	if (signedIn) {
		return (
			<section className="add-comment-section">
				<div className="add-comment-section-inner">
					<form
						onKeyDown={(e) => {
							if (e.key === "Enter") submitComment(e);
						}}
						onSubmit={(e) => submitComment(e)}
						className="comment-form"
					>
						<div onClick={(e) => showEmojiiPicker(e)} className="emoji-div">
							<div id={id + "emo"}></div>
							{EmojiiIcon(id)}
						</div>
						<textarea
							id={id + "text"}
							value={commentValue}
							onChange={(e) => handleCommentTextAreaChange(e)}
							placeholder="Add a comment???"
							className="add-comment-text-area"
							autoComplete="off"
						></textarea>
						<button id={id + "button"} className="post-div" disabled>
							Post
						</button>
					</form>
				</div>
			</section>
		);
	} else {
		return <></>;
	}
}

function PictureCardHeader(props) {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.usersAndPosts.users);

	return (
		<div className="picture-card-header-div">
			<div className="picture-card-header-inner">
				<header className="picture-card-header">
					<div className="picture-card-avatar-div">
						<div className="picture-card-avatar-div-inner">
							<Link onClick={() => window.history.pushState("/", "Title", "/")} to={`/profile/${props.username}`}>
								<span
									onClick={() => {hideDropDown(); document.getElementById("comments-modal").style.display = "none"}}
									onMouseEnter={(e) => {
										dropDown(
											getUserDataFromUsersArray(users, props.username),
											dispatch,
											e,
											"avaPic"
										);
									}}
									onMouseLeave={() => {
										hideDropDown();
									}}
									className="avatar-span"
								>
									<img
										id={props.username ? "" : "comments-modal-ava-header"}
										alt=""
										className="card-avatar-img"
										data-testid="user-avatar"
										draggable="false"
										src={props.avatar}
									/>
								</span>
							</Link>
						</div>
					</div>

					<div className="picture-card-name-div">
						<Link onClick={() => window.history.pushState("/", "Title", "/")} to={`/profile/${props.username}`}>
							<span
								onClick={() => {hideDropDown(); document.getElementById("comments-modal").style.display = "none"}}
								onMouseEnter={(e) => {
									dropDown(
										getUserDataFromUsersArray(users, props.username),
										dispatch,
										e
									);
								}}
								onMouseLeave={() => {
									hideDropDown();
								}}
								className="name-span"
								id={props.username ? "" : "comments-modal-id-div"}
							>
								{props.username}
							</span>
						</Link>
					</div>
				</header>
				<div
					onClick={() => {
						options(getUserDataFromUsersArray(users, props.username), dispatch);
						dispatch(setPostIdOptionsModal(props.postId));
					}}
					className="picture-card-header-options"
				>
					<div className="picture-card-header-options-inner">{OptionsIcon()}</div>
				</div>
			</div>
		</div>
	);
}

function PictureCardCommentsSection(props) {
	const dispatch = useDispatch();
	const yourUsername = useSelector((state) => state.user.username);
	const users = useSelector((state) => state.usersAndPosts.users);

	function viewAllComments() {
		if (props.comments.length > 2) {
			return (
				<div className="comment-line-div">
					<span
						onClick={() => showCommentsModal(props.postId, dispatch)}
						className="view-all-coms-span"
					>
						View all {props.comments.length} comments
					</span>
				</div>
			);
		}
	}

	function displayDescription() {
		if (props.description) {
			return (
				<div className="comment-line-div">
					<div>
						<Link to={`/profile/${props.username}`}>
							<span
								onClick={() => hideDropDown()}
								onMouseEnter={(e) =>
									dropDown(
										getUserDataFromUsersArray(users, props.username),
										dispatch,
										e
									)
								}
								onMouseLeave={() => hideDropDown()}
								className="name-span in-coms"
							>
								{props.username}
							</span>
						</Link>
						<span className="comment-span">{props.description}</span>
					</div>
				</div>
			);
		}
	}

	return (
		<div className="pic-comments-div">
			<div className="pic-comments-inner-div">
				{displayDescription()}
				{viewAllComments()}
				{props.comments.slice(0, 2).map((comment) => {
					return (
						<div key={uniqid()} className="comment-line-div">
							<div className="comment-line-inner-div">
								<Link to={`/profile/${comment.username}`}>
									<span
										onClick={() => hideDropDown()}
										onMouseEnter={(e) =>
											dropDown(
												getUserDataFromUsersArray(users, comment.username),
												dispatch,
												e
											)
										}
										onMouseLeave={() => hideDropDown()}
										className="name-span in-coms"
									>
										{comment.username}
									</span>
								</Link>
								<span className="comment-span">{comment.comment}</span>
							</div>
							<div
								onClick={() => likeCommentIcon(props.likeComment, comment.id, props.postId)}
								className="like-comment-div"
							>
								{likeCommentIconClicked(comment.likes.users, yourUsername)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function PictureCardIconsSection(props) {
	const dispatch = useDispatch();
	const yourUsername = useSelector((state) => state.user.username);

	function commentsIcon() {
		if (!props.modal) {
			return (
				<span
					onClick={() => showCommentsModal(props.postId, dispatch)}
					className="comms-icon-span"
				>
					{CommentIcon()}
				</span>
			);
		}
	}

	return (
		<>
			<span onClick={() => likeIcon(props.likePicture, props.postId)} className="comms-icon-span">
				{likeIconClicked(props.likes, yourUsername)}
			</span>
			{commentsIcon()}
		</>
	);
}

export default PictureCard;
export { PictureCardHeader, AddCommentSection, PictureCardIconsSection, PictureCardNumOfLikesSection };
