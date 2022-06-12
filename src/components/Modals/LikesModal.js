import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { dropDown, hideDropDown } from "../DropDown";
import { closeModal } from "../Modals";
import { getUserDataFromUsersArray } from "../Home";
import uniqid from "uniqid";
import ava from "../../img/ava.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLikesForLikesModal, setLikesModalInfo } from "../../features/modalsSlice";

function LikesModal(props) {
	const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.user.signedIn);
	const following = useSelector((state) => state.user.following);
	const users = useSelector((state) => state.usersAndPosts.users);
	const likes = useSelector((state) => state.modals.likesForLikesModal);
	const likesModalInfo = useSelector((state) => state.modals.likesModalInfo);

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
			!following.includes(user) &&
			getUserDataFromUsersArray(users, user).uid !== userR.uid
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
		} else if (userR && signedIn && following.includes(user)) {
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
		dispatch(setLikesModalInfo("Likes"));
	}

	return (
		<div id="likes-modal" className="modal">
			<div className="likes-modal-content">
				<div id="likes-modal-header">
					<span>{likesModalInfo}</span>
					{closeModal(hideLikesModal)}
				</div>
				<div id="list-of-likes-div">
					<div id="list-of-likes-div-inner">
						{likes.map((user) => {
							const userData = getUserDataFromUsersArray(users, user);
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
													getUserDataFromUsersArray(users, user),
													dispatch,
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
													getUserDataFromUsersArray(users, user),
													dispatch,
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
		
		likesModalSetLikes(setLikesForLikesModal(likes.users));

	} else {
		likesModalSetLikes(setLikesForLikesModal(likes));
		info(setLikesModalInfo(info2));
	}

	modal.style.display = "flex";
}

export default LikesModal;
export { showLikesModal };
