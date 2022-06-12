import "../styles/Nav.css";
import ava from "../img/ava.jpeg";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { searchFunction } from "..";
import { avatarIcon, closeAvatar, ProfileIconDrop, ProfileIconSvg } from "./Icons/ProfileIcon";
import {
	closeNotification,
	mobileNotificationIcon,
	notificationIcon,
	NotificationIconSvg,
} from "./Icons/NotificationIcon";
import { homeIcon, HomeIconSvg } from "./Icons/HomeIcon";
import { messageIcon, messageIconNotClicked, MessageIconSvg } from "./Icons/MessageIcon";
import { addPostIcon, AddPostIconSvg } from "./Icons/AddPostIcon";
import { searchIcon, SearchIconSvg } from "./Icons/SearchIcon";
import { Link } from "react-router-dom";
import { showCommentsModal } from "./Modals/CommentsModal";
import { getUserDataFromUsersArray } from "./Home";
import { useDispatch, useSelector } from "react-redux";

function Nav(props) {
	const dispatch = useDispatch();
	const [flag, setFlag] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const signedIn = useSelector((state) => state.user.signedIn);
	const following = useSelector((state) => state.user.following);
	const username = useSelector((state) => state.user.username);
	const notifications = useSelector((state) => state.user.notifications);
	const unReadMessages = useSelector((state) => state.user.unReadMessages);
	const unReadNoti = useSelector((state) => state.user.unReadNoti);
	const avatar = useSelector((state) => state.user.avatar);
	const users = useSelector((state) => state.usersAndPosts.users);
	const posts = useSelector((state) => state.usersAndPosts.posts);



	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setFlag(1);
		} else {
			setFlag(0);
		}
	});

	useEffect(() => {
		window.addEventListener("click", (e) => {
			let found = false;

			if (document.getElementById("search-results-div").style.display === "flex") {
				e.composedPath().forEach((ele) => {
					if (ele.id === "search-div") {
						found = true;
					}
				});

				if (!found) {
					cancelSearch();
				}
			} else if (document.getElementById("notification-arrow-div").style.display === "flex") {
				e.composedPath().forEach((ele) => {
					if (ele.id === "noti-icon") {
						found = true;
					}
				});

				if (!found && document.getElementById("profile-arrow-div").style.display !== "flex") {
					closeNotification();
				}
			} else if (document.getElementById("profile-arrow-div").style.display === "flex") {
				e.composedPath().forEach((ele) => {
					if (ele.id === "profile-drop-div") {
						found = true;
					}
				});

				if (!found) {
					closeAvatar();
				}
			}
		});
	}, []);

	useEffect(() => {
		if (unReadNoti === 0) {
			document.getElementById("noti-amount").style.display = "none";
			document.getElementById("noti-amount-mobile").style.display = "none";
		} else {
			document.getElementById("noti-amount").style.display = "flex";
			document.getElementById("noti-amount-mobile").style.display = "flex";
		}
	}, [unReadNoti]);

	useEffect(() => {
		if (unReadMessages.length === 0 && signedIn) {
			document.getElementById("mess-amount").style.display = "none";
		} else if (signedIn) {
			document.getElementById("mess-amount").style.display = "flex";
		}
	}, [unReadMessages]);

	useEffect(() => {
		if (notifications.length === 0) {
			document.getElementById("no-notifications").style.display = "flex";
		} else {
			document.getElementById("no-notifications").style.display = "none";
		}
	}, [notifications]);

	function signOutFromAccount() {
		if (window.location.href.includes("inbox")) {
			document.getElementById("logo").click();
		}

		signOut(getAuth())
			.then(() => {
				// homeIcon();
			})
			.catch((error) => {});
	}

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

	function profileIcon() {
		const user = getAuth().currentUser;

		if (user) {
			return (
				<>
					<div onClick={(e) => avatarIcon(e)} className="border-for-avatar">
						{" "}
					</div>
					<span
						onClick={(e) => avatarIcon(e)}
						role="link"
						tabIndex="0"
						style={{ width: "24px", height: "24px" }}
					>
						<img className="ava" alt="" draggable="false" src={avatar ? avatar : ava} />
					</span>
				</>
			);
		} else {
			return ProfileIconSvg();
		}
	}

	function displayNotfications(data) {
		const userData = getUserDataFromUsersArray(users, data.username);

		if (data.postID) {
			return (
				<div className="noti-modal-single-result">
					<div
						className="noti-link"
						onClick={() => {
							for (let p of posts) {
								if (p.id === data.postID) {
									showCommentsModal(data.postID, dispatch);
									closeNotification();
									break;
								}
							}
						}}
					>
						<img src={userData.avatar ? userData.avatar : ava} alt="" />
						<span>{data.username}</span>
						<span>&nbsp;</span>
						<span className="noti-content">{data.content}</span>
						<span>&nbsp;</span>
						<span className="noti-date">
							<ReactTimeAgo timeStyle="mini-minute-now" date={new Date(data.date)} locale="en-US" />
						</span>
					</div>

					{followButtonForNoti(data.username, following, username, props.follow, props.unFollow)}
				</div>
			);
		} else {
			return (
				<>
					<div className="noti-modal-single-result">
						<Link className="noti-link" to={`/profile/${data.username}`}>
							<img src={userData.avatar ? userData.avatar : ava} alt="" />
							<span>{data.username}</span>
							<span>&nbsp;</span>
							<span className="noti-content">{data.content}</span>
							<span>&nbsp;</span>
							<span className="noti-date">
								<ReactTimeAgo timeStyle="mini-minute-now" date={new Date(data.date)} locale="en-US" />
							</span>
						</Link>
						{followButtonForNoti(
							data.username,
							following,
							username,
							props.follow,
							props.unFollow
						)}
					</div>
				</>
			);
		}
	}

	function messageButton() {
		if (signedIn) {
			return (
				<Link
					id="message-icon-div"
					onClick={() => messageIcon()}
					className="icon-inner-div icon-relative "
					to="/inbox"
				>
					<div id="mess-amount">{unReadMessages.length}</div>

					{MessageIconSvg()}
				</Link>
			);
		} else {
			return (
				<div id="message-icon-div" onClick={() => messageIcon()} className="icon-inner-div" to="/inbox">
					{MessageIconSvg()}
				</div>
			);
		}
	}

	return (
		<>
			<nav id="top-nav">
				<div className="nav-container">
					<div className="nav-inner-container">
						<Link id="logo" to="/">
							<div onClick={() => homeIcon()}>
								<span id="logo-span">Fakegram</span>
							</div>
						</Link>
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
									const userData = getUserDataFromUsersArray(users, result);
									return (
										<Link
											key={uniqid()}
											onClick={() => {
												cancelSearch();
												messageIconNotClicked();
											}}
											to={`/profile/${result}`}
										>
											<div key={uniqid()} className="share-modal-single-result">
												<img src={userData.avatar ? userData.avatar : ava} alt="" />
												<span>{result}</span>
											</div>
										</Link>
									);
								})}
							</div>
						</div>
						<div id="icon-div">
							<Link to="/">
								<div onClick={() => homeIcon()} className="icon-inner-div icon-to-hide">
									{HomeIconSvg()}
								</div>
							</Link>

							{messageButton()}

							<div onClick={() => addPostIcon()} className="icon-inner-div icon-to-hide">
								{AddPostIconSvg()}
							</div>

							<div
								id="noti-icon"
								onClick={(e) => {
									notificationIcon(e);
									props.clearNotifications();
								}}
								className="icon-inner-div icon-to-hide icon-relative"
							>
								<div id="noti-amount">{unReadNoti}</div>
								<div id="notification-arrow-div"></div>
								<div id="notification-div">
									<div id="no-notifications">No notifications</div>
									{notifications
										.slice(0)
										.reverse()
										.map((result) => {
											return <div key={uniqid()}>{displayNotfications(result)}</div>;
										})}
								</div>
								<div className="notification-svg svg-div">{NotificationIconSvg()}</div>
							</div>
							<div id="profile-drop-div" className="icon-inner-div icon-to-hide">
								<div id="profile-arrow-div"></div>
								<div id="profile-div">
									<Link to={`/profile/${username}`}>
										<div onClick={() => closeAvatar()} className="profile-drop-down-single-div">
											<div className="profile-drop-icon">{ProfileIconDrop()}</div>
											<div className="profile-drop-tex">Profile</div>
										</div>
									</Link>

									<div
										onClick={() => {
											signOutFromAccount();
											closeAvatar();
										}}
										className="profile-drop-down-single-div"
									>
										<div className="profile-drop-tex">Log Out</div>
									</div>
								</div>
								{profileIcon()}
							</div>
						</div>
					</div>
				</div>
			</nav>
			<nav id="bottom-nav">
				<div className="nav-container-bottom">
					<Link to="/" onClick={() => homeIcon()} className="icon-inner-div inner-bottom">
						{HomeIconSvg()}
					</Link>
					<div onClick={() => searchIcon()} id="search-icon-div" className="icon-inner-div inner-bottom">
						{SearchIconSvg()}
					</div>
					<div onClick={() => addPostIcon()} className="icon-inner-div inner-bottom">
						{AddPostIconSvg()}
					</div>

					<div
						id="mobile-noti-icon"
						onClick={(e) => {
							mobileNotificationIcon(e);
							props.clearNotifications();
						}}
						className="icon-inner-div inner-bottom"
					>
						<div id="noti-amount-mobile"></div>
						<div className="notification-svg svg-div">{NotificationIconSvg()}</div>
					</div>

					<Link to={`/profile/${username}`} className="icon-inner-div inner-bottom">
						{profileIcon()}
					</Link>
				</div>
			</nav>
		</>
	);
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

export default Nav;
export { followButtonForNoti };
