import "../styles/Home.css";
import PictureCard from "./PictureCard.js";
import ava from "../img/ava.jpeg";
import uniqid from "uniqid";
import { dropDown, hideDropDown } from "./DropDown";
import { showSignUpModal } from "./Modals/SignUpModal";
import { showSignInModal } from "./Modals/SignInModal";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home(props) {
	const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.user.signedIn);
	const following = useSelector((state) => state.user.following);
	const username = useSelector((state) => state.user.username);
	const avatar = useSelector((state) => state.user.avatar);
	const users = useSelector((state) => state.usersAndPosts.users);
	const posts = useSelector((state) => state.usersAndPosts.posts);

	let num = 0;
	let num2 = 0;

	useEffect(() => {
		const sugDivLeft = document.getElementById("suggestions-left-div");
		const sugDivLeftInner = document.getElementById("suggestions-left-inner-div");
		const sugDivRight = document.getElementById("suggestions-div-right");

		if (sugDivLeftInner.childElementCount < 1) {
			sugDivLeft.style.display = "none";
			sugDivRight.style.display = "none";
		} else if (signedIn) {
			if (window.innerWidth < 1000) {
				sugDivLeft.style.display = "flex";
				sugDivRight.style.display = "none";
			} else if (signedIn) {
				sugDivRight.style.display = "flex";
				sugDivLeft.style.display = "none";
			}
		} else if (!signedIn) {
			sugDivLeft.style.display = "none";
			sugDivRight.style.display = "none";
		}
	});

	function RightProfilePannel() {
		if (!signedIn) {
			return (
				<div className="visible" id="right-div-for-buttons">
					<button onClick={() => showSignUpModal()} className="sign-login-butt">
						Sign Up
					</button>
					<button onClick={() => showSignInModal()} className="sign-login-butt">
						Sign In
					</button>
				</div>
			);
		} else {
			return (
				<div className="visible" id="home-right-profile-inner">
					<Link to={`/profile/${username}`}>
						<div id="right-avatar-div">
							<img className="right-ava" src={avatar ? avatar : ava} alt="" />
						</div>
					</Link>
					<Link to={`/profile/${username}`}>
						<div id="right-login-div">
							<span id="right-login-div-top-span">{username}</span>
						</div>
					</Link>
				</div>
			);
		}
	}

	function LeftSignInPannel() {
		if (!signedIn) {
			return (
				<div className="mobile" id="home-left-button-div">
					<button onClick={() => showSignUpModal()} className="sign-login-butt">
						Sign Up
					</button>
					<button onClick={() => showSignInModal()} className="sign-login-butt">
						Sign In
					</button>
				</div>
			);
		}
	}

	function displayPosts() {
		if (signedIn) {
			return posts.map((post) => {
				if (following.includes(post.username) || post.username === username) {
					return (
						<PictureCard
							key={uniqid()}
							follow={props.follow}
							unFollow={props.unFollow}
							post={post}
							likePicture={props.likePicture}
							addComment={props.addComment}
							likeComment={props.likeComment}
						></PictureCard>
					);
				}
			});
		} else {
			return posts.map((post) => {
				return (
					<PictureCard
						key={uniqid()}
						follow={props.follow}
						unFollow={props.unFollow}
						post={post}
						likePicture={props.likePicture}
						addComment={props.addComment}
						likeComment={props.likeComment}						
					></PictureCard>
				);
			});
		}
	}

	return (
		<main>
			<section id="home-section">
				<div id="home-left-div">
					<div id="home-left-inner">
						{LeftSignInPannel()}
						<div className="not-visible" id="suggestions-left-div">
							<span id="for-you-sug-span-left">Suggestions For You</span>
							<div id="suggestions-left-inner-div">
								{users.map((user) => {
									if (
										!following.includes(user.username) &&
										num < 3 &&
										user.username !== username &&
										user.posts.length > 0 &&
										username !== ""
									) {
										num++;
										return (
											<div key={uniqid()} className="sug-box-left">
												<Link to={`/profile/${user.username}`}>
													<img
														className="sug-box-left-ava"
														src={user.avatar ? user.avatar : ava}
														alt=""
													/>
												</Link>
												<Link to={`/profile/${user.username}`}>
													<span style={{ marginBottom: "10px" }}>{user.username}</span>
												</Link>
												<button
													onClick={(e) => props.follow(user.username)}
													className="sug-box-left-follow"
												>
													Follow
												</button>
											</div>
										);
									}
								})}
							</div>
						</div>
						{displayPosts()}
					</div>
				</div>

				<div id="home-right-div">
					<div id="home-right-profile">{RightProfilePannel()}</div>
					<div className="not-visible" id="suggestions-div-right">
						<span id="for-you-sug-span">Suggestions For You</span>
						<div id="list-of-sug-div">
							{users.map((user) => {
								if (
									!following.includes(user.username) &&
									num2 < 5 &&
									user.username !== username &&
									user.posts.length > 0 &&
									username !== ""
								) {
									num2++;
									return (
										<div key={uniqid()} className="right-sug-div-list">
											<Link to={`/profile/${user.username}`}>
												<div
													onMouseEnter={(e) => {
														dropDown(user, dispatch, e, "avaPic", "right");
													}}
													onMouseLeave={() => hideDropDown()}
													className="right-sug-ava-div"
												>
													<img
														onClick={() => hideDropDown()}
														className="ava-img-sug"
														src={user.avatar ? user.avatar : ava}
														alt=""
													/>
												</div>
											</Link>
											<Link to={`/profile/${user.username}`}>
												<span
													onClick={() => hideDropDown()}
													onMouseEnter={(e) =>
														dropDown(user, dispatch, e, "no", "right")
													}
													onMouseLeave={() => hideDropDown()}
													className="sug-login-right"
												>
													{user.username}
												</span>
											</Link>
											<button
												onClick={(e) => {
													props.follow(user.username);
													hideDropDown();
												}}
												className="sug-right-follow"
											>
												Follow
											</button>
										</div>
									);
								}
							})}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

function followMobile(e) {
	if (e.currentTarget.textContent === "Follow") {
		e.currentTarget.classList.add("sug-box-left-follow-active");
		e.currentTarget.textContent = "Following";
	} else if (e.currentTarget.textContent === "Following") {
		e.currentTarget.classList.remove("sug-box-left-follow-active");
		e.currentTarget.textContent = "Follow";
	}
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

function getPostDataFromPostsArray(array, postId) {
	let postData;

	array.forEach((post) => {
		if (post.id === postId) {
			postData = post;
		}
	});
	return postData;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export default Home;
export { followMobile, shuffleArray, getUserDataFromUsersArray, getPostDataFromPostsArray };
