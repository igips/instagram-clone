import "../styles/Nav.css";
import ava from "../img/ava.jpeg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { getUserDataFromUsersArray } from "./PictureCard";

function showSignInModal() {
	const modal = document.getElementById("login-modal");
	if (!window.location.href.includes("signInM")) {
		window.history.pushState("signInM", "Title", "signInM");
	}

	modal.style.display = "flex";
}

function messageIconNotClicked() {
	const svgDiv = document.getElementById("message-icon-svg");

	svgDiv.innerHTML =
		'<line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line> <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>';
}

function homeIconNotClicked() {
	const homeSvg = Array.from(document.getElementsByClassName("home-icon"));

	homeSvg.forEach((icon) => {
		icon.style.fill = "none";
	});
}

function notificationIconNotClicked() {
	const notifiIcon = Array.from(document.getElementsByClassName("notification-svg"));

	notifiIcon.forEach((icon) => {
		icon.innerHTML =
			'<svg aria-label="Activity" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>';
	});
}

function searchIconNotClicked() {
	const searchIconDiv = document.getElementById("search-icon-div");

	searchIconDiv.innerHTML =
		'<svg aria-label="Search &amp; Explore" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>';
}

function avatarIconNotClicked() {
	const avatarBorder = Array.from(document.getElementsByClassName("border-for-avatar"));

	avatarBorder.forEach((border) => {
		border.style.display = "none";
	});
}

function messageIconClicked() {
	const svgDiv = document.getElementById("message-icon-svg");

	svgDiv.innerHTML =
		'<path d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692" fill-rule="evenodd"></path>';
}

function notificationIconClicked() {
	const notifiIcon = Array.from(document.getElementsByClassName("notification-svg"));

	notifiIcon.forEach((icon) => {
		icon.innerHTML =
			'<svg aria-label="Activity Feed"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>';
	});
}

function searchIconClicked() {
	const searchIconDiv = document.getElementById("search-icon-div");

	searchIconDiv.innerHTML =
		'<svg aria-label="Search &amp; Explore"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M47.6 44L35.8 32.2C38.4 28.9 40 24.6 40 20 40 9 31 0 20 0S0 9 0 20s9 20 20 20c4.6 0 8.9-1.6 12.2-4.2L44 47.6c.6.6 1.5.6 2.1 0l1.4-1.4c.6-.6.6-1.6.1-2.2zM20 35c-8.3 0-15-6.7-15-15S11.7 5 20 5s15 6.7 15 15-6.7 15-15 15z"></path></svg>';
}

function homeIconClicked() {
	const homeSvg = Array.from(document.getElementsByClassName("home-icon"));

	homeSvg.forEach((icon) => {
		icon.style.fill = "black";
	});
}

function avatarIconClicked() {
	const avatarBorder = Array.from(document.getElementsByClassName("border-for-avatar"));

	avatarBorder.forEach((border) => {
		border.style.display = "block";
	});
}

function searchIcon() {
	const searchModal = document.getElementById("search-modal-container");

	searchIconClicked();
	homeIconNotClicked();
	messageIconNotClicked();
	notificationIconNotClicked();
	avatarIconNotClicked();
	searchModal.style.display = "flex";
	if (!window.location.href.includes("searchM")) {
		window.history.pushState("searchM", "Title", "searchM");
	}

	//const user = getAuth().currentUser;
	// if (user) {
	// messageIconNotClicked();
	// notificationIconNotClicked();
	// avatarIconNotClicked();
	// } else {
	// }
}

function mobileNotificationIcon(e) {
	const user = getAuth().currentUser;

	const notiModal = document.getElementById("notification-modal-container");

	if (user) {
		notificationIconClicked();
		messageIconNotClicked();
		homeIconNotClicked();
		searchIconNotClicked();
		avatarIconNotClicked();
		notiModal.style.display = "flex";
		if (!window.location.href.includes("notiM")) {
			window.history.pushState("notiM", "Title", "notiM");
		}

	} else {
		showSignInModal();
	}
}

function notificationIcon(e) {
	const user = getAuth().currentUser;

	if (user) {
		if (
			document.getElementById("notification-arrow-div").style.display === "flex" &&
			(e.target.tagName === "svg" || e.target.tagName === "path")
		) {
			closeNotification();
		} else {
			notificationIconClicked();
			messageIconNotClicked();
			homeIconNotClicked();
			searchIconNotClicked();
			avatarIconNotClicked();

			document.getElementById("notification-arrow-div").style.display = "flex";
			document.getElementById("notification-div").style.display = "flex";
		}
	} else {
		showSignInModal();
	}
}

function homeIcon() {
	homeIconClicked();
	searchIconNotClicked();
	messageIconNotClicked();
	notificationIconNotClicked();
	avatarIconNotClicked();
}

function messageIcon() {
	const user = getAuth().currentUser;

	if (user) {
		messageIconClicked();
		homeIconNotClicked();
		notificationIconNotClicked();
		searchIconNotClicked();
		avatarIconNotClicked();
	} else {
		showSignInModal();
	}
}

