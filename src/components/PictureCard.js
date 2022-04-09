import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import uniqid from "uniqid";
import { getUserData } from "..";
import ava from "../img/ava.jpeg";
import testPic from "../img/test-img.jpg";
import "../styles/PictureCard.css";
import { dropDown, hideDropDown } from "./Home.js";
import {showSignInModal } from "./Nav";
import ReactTimeAgo from "react-time-ago";
import Picker from "emoji-picker-react";
import { hideUnFollowModal } from "./Modals";

function likeCommentIconClicked(users, username) {
	if (users.includes(username)) {
		return (
			<svg
				aria-label="Unlike"
				color="#ed4956"
				fill="#ed4956"
				height="12"
				role="img"
				viewBox="0 0 48 48"
				width="12"
			>
				<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
			</svg>
		);
	} else {
		return (
			<svg aria-label="Like" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12">
				<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
			</svg>
		);
	}
}

function likeCommentIcon(likeComment, id) {
	const user = getAuth().currentUser;

	if (user) {
		likeComment(id);
	} else {
		showSignInModal();
	}
}

function likeIconClicked(likes, username) {
	if (likes.users.includes(username)) {
		return (
			<svg
				aria-label="Activity Feed"
				color="#ed4956"
				fill="#ed4956"
				height="24"
				role="img"
				viewBox="0 0 48 48"
				width="24"
			>
				<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
			</svg>
		);
	} else {
		return (
			<svg aria-label="Like" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
				<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
			</svg>
		);
	}
}

function likeIcon(likePicture) {
	const user = getAuth().currentUser;

	if (user) {
		likePicture();
	} else {
		showSignInModal();
	}
}

function showShareModal() {
	const modal = document.getElementById("share-modal");
	if (!window.location.href.includes("shareM")) {
		window.history.pushState("shareM", "Title", "shareM");
	}

	modal.style.display = "flex";
}

function shareIconClicked() {
	const user = getAuth().currentUser;

	if (user) {
		showShareModal();
	} else {
		showSignInModal();
	}
}

function shareIcon() {
	return (
		<span onClick={() => shareIconClicked()} className="comms-icon-span">
			<svg
				aria-label="Share Post"
				color="#262626"
				fill="#262626"
				height="24"
				role="img"
				viewBox="0 0 24 24"
				width="24"
			>
				<line
					fill="none"
					stroke="currentColor"
					strokeLinejoin="round"
					strokeWidth="2"
					x1="22"
					x2="9.218"
					y1="3"
					y2="10.083"
				></line>
				<polygon
					fill="none"
					points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
					stroke="currentColor"
					strokeLinejoin="round"
					strokeWidth="2"
				></polygon>
			</svg>
		</span>
	);
}

function showCommentsModal(
	username,
	comments,
	description,
	avatar,
	addComment,
	likeComment,
	removeComment,
	likes,
	likePicture,
	date,
	users,
	follow,
	unFollow,
	following,
	addToFlag
) {
	const modal = document.getElementById("comments-modal");
	const commentsDiv = document.getElementById("modal-comments-section");
	const addCommentDiv = document.getElementById("div-for-comment-section-in-comment-modal");
	const likesDiv = document.getElementById("number-of-likes-section-modal");
	const iconsDiv = document.getElementById("icons-in-comments-section-modal");
	const whenAddedDiv = document.getElementById("when-added-div-modal");
	const descriptionWhenAddedDiv = document.getElementById("short-when-added-and-likes-modal");
	const headerDiv = document.getElementById("comments-modal-header-section");
	if (!window.location.href.includes("commentsM")) {
		window.history.pushState("commentsM", "Title", "commentsM");
	}

	modal.style.display = "flex";

	ReactDOM.render(
		<PictureCardHeader
			users={users}
			follow={follow}
			unFollow={unFollow}
			following={following}
			username={username}
			avatar={avatar}
			addToFlag={addToFlag}
		/>,
		headerDiv
	);

	ReactDOM.render(
		<Comments
			users={users}
			follow={follow}
			unFollow={unFollow}
			following={following}
			removeComment={removeComment}
			likeComment={likeComment}
			comments={comments}
			description={description}
			username={username}
			avatar={avatar}
			addToFlag={addToFlag}
		/>,
		commentsDiv
	);
	ReactDOM.render(<AddCommentSection addComment={addComment} />, addCommentDiv);
	ReactDOM.render(
		<PictureCardNumOfLikesSection
			users={users}
			follow={follow}
			unFollow={unFollow}
			following={following}
			addToFlag={addToFlag}
			likes={likes}
		/>,
		likesDiv
	);
	ReactDOM.render(
		<PictureCardIconsSection date={date} likePicture={likePicture} likes={likes} modal="modal" />,
		iconsDiv
	);
	ReactDOM.render(<ReactTimeAgo date={date} locale="en-US" />, whenAddedDiv);
	if (descriptionWhenAddedDiv) {
		ReactDOM.render(
			<ReactTimeAgo timeStyle="mini-minute-now" date={date} locale="en-US" />,
			descriptionWhenAddedDiv
		);
	}
}

