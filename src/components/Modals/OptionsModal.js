import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { hideCommentsModal } from "./CommentsModal";
import { showSignInModal } from "./SignInModal";


function OptionsModal(props) {
	useEffect(() => {
		const optionsModal = document.getElementById("unfollow-modal");

		optionsModal.addEventListener("click", (e) => {
			if (e.target === optionsModal) {
				hideOptionsModal();
			}
		});
	}, []);

	function deletePost() {
		props.commModalSetPostId(); 
		props.removePost(props.postIdOptionsModal); 
		hideOptionsModal(); 

		if(document.getElementById("comments-modal").style.display === "flex") {
			hideCommentsModal();
		}
		
	}
   
	function buttons() {
		const user = getAuth().currentUser;

		if (props.userData &&  user && user.uid === props.userData.uid) {
			return (
				<>
					<span onClick={() => deletePost()}>Delete</span>
					<span>Edit</span>
				</>
			);
		} else if (props.userData && props.following.includes(props.userData.username)) {
			return (
				<>
					<span
						onClick={() => {
							props.unFollow(props.userData.username);
							hideOptionsModal();
						}}
					>
						Unfollow
					</span>
				</>
			);
		} else if (props.userData && !props.following.includes(props.userData.username)) {
			return (
				<>
					<span
						onClick={() => {
							props.follow(props.userData.username);
							hideOptionsModal();
						}}
					>
						Follow
					</span>
				</>
			);
		}
	}

	return (
		<div id="unfollow-modal" className="modal">
			<div id="unfollow-modal-content" className="unfollow-modal-content">
				{buttons()}
				<span onClick={() => hideOptionsModal()}>Cancel</span>
			</div>
		</div>
	);
}


function options(userData, optionsModalSetUserData) {
	const user = getAuth().currentUser;

	if (user) {
		const modal = document.getElementById("unfollow-modal");
		if (!window.location.href.includes("optionsM")) {
			window.history.pushState("optionsM", "Title", "optionsM");
		}

		optionsModalSetUserData(userData);
		modal.style.display = "flex";
	} else {
		showSignInModal();
	}
}


function hideOptionsModal() {
	const modal = document.getElementById("unfollow-modal");
	window.history.back();
	modal.style.display = "none";
}

export default OptionsModal;
export {options};

