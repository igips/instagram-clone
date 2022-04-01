import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import uniqid from "uniqid";
import { getUsername } from "..";
import ava from "../img/ava.jpeg";
import testPic from "../img/test-img.jpg";
import "../styles/PictureCard.css";
import { dropDown, hideDropDown, followMobile } from "./Home.js";
import { showSignInModal } from "./Nav";

function options() {
	const user = getAuth().currentUser;

	if (user) {
		const modal = document.getElementById("unfollow-modal");
		modal.style.display = "flex";
	} else {
		showSignInModal();
	}
}

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
	likePicture
) {
	const modal = document.getElementById("comments-modal");
	const descriptionDiv = document.getElementById("modal-first-comment");
	const commentsDiv = document.getElementById("container-for-comments-in-modal");
	const addCommentDiv = document.getElementById("div-for-comment-section-in-comment-modal");
	const likesDiv = document.getElementById("number-of-likes-section-modal");
	const iconsDiv = document.getElementById("icons-in-comments-section-modal");

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

	ReactDOM.render(
		<Comments removeComment={removeComment} likeComment={likeComment} comments={comments} />,
		commentsDiv
	);
	ReactDOM.render(<AddCommentSection addComment={addComment} />, addCommentDiv);
	ReactDOM.render(<PictureCardNumOfLikesSection likes={likes} />, likesDiv);
	ReactDOM.render(<PictureCardIconsSection likePicture={likePicture} likes={likes} modal="modal" />, iconsDiv);
}

function PictureCardIconsSection(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const user = getAuth().currentUser;

		if (user) {
			getUsername(user.uid).then((user) => setUsername(user));
		}
	});

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
							props.likePicture
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

		if (user) {
			getUsername(user.uid).then((user) => setUsername(user));
		}
	});

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

	return (
		<>
			{props.comments.map((comment) => {
				return (
					<div key={uniqid()} className="modal-comments">
						<span
							onMouseEnter={(e) => dropDown(e, "avaPic")}
							onMouseLeave={() => hideDropDown()}
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
										onMouseEnter={(e) => dropDown(e)}
										onMouseLeave={() => hideDropDown()}
										className="first-modal-comment-span"
									>
										{comment.username}
									</span>{" "}
									{comment.comment}
								</div>
								<div className="like-and-when-added-div">
									<div className="short-when-added-and-likes">6d</div>
									<div onClick={() => showLikesModal(comment)} className="short-when-added-and-likes">
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
								props.likePicture
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

function AddCommentSection(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [id, setId] = useState(uniqid());
	const [commentValue, setCommentValue] = useState("");

	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById(id + "button");
		const username = document.getElementById("right-login-div-top-span").textContent;
		props.addComment({ username: username, comment: commentValue, id: uniqid(), likes: { num: 0, users: [] } });

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
			<span onClick={() => showLikesModal(props.likes)} className="likes-span">
				{showLikes(props.likes)}
			</span>
		</div>
	);
}

function showLikesModal(likes) {
	const modal = document.getElementById("likes-modal");
	const container = document.getElementById("list-of-likes-div-inner");

	modal.style.display = "flex";

	ReactDOM.render(<Likes likes={likes} />, container);
}

function Likes(props) {
	const [signedIn, setSignedIn] = useState(false);

	const likes = props.likes.users ? props.likes.users : props.likes.likes.users;

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	function followButtonForLikes() {
		if (signedIn) {
			return (
				<button onClick={(e) => followMobile(e)} className="likes-modal-follow">
					Follow
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
							onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
							onMouseLeave={() => hideDropDown()}
							className="right-sug-ava-div"
						>
							<img className="ava-img-likes" src={ava} alt="" />
						</div>
						<span
							onMouseEnter={(e) => dropDown(e, "no", "right")}
							onMouseLeave={() => hideDropDown()}
							className="sug-login-right"
						>
							{user}
						</span>
						{followButtonForLikes()}
					</div>
				);
			})}
		</>
	);
}

function whenAdded(time, short) {
	if (short) {
		return (
			<div className="short-when-added-and-likes">
				{formatDistanceToNow(time, { addSuffix: true })}
			</div>
		);
	} else {
		return <div className="added-div">{formatDistanceToNow(time, { addSuffix: true })}</div>;
	}
}

function PictureCard(props) {
	const [signedIn, setSignedIn] = useState(false);
	const [likes, setLikes] = useState({ num: 0, users: [] });
	const [comments, setComments] = useState([]);
	const [username, setUsername] = useState("bluberek");
	const [description, setDescription] = useState("Drop a if you’re ready to go on this ride with us this month");
	const [avatar, setAvatar] = useState(ava);
	const [date, setDate] = useState(new Date());

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

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
		ReactDOM.render(
			<PictureCardNumOfLikesSection likes={likes} />,
			document.getElementById("number-of-likes-section-modal")
		);
		ReactDOM.render(
			<PictureCardIconsSection likePicture={likePicture} likes={likes} modal="modal" />,
			document.getElementById("icons-in-comments-section-modal")
		);
	}, [likes]);

	useEffect(() => {
		ReactDOM.render(
			<Comments removeComment={removeComment} likeComment={likeComment} comments={comments} />,
			document.getElementById("container-for-comments-in-modal")
		);
		ReactDOM.render(
			<AddCommentSection addComment={addComment} />,
			document.getElementById("div-for-comment-section-in-comment-modal")
		);
	}, [comments]);

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
						/>
					</section>

					<section className="number-of-likes-section">
						<PictureCardNumOfLikesSection likes={likes} />
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
					/>
					{whenAdded(date)}
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
	PictureCardIconsSection,
	whenAdded,
	AddCommentSection,
	likeCommentIcon,
	shareIcon,
};
