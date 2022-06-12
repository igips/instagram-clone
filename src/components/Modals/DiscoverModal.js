import { closeModal } from "../Modals";
import { getUserDataFromUsersArray } from "../Home";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { dropDown, hideDropDown } from "../DropDown";
import { getAuth } from "firebase/auth";
import ava from "../../img/ava.jpeg";
import { useDispatch, useSelector } from "react-redux";

function DiscoverModal(props) {
	const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.user.signedIn);
	const following = useSelector((state) => state.user.following);
	const yourUsername = useSelector((state) => state.user.username);
	const users = useSelector((state) => state.usersAndPosts.users);

	function hideDiscoverModal() {
		document.getElementById("discover-modal").style.display = "none";
	}

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

	return (
		<div id="discover-modal" className="modal">
			<div className="discover-modal-content">
				<div id="discover-modal-header">
					<span>{"Discover"}</span>
					<div id="close-discover-modal">{closeModal(hideDiscoverModal)}</div>
				</div>
				<div id="list-of-discover-div">
					<div id="list-of-discover-div-inner">
						{users.map((user) => {
							if (user.username !== yourUsername && user.posts.length > 0) {
								const userData = getUserDataFromUsersArray(users, user.username);
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
											to={`/profile/${user.username}`}
										>
											<div
												onMouseEnter={(e) => {
													dropDown(
														getUserDataFromUsersArray(users, user.username),
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
												<img
													className="ava-img-likes"
													src={userData.avatar ? userData.avatar : ava}
													alt=""
												/>
											</div>

											<span
												onMouseEnter={(e) =>
													dropDown(
														getUserDataFromUsersArray(users, user.username),
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
												{user.username}
											</span>
										</Link>
										{followButtonForLikes(user.username)}
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DiscoverModal;