function PictureCardIconsSection(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const user = getAuth().currentUser;

		if (signedIn) {
			getUserData(user.uid).then((user) => setUsername(user.data().username));
		}
	}, [signedIn]);

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
			setUsername("");
		}
	});

	function commentsIcon() {
		if (!props.modal) {
			return (
				<span
					onClick={() =>
						showCommentsModal(
							props.username,
							props.comments,
							props.description,
							props.avatar,
							props.addComment,
							props.likeComment,
							props.removeComment,
							props.likes,
							props.likePicture,
							props.date,
							props.users,
							props.follow,
							props.unFollow,
							props.following,
							props.addToFlag
						)
					}
					className="comms-icon-span"
				>
					<svg
						aria-label="Comment"
						color="#262626"
						fill="#262626"
						height="24"
						role="img"
						viewBox="0 0 24 24"
						width="24"
					>
						<path
							d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
							fill="none"
							stroke="currentColor"
							strokeLinejoin="round"
							strokeWidth="2"
						></path>
					</svg>
				</span>
			);
		}
	}

	return (
		<>
			<span onClick={() => likeIcon(props.likePicture)} className="comms-icon-span">
				{likeIconClicked(props.likes, username)}
			</span>
			{commentsIcon()}
			{shareIcon()}
		</>
	);
}

