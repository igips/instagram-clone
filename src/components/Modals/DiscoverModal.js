import { closeModal } from "../Modals";
import { getUserDataFromUsersArray } from "../Home";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { dropDown, hideDropDown } from "../DropDown";
import { getAuth } from "firebase/auth";
import ava from "../../img/ava.jpeg";
import { useSelector } from "react-redux";

function DiscoverModal(props) {
	const signedIn = useSelector((state) => state.user.signedIn);


	function hideDiscoverModal() {
		document.getElementById("discover-modal").style.display = "none";
	}
    

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

	return (
		<div id="discover-modal" className="modal">
			<div className="discover-modal-content">
				<div id="discover-modal-header">
					<span>{"Discover"}</span>
                    <div id="close-discover-modal">{closeModal(hideDiscoverModal)}</div>
				</div>
				<div id="list-of-discover-div">
					<div id="list-of-discover-div-inner">
						{props.users.map((user) => {
							if (user.username !== props.yourUsername && user.posts.length > 0) {
								const userData = getUserDataFromUsersArray(props.users, user.username);
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
														getUserDataFromUsersArray(props.users, user.username),
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
												<img
													className="ava-img-likes"
													src={userData.avatar ? userData.avatar : ava}
													alt=""
												/>
											</div>

											<span
												onMouseEnter={(e) =>
													dropDown(
														getUserDataFromUsersArray(props.users, user.username),
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
