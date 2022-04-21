import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { dropDown, hideDropDown } from "../DropDown";
import { closeModal } from "../Modals";
import { getUserDataFromUsersArray } from "../Home";
import uniqid from "uniqid";
import ava from "../../img/ava.jpeg";
import { Link } from "react-router-dom";

function LikesModal(props) {
	const [signedIn, setSignedIn] = useState(false);

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	

	useEffect(() => {
		const likesModal = document.getElementById("likes-modal");

		likesModal.addEventListener("click", (e) => {
			if (e.target === likesModal) {
				hideLikesModal();
			}
		});
	}, []);

	function followButtonForLikes(user) {
		const userR = getAuth().currentUser;

		if (
			userR &&
			signedIn &&
			!props.following.includes(user) &&
			getUserDataFromUsersArray(props.users, user).uid !== userR.uid
		) {
			return (
				<button
					onClick={() => {
						props.follow(user);
					}}
					className="likes-modal-follow"
				>
					Follow
				</button>
			);
		} else if (userR && signedIn && props.following.includes(user)) {
			return (
				<button
					onClick={() => {
						props.unFollow(user);
					}}
					className="likes-modal-follow sug-box-left-follow-active"
				>
					Following
				</button>
			);
		}
	}

	function hideLikesModal() {
		const modal = document.getElementById("likes-modal");
		window.history.back();
		modal.style.display = "none";
		props.setLikesModalInfo("Likes")
	}

	return (
		<div id="likes-modal" className="modal">
			<div className="likes-modal-content">
				<div id="likes-modal-header">
					<span>{props.likesModalInfo}</span>
					{closeModal(hideLikesModal)}
				</div>
				<div id="list-of-likes-div">
					<div id="list-of-likes-div-inner">
						{props.likes.map((user) => {
							const userData = getUserDataFromUsersArray(props.users, user);
							return (
								<div key={uniqid()} className="right-sug-div-list">
									<Link
									className="link-like-modal"
										onClick={() => {
											window.history.pushState("/", "Title", "/");
											hideDropDown();
											document.getElementById("likes-modal").style.display = "none";
											document.getElementById("comments-modal").style.display = "none";
										}}
										to={`/profile/${user}`}
									>
										<div
											onMouseEnter={(e) => {
												dropDown(
													getUserDataFromUsersArray(props.users, user),
													props.dropDownSetUserData,
													e,
													"avaPic"
												);
											}}
											onMouseLeave={() => {
												hideDropDown();
											}}
											className="right-sug-ava-div"
										>
											<img className="ava-img-likes" src={userData.avatar ? userData.avatar : ava} alt="" />
										</div>

										<span
											onMouseEnter={(e) =>
												dropDown(
													getUserDataFromUsersArray(props.users, user),
													props.dropDownSetUserData,
													e,
													"no",
													"right"
												)
											}
											onMouseLeave={() => {
												hideDropDown();
											}}
											className="sug-login-right"
										>
											{user}
										</span>
									</Link>
									{followButtonForLikes(user)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

function showLikesModal(likes, likesModalSetLikes, info, info2) {
	const modal = document.getElementById("likes-modal");
	if (!window.location.href.includes("likesM")) {
		window.history.pushState("likesM", "Title", "likesM");
	}

	if(!info) {
		likesModalSetLikes(likes.users);

	} else {
		likesModalSetLikes(likes);
		info(info2);
	}

	modal.style.display = "flex";
}

export default LikesModal;
export { showLikesModal };
