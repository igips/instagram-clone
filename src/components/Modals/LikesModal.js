import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { dropDown, hideDropDown } from "../DropDown";
import { closeModal } from "../Modals";
import { getUserDataFromUsersArray } from "../Home";
import uniqid from "uniqid";
import ava from "../../img/ava.jpeg";

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
	}

	return (
		<div id="likes-modal" className="modal">
			<div className="likes-modal-content">
				<div id="likes-modal-header">
					<span>Likes</span>
					{closeModal(hideLikesModal)}
				</div>
				<div id="list-of-likes-div">
					<div id="list-of-likes-div-inner">
						{props.likes.map((user) => {
							return (
								<div key={uniqid()} className="right-sug-div-list">
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
										<img className="ava-img-likes" src={ava} alt="" />
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

function showLikesModal(likes, likesModalSetLikes) {
	const modal = document.getElementById("likes-modal");
	if (!window.location.href.includes("likesM")) {
		window.history.pushState("likesM", "Title", "likesM");
	}

	likesModalSetLikes(likes.users);

	modal.style.display = "flex";
}

export default LikesModal;
export { showLikesModal };
