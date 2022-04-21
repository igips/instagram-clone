import "../styles/ProfilePage.css";
import ava from "../img/ava.jpeg";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { showLikesModal } from "./Modals/LikesModal";
import { getUserDataFromUsersArray } from "./Home";
import uniqid from "uniqid";
import { LikeIconWhite } from "./Icons/LikeIcon";
import { CommentIconFilled } from "./Icons/CommentIcon";
import { showCommentsModal } from "./Modals/CommentsModal";
import { homeIconClicked, homeIconNotClicked } from "./Icons/HomeIcon";
import { avatarIconClicked, avatarIconNotClicked } from "./Icons/ProfileIcon";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProfilePage(props) {
	let { username } = useParams();

	const [userData, setUserData] = useState({ username: "", posts: [], followers: [], following: [] });
	const [postsOrTagged, setPostsOrTagged] = useState("posts");
	const [post, setPost] = useState();

	useEffect(() => {
		if (username === props.yourUsername) {
			avatarIconClicked();
		} else {
			homeIconClicked();
		}
	});

	useEffect(() => {
		const posts = document.getElementById("profile-posts-span");
		const tagged = document.getElementById("profile-tagged-span");
		if (postsOrTagged === "posts") {
			posts.style.color = "#262626";
			tagged.style.color = "#8e8e8e";
		} else {
			posts.style.color = "#8e8e8e";
			tagged.style.color = "#262626";
		}
	}, [postsOrTagged]);

	useEffect(() => {
		homeIconNotClicked();

		if (props.users.length > 0 && username) {
			const data = getUserDataFromUsersArray(props.users, username);
			data.posts.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});

			setUserData(data);
		}

		const avatar = document.getElementById("profile-ava");

		if (username === props.yourUsername) {
			avatar.style.cursor = "pointer";
			avatarIconClicked();
		} else {
			avatar.style.cursor = "default";
			avatarIconNotClicked();
		}
	}, [username, props.users]);

	useEffect(() => {
		if (props.yourUsername === username && userData.username !== "" && userData.avatar !== props.avatar) {
			setUserData({ ...userData, avatar: props.avatar });
		}
	}, [props.avatar]);

	async function changeAvatar(e) {
		const avatarSpinner = document.getElementById("avatar-spinner");

		if (e.target.files[0]) {
			avatarSpinner.style.display = "flex";
			const storage = getStorage();

			if (userData.avatar) {
				await deleteObject(ref(storage, "avatars/" + username));
			}

			const avatar = e.target.files[0];
			const reader = new FileReader();

			reader.onload = () => {};
			const picImagesRef = ref(storage, "avatars/" + username);
			const snapshot = await uploadBytes(picImagesRef, avatar);

			const url = await getDownloadURL(snapshot.ref);
			await updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), { avatar: url });
			avatarSpinner.style.display = "none";
			e.target.value = "";
		}
	}

	function buttons() {
		function followUnfollow() {
			if (props.following.includes(username)) {
				return (
					<button
						onClick={() => props.unFollow(username)}
						className="likes-modal-follow sug-box-left-follow-active profile-button"
					>
						Following
					</button>
				);
			} else {
				return (
					<button onClick={() => props.follow(username)} className="likes-modal-follow  profile-button">
						Follow
					</button>
				);
			}
		}

		if (props.signedIn) {
			if (props.yourUsername === username) {
				return (
					<>
						<button className="likes-modal-follow sug-box-left-follow-active profile-button">
							Edit Profile
						</button>
					</>
				);
			} else if (props.yourUsername !== "") {
				return (
					<>
						<button className="likes-modal-follow sug-box-left-follow-active profile-button">
							Message
						</button>
						{followUnfollow()}
					</>
				);
			}
		}
	}

	function displayPosts() {
		if (postsOrTagged === "posts") {
			return userData.posts.map((post) => {
				return (
					<div onClick={() => showCommentsModal(post.id, props.commModalSetPostId)} key={uniqid()}>
						<img style={{ aspectRatio: "1/1" }} src={post.pic.src} alt="" />
						<div className="likes-and-comments-profile">
							<span>
								{LikeIconWhite()} {post.likes.num}
							</span>
							<span>
								{CommentIconFilled()} {post.comments.length}
							</span>
						</div>
					</div>
				);
			});
		} else {
			return props.posts.map((post) => {
				let found = false;
				for (let t of post.pic.tags) {
					if (t.username === username) {
						found = true;
						break;
					}
				}
				if (found) {
					return (
						<div onClick={() => showCommentsModal(post.id, props.commModalSetPostId)} key={uniqid()}>
							<img style={{ aspectRatio: "1/1" }} src={post.pic.src} alt="" />
							<div className="likes-and-comments-profile">
								<span>
									{LikeIconWhite()} {post.likes.num}
								</span>
								<span>
									{CommentIconFilled()} {post.comments.length}
								</span>
							</div>
						</div>
					);
				}
			});
		}
	}

	function avatarInput() {
		if (username === props.yourUsername) {
			return <input onChange={(e) => changeAvatar(e)} id="avatar-input" type="file" accept="image/*" />;
		}
	}

	return (
		<main>
			<section id="profile-section">
				<div id="profile-top">
					<div id="profile-avatar-div">
						<label >
							{avatarInput()}
							<img id="profile-ava" src={userData.avatar ? userData.avatar : ava} alt="" />
							<div id="avatar-spinner">
								<FontAwesomeIcon
									style={{ height: "40px", width: "40px" }}
									icon={faSpinner}
									className="fa-spin"
								/>
							</div>
						</label>
					</div>
					<div id="profile-info">
						<div id="profile-info-one">
							<h2>{username}</h2>
							{buttons()}
						</div>
						<div id="profile-info-two">
							<div className="profile-num-info">
								<span className="profile-num-info-span">{userData.posts.length}</span>
								<span>Posts</span>
							</div>
							<div
								onClick={() =>
									showLikesModal(
										userData.followers,
										props.likesModalSetLikes,
										props.setLikesModalInfo,
										"Followers"
									)
								}
								className="profile-num-info cursor"
							>
								<span className="profile-num-info-span">{userData.followers.length}</span>
								<span>{userData.followers.length === 1 ? "Follower" : "Followers"}</span>
							</div>
							<div
								onClick={() =>
									showLikesModal(
										userData.following,
										props.likesModalSetLikes,
										props.setLikesModalInfo,
										"Following"
									)
								}
								className="profile-num-info cursor"
							>
								<span className="profile-num-info-span">{userData.following.length}</span>
								<span>Following</span>
							</div>
						</div>
					</div>
				</div>
				<div id="profile-bottom">
					<div id="posts-tag-div">
						<span id="profile-posts-span" onClick={() => setPostsOrTagged("posts")}>
							POSTS
						</span>
						<span id="profile-tagged-span" onClick={() => setPostsOrTagged("tagged")}>
							TAGGED
						</span>
					</div>
					<div id="profile-photo-div">{displayPosts()}</div>
				</div>
			</section>
		</main>
	);
}

export default ProfilePage;