function avatarIcon() {
	avatarIconClicked();
	messageIconNotClicked();
	homeIconNotClicked();
	notificationIconNotClicked();
	searchIconNotClicked();
}

function addPostIcon() {
	const user = getAuth().currentUser;

	if (user) {
	} else {
		showSignInModal();
	}
}

function closeNotification() {
	if (
		window.location.href === "http://localhost:3000/" ||
		window.location.href === "http://localhost:3000/commentsM" ||
		window.location.href === "http://localhost:3000/optionsM" ||
		window.location.href === "http://localhost:3000/likesM" ||
		window.location.href === "http://localhost:3000/shareM"
	) {
		homeIcon();
	}
	document.getElementById("notification-div").style.display = "none";
	document.getElementById("notification-arrow-div").style.display = "none";
}

async function searchFunction(value) {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	const results = [];

	data.forEach((doc) => {
		if (doc.data().username.toLowerCase().includes(value.toLowerCase())) {
			results.push(doc.data().username);
		}
	});

	return results;
}

function followButtonForNoti(user, following, username, follow, unFollow) {
	if (!following.includes(user) && user !== username) {
		return (
			<button
				onClick={() => {
					follow(user);
				}}
				className="likes-modal-follow"
			>
				Follow
			</button>
		);
	} else if (following.includes(user)) {
		return (
			<button
				onClick={() => {
					unFollow(user);
				}}
				className="likes-modal-follow sug-box-left-follow-active"
			>
				Following
			</button>
		);
	}
}

