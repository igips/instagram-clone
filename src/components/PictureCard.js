import "../styles/PictureCard.css";
import ava from "../img/ava.jpeg";
import testPic from "../img/test-img.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { showSignInModal } from "./Nav";
import { hideDropDown, dropDown } from "./Home.js";
import uniqid from "uniqid";
import ReactDOM from "react-dom";

function options() {
	const user = getAuth().currentUser;

	if (user) {
		const modal = document.getElementById("unfollow-modal");
		modal.style.display = "flex";
	} else {
		showSignInModal();
	}
}

function likeCommentIconClicked(container) {
	if (!container.currentTarget.classList.contains("liked-mini")) {
		container.currentTarget.classList.remove("like-comment-div");
		container.currentTarget.classList.add("liked-mini");
		container.currentTarget.innerHTML =
			'<svg aria-label="Unlike" color="#ed4956" fill="#ed4956" height="12" role="img" viewBox="0 0 48 48" width="12"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>';
	} else {
		container.currentTarget.classList.remove("liked-mini");
		container.currentTarget.classList.add("like-comment-div");
		container.currentTarget.innerHTML =
			'<svg aria-label="Like" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>';
	}
}

function likeIconClicked(container) {
	if (!container.currentTarget.classList.contains("liked")) {
		container.currentTarget.classList.remove("comms-icon-span");
		container.currentTarget.classList.add("liked");
		container.currentTarget.innerHTML =
			'<svg aria-label="Activity Feed" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>';
	} else {
		container.currentTarget.classList.remove("liked");
		container.currentTarget.classList.add("comms-icon-span");
		container.currentTarget.innerHTML =
			'<svg aria-label="Like" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>';
	}
}

function likeCommentIcon(container) {
	const user = getAuth().currentUser;

	if (user) {
		likeCommentIconClicked(container);
	} else {
		showSignInModal();
	}
}