function Comments(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const user = getAuth().currentUser;

		if (signedIn) {
			getUserData(user.uid).then((user) => setUsername(user.data().username));
		}
	}, [signedIn]);

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
			setUsername("");
		}
	});

	useEffect(() => {
		const div = document.getElementById("modal-comments-section");
		div.scrollTop = div.scrollHeight;
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
		if (signedIn && comment.username === document.getElementById("right-login-div-top-span").textContent) {
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
								props.following,
								props.follow,
								props.unFollow,
								e,
								"avaPic"
							);
						}}
						onMouseLeave={() => {
							props.addToFlag();
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
											props.following,
											props.follow,
											props.unFollow,
											e
										);
									}}
									onMouseLeave={() => {
										props.addToFlag();
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
								<div id="short-when-added-and-likes-modal" className="short-when-added-and-likes"></div>
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
										props.following,
										props.follow,
										props.unFollow,
										e,
										"avaPic"
									);
								}}
								onMouseLeave={() => {
									props.addToFlag();
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
													props.following,
													props.follow,
													props.unFollow,
													e
												);
											}}
											onMouseLeave={() => {
												props.addToFlag();
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
											onClick={() =>
												showLikesModal(
													comment,
													props.users,
													props.follow,
													props.unFollow,
													props.following,
													props.addToFlag,
													"comms"
													
												)
											}
											className="short-when-added-and-likes"
										>
											{showLikes(comment)}
										</div>
										<div
											onClick={() => props.removeComment(comment.id)}
											className="short-when-added-and-likes"
										>
											{deleteComment(comment)}
										</div>
									</div>
								</div>
							</div>
							<div
								onClick={() => likeCommentIcon(props.likeComment, comment.id)}
								className="like-comment-div like-comment-div-modal"
							>
								{likeCommentIconClicked(comment.likes.users, username)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

function PictureCardCommentsSection(props) {
	function viewAllComments() {
		if (props.comments.length > 2) {
			return (
				<div className="comment-line-div">
					<span
						onClick={() =>
							showCommentsModal(
								props.username,
								props.comments,
								props.description,
								props.avatar,
								props.addComment,
								props.likeComment,
								props.removeComment,
								props.likes,
								props.likePicture,
								props.date,
								props.users,
								props.follow,
								props.unFollow,
								props.following,
								props.addToFlag
							)
						}
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
						<span
							onMouseEnter={(e) =>
								dropDown(
									getUserDataFromUsersArray(props.users, props.username),
									props.following,
									props.follow,
									props.unFollow,
									e
								)
							}
							onMouseLeave={() => hideDropDown()}
							className="name-span in-coms"
						>
							{props.username}
						</span>
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
								<span
									onMouseEnter={(e) =>
										dropDown(
											getUserDataFromUsersArray(props.users, comment.username),
											props.following,
											props.follow,
											props.unFollow,
											e
										)
									}
									onMouseLeave={() => hideDropDown()}
									className="name-span in-coms"
								>
									{comment.username}
								</span>
								<span className="comment-span">{comment.comment}</span>
							</div>
							<div
								onClick={() => likeCommentIcon(props.likeComment, comment.id)}
								className="like-comment-div"
							>
								{likeCommentIconClicked(comment.likes.users, props.yourUsername)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function getUserDataFromUsersArray(array, userName) {
	let userData;
	array.forEach((user) => {
		if (user.username === userName) {
			userData = user;
		}
	});
	return userData;
}

function PictureCardHeader(props) {
	return (
		<div className="picture-card-header-div">
			<div className="picture-card-header-inner">
				<header className="picture-card-header">
					<div className="picture-card-avatar-div">
						<div className="picture-card-avatar-div-inner">
							<span
								onMouseEnter={(e) => {
									dropDown(
										getUserDataFromUsersArray(props.users, props.username),
										props.following,
										props.follow,
										props.unFollow,
										e,
										"avaPic"
									);
									props.addToFlag();
								}}
								onMouseLeave={() => {
									props.addToFlag();
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
						</div>
					</div>
					<div className="picture-card-name-div">
						<span
							onMouseEnter={(e) => {
								dropDown(
									getUserDataFromUsersArray(props.users, props.username),
									props.following,
									props.follow,
									props.unFollow,
									e
								);
								props.addToFlag();	
							}}
							onMouseLeave={() => {
								props.addToFlag();
								hideDropDown();
							}}
							className="name-span"
							id={props.username ? "" : "comments-modal-id-div"}
						>
							{props.username}
						</span>
					</div>
				</header>
				<div onClick={() => options(getUserDataFromUsersArray(props.users, props.username), props.following,  props.follow, props.unFollow)} className="picture-card-header-options">
					<div className="picture-card-header-options-inner">
						<svg
							aria-label="More options"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<circle cx="12" cy="12" r="1.5"></circle>
							<circle cx="6" cy="12" r="1.5"></circle>
							<circle cx="18" cy="12" r="1.5"></circle>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}

function options(userData, following, follow, unFollow) {
	const user = getAuth().currentUser;

	if (user) {
		const modal = document.getElementById("unfollow-modal");
		if (!window.location.href.includes("optionsM")) {
			window.history.pushState("optionsM", "Title", "optionsM");
		}

		ReactDOM.render(<Options userData={userData} following={following} follow={follow} unFollow={unFollow}/>, document.getElementById("unfollow-modal-content"))

		modal.style.display = "flex";
		
	} else {
		showSignInModal();
	}
}

function Options(props) {

	function buttons() {
		const user = getAuth().currentUser;

		if(user.uid === props.userData.uid) {
			return (
				<>
					<span>Delete</span>
					<span>Edit</span>
				</>
				
			);

		} else if(props.following.includes(props.userData.username)) {
			return (
				<>
					<span onClick={() => {props.unFollow(props.userData.username); hideUnFollowModal()}}>Unfollow</span>
				</>
			);

		} else if(!props.following.includes(props.userData.username)) {
			return (
				<>
					<span onClick={() => {props.follow(props.userData.username); hideUnFollowModal()}}>Follow</span>
				</>
			);


		}

		
		
	}

	return(
		<>
			{buttons()}
			<span onClick={() => hideUnFollowModal()}>Cancel</span>	
		</>
	);
}

function AddCommentSection(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [id, setId] = useState(uniqid());
	const [commentValue, setCommentValue] = useState("");

	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById(id + "button");

		if (button.classList.contains("post-div-active")) {
			const username = document.getElementById("right-login-div-top-span").textContent;
			props.addComment({
				username: username,
				comment: commentValue,
				id: uniqid(),
				likes: { num: 0, users: [] },
				date: new Date(),
			});

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

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

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
			ReactDOM.render(
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
							<svg
								id={id + "svg"}
								aria-label="Emoji"
								color="#262626"
								fill="#262626"
								height="24"
								role="img"
								viewBox="0 0 24 24"
								width="24"
							>
								<path
									id={id + "path"}
									d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
								></path>
							</svg>
						</div>
						<textarea
							id={id + "text"}
							value={commentValue}
							onChange={(e) => handleCommentTextAreaChange(e)}
							placeholder="Add a comment…"
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

function PictureCardNumOfLikesSection(props) {
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
			<span
				onClick={() =>
					showLikesModal(
						props.likes,
						props.users,
						props.follow,
						props.unFollow,
						props.following,
						props.addToFlag,
						"pic"
					)
				}
				className="likes-span"
			>
				{showLikes(props.likes)}
			</span>
		</div>
	);
}

function showLikesModal(likes, users, follow, unFollow, following, addToFlag, info) {
	const modal = document.getElementById("likes-modal");
	const container = document.getElementById("list-of-likes-div-inner");
	if (!window.location.href.includes("likesM")) {
		window.history.pushState("likesM", "Title", "likesM");
	}

	modal.style.display = "flex";

	ReactDOM.render(
		<Likes
			users={users}
			follow={follow}
			unFollow={unFollow}
			following={following}
			addToFlag={addToFlag}
			likes={likes}
			info={info}
		/>,
		container
	);
}

function Likes(props) {
	const [signedIn, setSignedIn] = useState(false);
	const test = useRef("");
	const test2 = useRef("");
	
	const c = () => {
		if(props.info === "comms") {
			test2.current = "comms";

		} else if(props.info === "pic") {
			test2.current = "pic";
		}
	}

	c();

	const a = () => {
		if(props.likes.users) {
			return props.likes.users;

		} else if(props.likes.likes.users) {
			test.current = props.likes.id;
			return props.likes.likes.users;
		}
	}

	let likes = a();

	const b = () => {
		if(props.comments) {
			props.comments.forEach((comment) => {
				if(comment.id === test.current && test2.current === "comms") {
					likes = comment.likes.users;
				}
			})
		}
	}

	b();

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	function followButtonForLikes(user) {
		const userR = getAuth().currentUser;

		if (
			signedIn &&
			!props.following.includes(user) &&
			getUserDataFromUsersArray(props.users, user).uid !== userR.uid
		) {
			return (
				<button
					onClick={() => {
						props.addToFlag();
						props.follow(user);
					}}
					className="likes-modal-follow"
				>
					Follow
				</button>
			);
		} else if (signedIn && props.following.includes(user)) {
			return (
				<button
					onClick={() => {
						props.addToFlag();
						props.unFollow(user);
					}}
					className="likes-modal-follow sug-box-left-follow-active"
				>
					Following
				</button>
			);
		}
	}

	return (
		<>
			{likes.map((user) => {
				return (
					<div key={uniqid()} className="right-sug-div-list">
						<div
							onMouseEnter={(e) => {
								dropDown(
									getUserDataFromUsersArray(props.users, user),
									props.following,
									props.follow,
									props.unFollow,
									e,
									"avaPic"
								);
							}}
							onMouseLeave={() => {
								props.addToFlag();
								hideDropDown();
							}}
							className="right-sug-ava-div"
						>
							<img className="ava-img-likes" src={ava} alt="" />
						</div>
						<span
							onMouseEnter={(e) =>
								dropDown(
									getUserDataFromUsersArray(props.users, user),
									props.following,
									props.follow,
									props.unFollow,
									e,
									"no",
									"right"
								)
							}
							onMouseLeave={() => {
								props.addToFlag();
								hideDropDown();
							}}
							className="sug-login-right"
						>
							{user}
						</span>
						{followButtonForLikes(user)}
					</div>
				);
			})}
		</>
	);
}

function PictureCard(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [likes, setLikes] = useState({ num: 0, users: [] });
	const [comments, setComments] = useState([]);
	const [username, setUsername] = useState("John12");
	const [description, setDescription] = useState("Drop a if you’re ready to go on this ride with us this month");
	const [avatar, setAvatar] = useState(ava);
	const [date, setDate] = useState(new Date());
	const [flag, setFlag] = useState(0);
	const [flag2, setFlag2] = useState(0);
	const prev = useRef({ flag2, flag });
	const didMount = useRef(false);


	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	function addToFlag() {
		setFlag(flag + 1);
		
	}

	function likePicture() {
		setLikes((prevLikes) => {
			const yourUsername = document.getElementById("right-login-div-top-span").textContent;

			if (!prevLikes.users.includes(yourUsername)) {
				return { num: prevLikes.num + 1, users: [...prevLikes.users, yourUsername] };
			} else {
				return {
					num: prevLikes.num - 1,
					users: prevLikes.users.filter((username) => username !== yourUsername),
				};
			}
		});
	}

	function addComment(comment) {
		setComments([...comments, comment]);
	}

	function removeComment(id) {
		setComments((prevComments) => {
			const newComments = prevComments.filter((comment) => comment.id !== id);
			return newComments;
		});
	}

	function likeComment(id) {
		setComments((prevComments) => {
			const yourUsername = document.getElementById("right-login-div-top-span").textContent;

			const newComments = prevComments.map((comment) => {
				if (comment.id === id) {
					if (!comment.likes.users.includes(yourUsername)) {
						return {
							...comment,
							likes: {
								num: comment.likes.num + 1,
								users: [...comment.likes.users, yourUsername],
							},
						};
					} else {
						return {
							...comment,
							likes: {
								num: comment.likes.num - 1,
								users: comment.likes.users.filter((username) => username !== yourUsername),
							},
						};
					}
				}
				return comment;
			});
			return newComments;
		});
	}

	useEffect(() => {
		if (document.getElementById("comments-modal").style.display === "flex") {
			ReactDOM.render(
				<PictureCardNumOfLikesSection
					users={props.users}
					follow={props.follow}
					unFollow={props.unFollow}
					following={props.following}
					addToFlag={addToFlag}
					likes={likes}
				/>,
				document.getElementById("number-of-likes-section-modal")
			);
			ReactDOM.render(
				<PictureCardIconsSection
					addToFlag={addToFlag}
					date={date}
					likePicture={likePicture}
					likes={likes}
					modal="modal"
				/>,
				document.getElementById("icons-in-comments-section-modal")
			);
		}
	}, [likes]);

	useEffect(() => {
		setFlag2(flag2 + 1);
	}, [props.following]);


	useEffect(() => {
		if (!didMount.current) {
			return (didMount.current = true);
		}

		if (prev.current.flag2 !== flag2 && prev.current.flag !== flag) {
			if (document.getElementById("comments-modal").style.display === "flex") {
				ReactDOM.render(
					<PictureCardHeader
						users={props.users}
						follow={props.follow}
						unFollow={props.unFollow}
						following={props.following}
						username={username}
						avatar={avatar}
						addToFlag={addToFlag}
					/>,
					document.getElementById("comments-modal-header-section")
				);
				ReactDOM.render(
					<Comments
						users={props.users}
						follow={props.follow}
						unFollow={props.unFollow}
						following={props.following}
						removeComment={removeComment}
						likeComment={likeComment}
						comments={comments}
						description={description}
						username={username}
						avatar={avatar}
						addToFlag={addToFlag}
					/>,
					document.getElementById("modal-comments-section")
				);
			}

			if (document.getElementById("likes-modal").style.display === "flex") {
				ReactDOM.render(
					<Likes
						users={props.users}
						follow={props.follow}
						unFollow={props.unFollow}
						following={props.following}
						addToFlag={addToFlag}
						likes={likes}
						comments={comments}
					/>,
					document.getElementById("list-of-likes-div-inner")
				);
			}
			// prev.current = { flag2, flag };
			prev.current.flag2 = flag;
		}
	}, [flag2]);

	useEffect(() => {
		if (document.getElementById("comments-modal").style.display === "flex") {
			ReactDOM.render(
				<Comments
					users={props.users}
					follow={props.follow}
					unFollow={props.unFollow}
					following={props.following}
					removeComment={removeComment}
					likeComment={likeComment}
					comments={comments}
					description={description}
					username={username}
					avatar={avatar}
					addToFlag={addToFlag}
				/>,
				document.getElementById("modal-comments-section")
			);

			ReactDOM.render(
				<AddCommentSection addComment={addComment} />,
				document.getElementById("div-for-comment-section-in-comment-modal")
			);
		}
	}, [comments]);

	return (
		<div className="picture-card-article">
			<div className="picture-card-div">
				<PictureCardHeader
					users={props.users}
					follow={props.follow}
					unFollow={props.unFollow}
					following={props.following}
					username={username}
					avatar={avatar}
					addToFlag={addToFlag}
				/>
			</div>
			<div className="picture-div">
				<div className="picture-div-inner">
					<img className="main-picture" src={testPic} alt="" />
				</div>
			</div>
			<div className="comments-div">
				<div className="comments-inner-div">
					<section className="icons-in-comments-section">
						<PictureCardIconsSection
							comments={comments}
							username={username}
							description={description}
							avatar={avatar}
							addComment={addComment}
							likeComment={likeComment}
							removeComment={removeComment}
							likes={likes}
							likePicture={likePicture}
							date={date}
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							addToFlag={addToFlag}
						/>
					</section>

					<section className="number-of-likes-section">
						<PictureCardNumOfLikesSection
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							addToFlag={addToFlag}
							likes={likes}
						/>
					</section>

					<PictureCardCommentsSection
						comments={comments}
						username={username}
						description={description}
						avatar={avatar}
						addComment={addComment}
						likeComment={likeComment}
						signedIn={signedIn}
						removeComment={removeComment}
						likes={likes}
						yourUsername={props.username}
						likePicture={likePicture}
						date={date}
						users={props.users}
						follow={props.follow}
						unFollow={props.unFollow}
						following={props.following}
						addToFlag={addToFlag}
					/>
					<div className="added-div">
						<ReactTimeAgo date={date} locale="en-US" />
					</div>
					<AddCommentSection addComment={addComment} />
				</div>
			</div>
		</div>
	);
}

export default PictureCard;
export { options, PictureCardHeader, AddCommentSection, likeCommentIcon, shareIcon,  getUserDataFromUsersArray };
