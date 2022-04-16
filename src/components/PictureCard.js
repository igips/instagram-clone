import React, { useState, useEffect, useRef } from "react";
import ReactDOM, { render } from "react-dom";
import uniqid from "uniqid";
import "../styles/PictureCard.css";
import ReactTimeAgo from "react-time-ago";
import Picker from "emoji-picker-react";
import { dropDown, hideDropDown } from "./DropDown";
import { likeCommentIcon, likeCommentIconClicked, likeIcon, likeIconClicked } from "./Icons/LikeIcon";
import { shareIcon } from "./Icons/ShareIcon";
import { showLikesModal } from "./Modals/LikesModal";
import { EmojiiIcon } from "./Icons/EmojiiIcon";
import { options } from "./Modals/OptionsModal";
import { OptionsIcon } from "./Icons/OptionsIcon";
import { getUserDataFromUsersArray } from "./Home";
import { CommentIcon } from "./Icons/CommentIcon";
import { showCommentsModal } from "./Modals/CommentsModal";
import { tagPosition } from "./Modals/AddPostModal";
import { TagIcon } from "./Icons/TagIcon";
import { useSwipeable } from "react-swipeable";
import { LeftArrow, RightArrow } from "./Icons/ArrowIcons";

function PictureCard(props) {
	const [img, setImg] = useState(props.post.pic);
	const [imgIndex, setImgIndex] = useState(0);
	const [id, setId] = useState(uniqid());

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (img.length > 1 && imgIndex !== img.length - 1) {
				nextPic();
			}
		},
		onSwipedRight: () => {
			if (img.length > 1 && imgIndex !== 0) {
				prevPic();
			}
		},
	});

	useEffect(() => {
		const container = document.getElementById("pc-pic-container" + id);
		const pics = Array.from(container.childNodes);

		if(imgIndex === 0) {
			pics[0].style.display = "flex";

		} else if(imgIndex === 1) {
			pics[1].style.display = "flex";

		} else if (imgIndex === 2) {
			pics[2].style.display = "flex";
		}

	},[imgIndex])

	useEffect(() => {
		handleArrows();
	}, [img,imgIndex]);

	useEffect(() => {
		if (img[imgIndex].tags.length > 0) {
			document.getElementById("tag-ico" + id).style.display = "flex";

		} else {
			document.getElementById("tag-ico" + id).style.display = "none";
		}
	}, [imgIndex]);

	useEffect(() => {
		handleDots();
		
	});

	function handleDots() {
		const dotDiv = document.getElementById("slider-dots-div-pc" + id);
		const dots = Array.from(dotDiv.childNodes);

		if (imgIndex === 0) {
			if (dots[1]) {
				dots[1].style.background = "#a8a8a8";
			}
			if (dots[2]) {
				dots[2].style.background = "#a8a8a8";
			}
			dots[0].style.background = "#0095f6";
		} else if (imgIndex === 1) {
			dots[0].style.background = "#a8a8a8";
			if (dots[2]) {
				dots[2].style.background = "#a8a8a8";
			}
			dots[1].style.background = "#0095f6";
		} else if (imgIndex === 2) {
			dots[0].style.background = "#a8a8a8";
			dots[1].style.background = "#a8a8a8";
			dots[2].style.background = "#0095f6";
		}

		if (img.length > 1) {
			dotDiv.style.display = "flex";
		} else if (img.length === 1) {
			dotDiv.style.display = "none";
		}
	}

	function handleArrows() {
		const leftArrow = document.getElementById("pc-left-arrow" + id);
		const rightArrow = document.getElementById("pc-right-arrow" + id);

		if (img.length > 1 && imgIndex !== 0) {
			leftArrow.style.display = "flex";
		} else {
			leftArrow.style.display = "none";
		}

		if (img.length > 1 && imgIndex !== img.length - 1) {
			rightArrow.style.display = "flex";
		} else {
			rightArrow.style.display = "none";
		}
	}

	function nextPic() {
		setImgIndex(imgIndex + 1);
	}

	function prevPic() {
		setImgIndex(imgIndex - 1);
	}

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
					users={props.users}
					follow={props.follow}
					unFollow={props.unFollow}
					following={props.following}
					username={props.post.username}
					avatar={props.post.avatar}
					dropDownSetUserData={props.dropDownSetUserData}
					optionsModalSetUserData={props.optionsModalSetUserData}
					setpostIdOptionsModal={props.setpostIdOptionsModal}
					postId={props.post.id}
				/>
			</div>
			<div className="picture-div">
				<div {...handlers} className="picture-div-inner">
					<div id={"pc-pic-container" + id}>
						{img.map((i) => {
							return (
								<img key={uniqid()} className="main-picture" src={i.src} alt="" />
							)
							
						})}
					</div>
					<img className="main-picture" src={img[imgIndex].src} alt="" />
					<div id={"tag-cont" + id} className="tag-container-picture-card">
						{img[imgIndex].tags.map((tag) => {
							return (
								<div key={uniqid()} style={tagPosition(tag)} className="tag-div-picture-card">
									<span>{tag.username}</span>
								</div>
							);
						})}
					</div>
					<div style={{ left: "50%" }} className="slider-dots-div" id={"slider-dots-div-pc" + id}>
						{img.map((img) => {
							return <div className={"slider-dot-pc"} key={uniqid()}></div>;
						})}
					</div>
					<div style={{top: "50%"}} onClick={() => prevPic()} id={"pc-left-arrow" + id} className="left-arrow">
						{LeftArrow()}
					</div>
					<div style={{top: "50%"}} onClick={() => nextPic()} id={"pc-right-arrow" + id} className="right-arrow">
						{RightArrow()}
					</div>
					<div onClick={() => showTags()} id={"tag-ico" + id} className="tag-icon-container">
						{TagIcon()}
					</div>
				</div>
			</div>
			<div className="comments-div">
				<div className="comments-inner-div">
					<section className="icons-in-comments-section">
						<PictureCardIconsSection
							likes={props.post.likes}
							likePicture={props.likePicture}
							postId={props.post.id}
							yourUsername={props.yourUsername}
							commModalSetPostId={props.commModalSetPostId}
						/>
					</section>

					<section className="number-of-likes-section">
						<PictureCardNumOfLikesSection
							likes={props.post.likes}
							likesModalSetLikes={props.likesModalSetLikes}
						/>
					</section>

					<PictureCardCommentsSection
						comments={props.post.comments}
						username={props.post.username}
						description={props.post.description}
						yourUsername={props.yourUsername}
						users={props.users}
						dropDownSetUserData={props.dropDownSetUserData}
						likeComment={props.likeComment}
						postId={props.post.id}
						commModalSetPostId={props.commModalSetPostId}
					/>
					<div className="added-div">
						<ReactTimeAgo date={props.post.date} locale="en-US" />
					</div>
					<AddCommentSection
						yourUsername={props.yourUsername}
						postId={props.post.id}
						signedIn={props.signedIn}
						addComment={props.addComment}
					/>
				</div>
			</div>
		</div>
	);
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
			<span onClick={() => showLikesModal(props.likes, props.likesModalSetLikes)} className="likes-span">
				{showLikes(props.likes)}
			</span>
		</div>
	);
}