function showShareModal() {
	const modal = document.getElementById("share-modal");
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

function likeIcon(container) {
	const user = getAuth().currentUser;

	if (user) {
		likeIconClicked(container);
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

function pictureCardIconsSection(modal) {
	function commentsIcon() {
		if (!modal) {
			return (
				<span onClick={() => showCommentsModal()} className="comms-icon-span">
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
		<section className="icons-in-comments-section">
			<span onClick={(event) => likeIcon(event)} className="comms-icon-span">
				<svg
					aria-label="Like"
					color="#262626"
					fill="#262626"
					height="24"
					role="img"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
				</svg>
			</span>
			{commentsIcon()}
			{shareIcon()}
		</section>
	);
}

function showCommentsModal(username, comments, description, avatar) {
	const modal = document.getElementById("comments-modal");
	const descriptionDiv = document.getElementById("modal-first-comment");
	const commentsDiv = document.getElementById("modal-comments-section");

	function singleComment(username, comment) {
		const div = document.createElement("div");
		div.classList.add("modal-comments");
	
		const span = document.createElement("span");
		span.onmouseenter = (e) => dropDown(e, "avaPic");
		span.onmouseleave = () => hideDropDown();
		span.classList.add("avatar-span-comments");
	
		const img = document.createElement("img");
		img.classList.add("card-avatar-img");
		img.draggable = "false";
		img.src = ava;
		img.alt = "";
	
		span.appendChild(img);
		div.appendChild(span);
		
		const div2 = document.createElement("div");
		div2.classList.add("modal-comment-div");
	
		const div3 = document.createElement("div");
		div3.classList.add("modal-comment-div-inner");
	
		const div4 = document.createElement("div");
		div4.classList.add("name-span-modal");
	
		const span2 = document.createElement("span");
		span2.classList.add("first-modal-comment-span");
		span2.onmouseenter = (e) => dropDown(e);
		span2.onmouseleave = () => hideDropDown();
		span2.textContent = username + " ";
	
		const span3 = document.createElement("span");
		span3.textContent = comment;
	
		div4.appendChild(span2);
		div4.appendChild(span3);
	
		div3.appendChild(div4);
	
		const div5 = document.createElement("div");
		div5.classList.add("like-and-when-added-div");
	
		const div6 = document.createElement("div");
		div6.classList.add("short-when-added-and-likes");
		div6.textContent = "6d";
	
		div5.appendChild(div6);
	
		const div7 = document.createElement("div");
		div7.classList.add("short-when-added-and-likes");
		div7.textContent = "1 like";
	
		div5.appendChild(div7);
		div3.appendChild(div5);
		div2.appendChild(div3);
		div.appendChild(div2);
	
		const div8 = document.createElement("div");
		div8.classList.add("like-comment-div");
		div8.classList.add("like-comment-div-modal");
		div8.onclick = (event) => likeCommentIcon(event);
	
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("aria-label", "Like");
		svg.setAttribute("color", "#262626");
		svg.setAttribute("fill", "#262626");
		svg.setAttribute("height", "12");
		svg.setAttribute("role", "img");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("width", "12");
	
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z");

		svg.appendChild(path);
		div8.appendChild(svg);
		div.appendChild(div8);
	
		const commentsDiv = document.getElementById("modal-comments-section");
	
		commentsDiv.appendChild(div);
			
	}

	while(commentsDiv.childNodes.length > 1) {
		commentsDiv.removeChild(commentsDiv.lastChild);
	}

	modal.style.display = "flex";

	document.getElementById("comments-modal-id-div").textContent = username;
	document.getElementById("comments-modal-ava-header").src = avatar;

	if (description) {
		descriptionDiv.style.display = "flex";
		document.getElementById("description-comments-modal-username").textContent = username;
		document.getElementById("description-comments-modal-desc").textContent = description;
		document.getElementById("comments-modal-description-avatar").src = avatar;
	} else if (!description) {
		descriptionDiv.style.display = "none";
	}

	comments.forEach((comment) => {
		singleComment(comment.username, comment.comment);
	});
}

function PictureCardCommentsSection(props) {
	function viewAllComments() {
		if (props.comments.length > 2) {
			return (
				<div className="comment-line-div">
					<span
						onClick={() =>
							showCommentsModal(props.username, props.comments, props.description, props.avatar)
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
							onMouseEnter={(e) => dropDown(e)}
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
									onMouseEnter={(e) => dropDown(e)}
									onMouseLeave={() => hideDropDown()}
									className="name-span in-coms"
								>
									{comment.username}
								</span>
								<span className="comment-span">{comment.comment}</span>
							</div>
							<div onClick={(event) => likeCommentIcon(event)} className="like-comment-div">
								<svg
									aria-label="Like"
									color="#262626"
									fill="#262626"
									height="12"
									role="img"
									viewBox="0 0 24 24"
									width="12"
								>
									<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
								</svg>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function PictureCardHeader(props) {
	return (
		<div className="picture-card-header-div">
			<div className="picture-card-header-inner">
				<header className="picture-card-header">
					<div className="picture-card-avatar-div">
						<div className="picture-card-avatar-div-inner">
							<span
								onMouseEnter={(e) => dropDown(e, "avaPic")}
								onMouseLeave={() => hideDropDown()}
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
							onMouseEnter={(e) => dropDown(e)}
							onMouseLeave={() => hideDropDown()}
							className="name-span"
							id={props.username ? "" : "comments-modal-id-div"}
						>
							{props.username}
						</span>
					</div>
				</header>
				<div onClick={() => options()} className="picture-card-header-options">
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

function pictureCardNumOfLikesSection() {
	return (
		<section className="number-of-likes-section">
			<div className="number-of-likes-div">
				<span onClick={() => showLikesModal()} className="likes-span">
					25,350 likes
				</span>
			</div>
		</section>
	);
}

function whenAdded(short) {
	if (short) {
		return <div className="short-when-added-and-likes">6d</div>;
	} else {
		return <div className="added-div">6 DAYS AGO</div>;
	}
}

function showLikesModal() {
	const modal = document.getElementById("likes-modal");
	modal.style.display = "flex";
}

function AddCommentSection(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [id, setId] = useState(uniqid());
	const [commentValue, setCommentValue] = useState("");

	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById(id + "button");
		const username = document.getElementById("right-login-div-top-span").textContent;
		props.addComment({ username: username, comment: commentValue });

		setCommentValue("");
		button.classList.remove("post-div-active");
		button.disabled = true;
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

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	if (signedIn) {
		return (
			<section className="add-comment-section">
				<div className="add-comment-section-inner">
					<form onSubmit={(e) => submitComment(e)} className="comment-form">
						<div className="emoji-div">
							<svg
								aria-label="Emoji"
								color="#262626"
								fill="#262626"
								height="24"
								role="img"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
							</svg>
						</div>
						<textarea
							value={commentValue}
							onChange={(e) => handleCommentTextAreaChange(e)}
							placeholder="Add a comment…"
							className="add-comment-text-area"
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

function PictureCard() {
	const [comments, setComments] = useState([]);
	const [username, setUsername] = useState("bluberek");
	const [description, setDescription] = useState("Drop a if you’re ready to go on this ride with us this month");
	const [avatar, setAvatar] = useState(ava);

	function addComment(comment) {
		setComments([...comments, comment]);
	}

	return (
		<article className="picture-card-article">
			<div className="picture-card-div">
				<PictureCardHeader username={username} avatar={avatar} />
			</div>
			<div className="picture-div">
				<div className="picture-div-inner">
					<img className="main-picture" src={testPic} alt="" />
				</div>
			</div>
			<div className="comments-div">
				<div className="comments-inner-div">
					{pictureCardIconsSection()}
					{pictureCardNumOfLikesSection()}
					<PictureCardCommentsSection
						comments={comments}
						username={username}
						description={description}
						avatar={avatar}
					/>
					{whenAdded()}
					<AddCommentSection addComment={addComment} />
				</div>
			</div>
		</article>
	);
}

export default PictureCard;
export {
	options,
	PictureCardHeader,
	pictureCardIconsSection,
	pictureCardNumOfLikesSection,
	whenAdded,
	AddCommentSection,
	likeCommentIcon,
	shareIcon,
};
