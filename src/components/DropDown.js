import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import ava from "../img/ava.jpeg";
import { getUserDataFromUsersArray } from "./Home";
import { showCommentsModal } from "./Modals/CommentsModal";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DropDown(props) {
	const signedIn = useSelector((state) => state.user.signedIn);
	const [data, setData] = useState({ username: "", posts: [], followers: [], following: [] });
	const user = getAuth().currentUser;
	const [posts, setPosts] = useState([{ pic: { src: "" } }]);
	let num = 0;

	useEffect(() => {
		if (props.userData) {
			setData(getUserDataFromUsersArray(props.users, props.userData.username));
		}
	}, [props.userData]);

	useEffect(() => {
		const miniPic = document.getElementById("mini-pic-div");
		const noPost = document.getElementById("no-posts-drop-down");

		if (posts[0].pic.src === "") {
			miniPic.style.display = "none";
			noPost.style.display = "flex";
		} else {
			noPost.style.display = "none";
			miniPic.style.display = "flex";
		}
	}, [posts]);

	useEffect(() => {
		if (data.username !== "") {
			setPosts(() => {
				const newPosts = props.posts.filter((post) => post.username === data.username);

				if (newPosts.length < 1) {
					return [{ pic: { src: "" } }];
				} else {
					return newPosts;
				}
			});
		}
	}, [data]);

	useEffect(() => {
		if (document.getElementById("drop-down").style.display === "flex") {
			setData(getUserDataFromUsersArray(props.users, props.userData.username));
		}
	}, [props.users]);

	function button() {
		if (signedIn) {
			if (
				props.userData &&
				!props.following.includes(props.userData.username) &&
				user &&
				props.userData.uid !== user.uid
			) {
				return (
					<button onClick={() => props.follow(props.userData.username, props.right)} id="drop-down-button">
						Follow
					</button>
				);
			} else if (props.userData && user && props.userData.uid !== user.uid) {
				return (
					<>
						<button className="drop-down-button">Message</button>{" "}
						<button
							onClick={() => props.unFollow(props.userData.username)}
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
		<div
			onMouseOver={() => keepDropDown()}
			onMouseLeave={() => hideDropDown()}
			className="drop-down"
			id="drop-down"
		>
			<div className="drop-down-inner-first">
				<Link to={`/profile/${data.username}`}>
					<img
						onClick={() => hideDropDown()}
						id="drop-down-ava"
						src={data.avatar ? data.avatar : ava}
						alt=""
					/>
				</Link>
				<Link to={`/profile/${data.username}`}>
					<span onClick={() => hideDropDown()} id="drop-down-username">
						{data.username}
					</span>
				</Link>
			</div>
			<div className="drop-down-inner-second">
				<div className="drop-down-inner-second-inner">
					<span id="drop-down-num-of-posts">{data.posts.length}</span>
					<span>posts</span>
				</div>
				<div className="drop-down-inner-second-inner">
					<span id="drop-down-num-of-followers">{data.followers.length}</span>
					<span>followers</span>
				</div>
				<div className="drop-down-inner-second-inner">
					<span id="drop-down-num-of-following">{data.following.length}</span>
					<span>following</span>
				</div>
			</div>
			<div className="drop-down-inner-third">
				<div id="no-posts-drop-down">No posts yet</div>
				<div id="mini-pic-div">
					{posts.map((post) => {
						if (num < 3) {
							num++;
							return (
								<img
									key={uniqid()}
									onClick={() => {
										showCommentsModal(post.id, props.setPostId);
										hideDropDown();
									}}
									src={post.pic.src}
									alt=""
									className="min-pic"
								/>
							);
						}
					})}
				</div>
			</div>
			<div id="drop-down-inner-fourth">{button()}</div>
		</div>
	);
}

function dropDown(userData, dropDownSetUserData, e, ele, right) {
	if (window.innerWidth > 650) {
		const user = getAuth().currentUser;
		const dropDown = document.getElementById("drop-down");
		const rect = e.target.getBoundingClientRect();

		dropDownSetUserData(userData);

		dropDown.style.left = rect.left + "px";
		dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) + (ele === "avaPic" ? 25 : 18) + "px";
		dropDown.style.position = right ? "fixed" : "absolute";

		dropDown.style.display = "flex";

		if (user && user.uid !== userData.uid) {
			document.getElementById("drop-down-inner-fourth").style.display = "flex";
		} else {
			document.getElementById("drop-down-inner-fourth").style.display = "none";
		}

		if (window.innerHeight - dropDown.getBoundingClientRect().bottom < 0) {
			dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) - (user ? 350 : 290) + "px";
		}

		if (window.innerWidth - dropDown.getBoundingClientRect().left <= 390) {
			dropDown.style.left =
				rect.left - (410 - (window.innerWidth - dropDown.getBoundingClientRect().left)) + "px";
		}
	}
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

export default DropDown;
export { dropDown, hideDropDown, keepDropDown };
