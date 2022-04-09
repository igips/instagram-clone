import "../styles/Home.css";
import PictureCard from "./PictureCard.js";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import ava from "../img/ava.jpeg";
import { homeIcon, showSignInModal } from "./Nav";
import testPic from "../img/test-img.jpg";
import uniqid from "uniqid";
import ReactDOM from "react-dom";
import { useState } from "react";

function dropDown(userData, following, follow, unFollow, e, ele, right) {
	if (window.innerWidth > 650) {
		const user = getAuth().currentUser;
		const dropDown = document.getElementById("drop-down");
		const rect = e.target.getBoundingClientRect();

		ReactDOM.render(
			<DropDown
				right={right}
				username={userData.username}
				following={following}
				follow={follow}
				unFollow={unFollow}
				userData={userData}
			/>,
			document.getElementById("drop-down")
		);

		if (user) {
			document.getElementById("drop-down-inner-fourth").style.display = "flex";
		} else {
			document.getElementById("drop-down-inner-fourth").style.display = "none";
		}

		dropDown.style.display = "flex";
		dropDown.style.left = rect.left + "px";
		dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) + (ele === "avaPic" ? 25 : 18) + "px";
		dropDown.style.position = right ? "fixed" : "absolute";

		if (window.innerHeight - dropDown.getBoundingClientRect().bottom < 0) {
			dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) - (user ? 350 : 290) + "px";
		}

		if (window.innerWidth - dropDown.getBoundingClientRect().left <= 390) {
			dropDown.style.left =
				rect.left - (410 - (window.innerWidth - dropDown.getBoundingClientRect().left)) + "px";
		}
	}
}

function showSignUpModal() {
	const modal = document.getElementById("register-modal");

	if (!window.location.href.includes("signUpM")) {
		window.history.pushState("signUpM", "Title", "signUpM");
	}
	modal.style.display = "flex";
}

function hideDropDown() {
	const dropDown = document.getElementById("drop-down");

	if (dropDown) {
		dropDown.style.display = "none";
	}
}

function keepDropDown() {
	const dropDown = document.getElementById("drop-down");
	dropDown.style.display = "flex";
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

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function DropDown(props) {
	const [signedIn, setSignedIn] = useState(false);
	const user = getAuth().currentUser;

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	function button() {
		if (signedIn) {
			if (props.userData.uid === user.uid) {
				return <button className="drop-down-button">Edit Profile</button>;
			} else if (!props.following.includes(props.username)) {
				return (
					<button onClick={() => props.follow(props.username, props.right)} id="drop-down-button">
						Follow
					</button>
				);
			} else {
				return (
					<>
						<button className="drop-down-button">Message</button>{" "}
						<button
							onClick={() => props.unFollow(props.username)}
							id="drop-down-following-button"
							className="drop-down-button"
						>
							Unfollow
						</button>
					</>
				);
			}
		}
	}

	return (
		<>
			<div className="drop-down-inner-first">
				<img id="drop-down-ava" src={ava} alt="" />
				<span id="drop-down-username">{props.userData.username}</span>
			</div>
			<div className="drop-down-inner-second">
				<div className="drop-down-inner-second-inner">
					<span id="drop-down-num-of-posts">{props.userData.posts.length}</span>
					<span>posts</span>
				</div>
				<div className="drop-down-inner-second-inner">
					<span id="drop-down-num-of-followers">{props.userData.followers.length}</span>
					<span>followers</span>
				</div>
				<div className="drop-down-inner-second-inner">
					<span id="drop-down-num-of-following">{props.userData.following.length}</span>
					<span>following</span>
				</div>
			</div>
			<div className="drop-down-inner-third">
				<img src={testPic} alt="" />
				<img src={testPic} alt="" />
				<img src={testPic} alt="" />
			</div>
			<div id="drop-down-inner-fourth">{button()}</div>
		</>
	);
}

function Home(props) {
	let num = 0;
	let num2 = 0;

	
	return (
		<main>
			<section id="home-section">
				<div id="home-left-div">
					<div id="home-left-inner">
						<div className="mobile" id="home-left-button-div">
							<button onClick={() => showSignUpModal()} className="sign-login-butt">
								Sign Up
							</button>
							<button onClick={() => showSignInModal()} className="sign-login-butt">
								Sign In
							</button>
						</div>
						<div className="not-visible" id="suggestions-left-div">
							<span id="for-you-sug-span-left">Suggestions For You</span>
							<div id="suggestions-left-inner-div">
								{props.users.map((user) => {
									if (!props.following.includes(user.username) && num < 3 && user.username !== props.username) {
										num++;
										return (
											<div key={uniqid()} className="sug-box-left">
												<img className="sug-box-left-ava" src={ava} alt="" />
												<span style={{ marginBottom: "10px" }}>{user.username}</span>
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

						<PictureCard
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={props.username}
						></PictureCard>
						<PictureCard
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={props.username}
						></PictureCard>
						<PictureCard
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={props.username}
						></PictureCard>
					</div>
				</div>

				<div id="home-right-div">
					<div id="home-right-profile">
						<div className="visible" id="right-div-for-buttons">
							<button onClick={() => showSignUpModal()} className="sign-login-butt">
								Sign Up
							</button>
							<button onClick={() => showSignInModal()} className="sign-login-butt">
								Sign In
							</button>
						</div>
						<div className="not-visible" id="home-right-profile-inner">
							<div id="right-avatar-div">
								<img className="right-ava" src={ava} alt="" />
							</div>
							<div id="right-login-div">
								<span id="right-login-div-top-span"></span>
							</div>
						</div>
					</div>
					<div className="not-visible" id="suggestions-div-right">
						<span id="for-you-sug-span">Suggestions For You</span>
						<div id="list-of-sug-div">
							{props.users.map((user) => {
								if (!props.following.includes(user.username) && num2 < 5 && user.username !== props.username) {
									num2++;
									return (
										<div key={uniqid()} className="right-sug-div-list">
											<div
												onMouseEnter={(e) =>
													dropDown(user, props.following, props.follow, props.unFollow, e, "avaPic", "right")
												}
												onMouseLeave={() => hideDropDown()}
												className="right-sug-ava-div"
											>
												<img className="ava-img-sug" src={ava} alt="" />
											</div>
											<span
												onMouseEnter={(e) =>
													dropDown(user, props.following, props.follow, props.unFollow, e, "no", "right")
												}
												onMouseLeave={() => hideDropDown()}
												className="sug-login-right"
											>
												{user.username}
											</span>
											<button onClick={(e) => props.follow(user.username)} className="sug-right-follow">
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

export default Home;
export { dropDown, hideDropDown, keepDropDown, followMobile, showSignUpModal, shuffleArray, DropDown };
