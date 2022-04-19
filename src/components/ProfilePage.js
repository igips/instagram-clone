import "../styles/ProfilePage.css";
import ava from "../img/ava.jpeg";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserData } from "..";
import { showLikesModal } from "./Modals/LikesModal";
import { getUserDataFromUsersArray } from "./Home";
import uniqid from "uniqid";

function ProfilePage(props) {
	let { username } = useParams();

	const [userData, setUserData] = useState({ username: "", posts: [], followers: [], following: [] });

	useEffect(() => {
		if (props.users.length > 0 && username) {
            const data = getUserDataFromUsersArray(props.users, username);
            data.posts.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });


			setUserData(data);
		}
		// getUserData(username).then((user) => {
		// 	setUserData(user.data());
		// });
	}, [username, props.users]);

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

	return (
		<main>
			<section id="profile-section">
				<div id="profile-top">
					<div id="profile-avatar-div">
						<img id="profile-ava" src={ava} alt="" />
					</div>
					<div id="profile-info">
						<div id="profile-info-one">
							<h2>{username}</h2>
							{buttons()}
						</div>
						<div id="profile-info-two">
							<div className="profile-num-info">
								<span className="profile-num-info-span">{userData.posts.length}</span>
								<span>posts</span>
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
								<span>followers</span>
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
								<span>following</span>
							</div>
						</div>
					</div>
				</div>
				<div id="profile-bottom">
					<div id="profile-photo-div">
						{userData.posts.map((post) => {
							return <img key={uniqid()} style={{aspectRatio: "1/1"}} src={post.pic.src} alt="" />;
						})}
					</div>
				</div>
			</section>
		</main>
	);
}

export default ProfilePage;