function Nav(props) {
	const [avatar, setAvatar] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		window.addEventListener("click", (e) => {
			let found = false;

			if (document.getElementById("search-results-div").style.display === "flex") {
				e.path.forEach((ele) => {
					if (ele.id === "search-div") {
						found = true;
					}
				});

				if (!found) {
					cancelSearch();
				}
			} else if (document.getElementById("notification-arrow-div").style.display === "flex") {
				e.path.forEach((ele) => {
					if (ele.id === "noti-icon") {
						found = true;
					}
				});

				if (!found) {
					closeNotification();
				}
			}
		});
	}, []);

	useEffect(() => {
		if (props.unReadNoti === 0) {
			document.getElementById("noti-amount").style.display = "none";
			document.getElementById("noti-amount-mobile").style.display = "none";
		} else {
			document.getElementById("noti-amount").style.display = "flex";
			document.getElementById("noti-amount-mobile").style.display = "flex";
		}
	}, [props.unReadNoti]);

	useEffect(() => {
		if (props.notifications.length === 0) {
			document.getElementById("no-notifications").style.display = "flex";
		} else {
			document.getElementById("no-notifications").style.display = "none";
		}
	}, [props.notifications]);

	function cancelSearch() {
		setSearchResults([]);
		setSearchValue("");
		document.getElementById("search-arrow-div").style.display = "none";
		document.getElementById("search-results-div").style.display = "none";
		document.getElementById("not-found").style.display = "none";
		document.getElementById("close-search-result-div").style.display = "none";
	}

	function handleSearch(e) {
		const searchArrowDiv = document.getElementById("search-arrow-div");
		const searchResultsDiv = document.getElementById("search-results-div");
		const notFound = document.getElementById("not-found");
		const spinner = document.getElementById("spinner");
		const smallSpinner = document.getElementById("small-spinner");
		const closeSearch = document.getElementById("close-search-result-div");

		function hideSearchResultDiv() {
			setSearchResults([]);
			searchArrowDiv.style.display = "none";
			searchResultsDiv.style.display = "none";
			notFound.style.display = "none";
			closeSearch.style.display = "none";
		}

		setSearchValue(e.target.value);

		if (e.target.value !== "") {
			if (searchResults.length === 0 && notFound.style.display === "none") {
				spinner.style.display = "flex";
			}

			closeSearch.style.display = "none";
			smallSpinner.style.display = "flex";

			searchFunction(e.target.value).then((result) => {
				smallSpinner.style.display = "none";
				spinner.style.display = "none";

				setSearchResults(result);

				result.length === 0 && e.target.value !== ""
					? (notFound.style.display = "flex")
					: (notFound.style.display = "none");

				closeSearch.style.display = "flex";
			});

			searchArrowDiv.style.display = "flex";
			searchResultsDiv.style.display = "flex";
		} else if (e.target.value === "") {
			hideSearchResultDiv();
		}
	}

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setAvatar(1);
		} else {
			setAvatar(0);
		}
	});

	function profileIcon() {
		const user = getAuth().currentUser;

		if (user) {
			return (
				<>
					<div className="border-for-avatar"> </div>
					<span
						onClick={() => avatarIcon()}
						role="link"
						tabIndex="0"
						style={{ width: "24px", height: "24px" }}
					>
						<img className="ava" alt="" crossOrigin="anonymous" draggable="false" src={ava} />
					</span>
				</>
			);
		} else {
			return (
				<svg
					onClick={() => showSignInModal()}
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 512 512"
					height="24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="40"
						d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
					></path>
					<path
						fill="none"
						strokeMiterlimit="10"
						strokeWidth="40"
						d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
					></path>
				</svg>
			);
		}
	}

	return (
		<>
			<nav id="top-nav">
				<div className="nav-container">
					<div className="nav-inner-container">
						<div onClick={() => homeIcon()} id="logo">
							<span id="logo-span">Fakegram</span>
						</div>
						<div id="search-div">
							<input
								value={searchValue}
								onChange={(e) => handleSearch(e)}
								autoComplete="off"
								id="search-input"
								className="search-input"
								type="text"
								placeholder="Search"
							/>
							<div
								onClick={() => cancelSearch()}
								id="close-search-result-div"
								style={{ display: "none" }}
							>
								<FontAwesomeIcon icon={faCircleXmark} />
							</div>
							<div id="small-spinner" style={{ display: "none" }}>
								<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
							</div>
							<div id="search-arrow-div"></div>
							<div id="search-results-div">
								<div id="spinner">
									<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
								</div>
								<div style={{ display: "none" }} id="not-found">
									No results found
								</div>
								{searchResults.map((result) => {
									return (
										<div key={uniqid()} className="share-modal-single-result">
											<img src={ava} alt="" />
											<span>{result}</span>
										</div>
									);
								})}
							</div>
						</div>
						<div id="icon-div">
							<div onClick={() => homeIcon()} className="icon-inner-div icon-to-hide">
								<svg
									aria-label="Home"
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
								>
									<path
										className="svh-path home-icon"
										d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
										fill="black"
										stroke="currentColor"
										strokeLinejoin="round"
										strokeWidth="2"
									></path>
								</svg>
							</div>
							<div onClick={() => messageIcon()} className="icon-inner-div">
								<svg
									id="message-icon-svg"
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
							</div>
							<div onClick={() => addPostIcon()} className="icon-inner-div icon-to-hide">
								<svg
									aria-label="New Post"
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
								>
									<path
										d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									></path>
									<line
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										x1="6.545"
										x2="17.455"
										y1="12.001"
										y2="12.001"
									></line>
									<line
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										x1="12.003"
										x2="12.003"
										y1="6.545"
										y2="17.455"
									></line>
								</svg>
							</div>
							<div
								id="noti-icon"
								onClick={(e) => {
									notificationIcon(e);
									props.clearNotifications();
								}}
								className="icon-inner-div icon-to-hide icon-relative"
							>
								<div id="noti-amount">{props.unReadNoti}</div>
								<div id="notification-arrow-div"></div>
								<div id="notification-div">
									<div id="no-notifications">No notifications</div>
									{props.notifications
										.slice(0)
										.reverse()
										.map((result) => {
											return (
												<div key={uniqid()} className="noti-modal-single-result">
													<img src={ava} alt="" />
													<span>{result.username}</span>
													<span>&nbsp;</span>
													<span className="noti-content">{result.content}</span>
													<span>&nbsp;</span>
													<span className="noti-date">
														<ReactTimeAgo
															timeStyle="mini-minute-now"
															date={new Date(result.date)}
															locale="en-US"
														/>
													</span>
													{followButtonForNoti(result.username, props.following, props.username, props.follow, props.unFollow)}
												</div>
											);
										})}
								</div>
								<div className="notification-svg svg-div">
									<svg
										aria-label="Activity Feed"
										color="#262626"
										fill="#262626"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
									>
										<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
									</svg>
								</div>
							</div>
							<div className="icon-inner-div icon-to-hide">{profileIcon()}</div>
						</div>
					</div>
				</div>
			</nav>
			<nav id="bottom-nav">
				<div className="nav-container-bottom">
					<div onClick={() => homeIcon()} className="icon-inner-div inner-bottom">
						<svg
							aria-label="Home"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								className="svh-path home-icon"
								d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
								fill="black"
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
						</svg>
					</div>
					<div onClick={() => searchIcon()} id="search-icon-div" className="icon-inner-div inner-bottom">
						<svg
							aria-label="Search &amp; Explore"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="16.511"
								x2="22"
								y1="16.511"
								y2="22"
							></line>
						</svg>
					</div>
					<div onClick={() => addPostIcon()} className="icon-inner-div inner-bottom">
						<svg
							aria-label="New Post"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="6.545"
								x2="17.455"
								y1="12.001"
								y2="12.001"
							></line>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="12.003"
								x2="12.003"
								y1="6.545"
								y2="17.455"
							></line>
						</svg>
					</div>

					<div id="mobile-noti-icon" onClick={(e) => {mobileNotificationIcon(e); props.clearNotifications()}} className="icon-inner-div inner-bottom">
						<div id="noti-amount-mobile"></div>
						<div className="notification-svg svg-div">
							<svg
								aria-label="Activity Feed"
								color="#262626"
								fill="#262626"
								height="24"
								role="img"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
							</svg>
						</div>
					</div>
					<div className="icon-inner-div inner-bottom">{profileIcon()}</div>
				</div>
			</nav>
		</>
	);
}

export default Nav;
export { homeIcon, showSignInModal, searchFunction, followButtonForNoti };