function AddCommentSection(props) {
	const [id, setId] = useState(uniqid());
	const [commentValue, setCommentValue] = useState("");

	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById(id + "button");

		if (button.classList.contains("post-div-active")) {
			props.addComment(
				{
					username: props.yourUsername,
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

	if (props.signedIn) {
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
										props.dropDownSetUserData,
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
						</div>
					</div>
					<div className="picture-card-name-div">
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
							className="name-span"
							id={props.username ? "" : "comments-modal-id-div"}
						>
							{props.username}
						</span>
					</div>
				</header>
				<div
					onClick={() => {
						options(getUserDataFromUsersArray(props.users, props.username), props.optionsModalSetUserData);
						props.setpostIdOptionsModal(props.postId);
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
	function viewAllComments() {
		if (props.comments.length > 2) {
			return (
				<div className="comment-line-div">
					<span
						onClick={() => showCommentsModal(props.postId, props.commModalSetPostId)}
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
									props.dropDownSetUserData,
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
											props.dropDownSetUserData,
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
								onClick={() => likeCommentIcon(props.likeComment, comment.id, props.postId)}
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

function PictureCardIconsSection(props) {
	function commentsIcon() {
		if (!props.modal) {
			return (
				<span
					onClick={() => showCommentsModal(props.postId, props.commModalSetPostId)}
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
				{likeIconClicked(props.likes, props.yourUsername)}
			</span>
			{commentsIcon()}
			{shareIcon()}
		</>
	);
}

export default PictureCard;
export { PictureCardHeader, AddCommentSection, PictureCardIconsSection, PictureCardNumOfLikesSection };
