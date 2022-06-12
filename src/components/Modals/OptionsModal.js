import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommModalPostId, setOptionsEdit, setUserDataOptionsModal } from "../../features/modalsSlice";
import { hideCommentsModal } from "./CommentsModal";
import { showSignInModal } from "./SignInModal";


function OptionsModal(props) {
	const dispatch = useDispatch();
	const following = useSelector((state) => state.user.following);
	const userData = useSelector((state) => state.modals.userDataOptionsModal);
	const postIdOptionsModal = useSelector((state) => state.modals.postIdOptionsModal); 



	useEffect(() => {
		const optionsModal = document.getElementById("unfollow-modal");

		optionsModal.addEventListener("click", (e) => {
			if (e.target === optionsModal) {
				hideOptionsModal();
			}
		});
	}, []);

	function deletePost() {
		dispatch(setCommModalPostId(""))
		props.removePost(postIdOptionsModal); 
		hideOptionsModal(); 

		if(document.getElementById("comments-modal").style.display === "flex") {
			hideCommentsModal();
		}
		
	}

	function editPost() {
		dispatch(setOptionsEdit(true));
		hideOptionsModal();

		if(document.getElementById("comments-modal").style.display === "flex") {
			hideCommentsModal();
		}
		
	}
   
	function buttons() {
		const user = getAuth().currentUser;

		if (userData &&  user && user.uid === userData.uid) {
			return (
				<>
					<span onClick={() => deletePost()}>Delete</span>
					<span onClick={() => editPost()}>Edit</span>
				</>
			);
		} else if (userData && following.includes(userData.username)) {
			return (
				<>
					<span
						onClick={() => {
							props.unFollow(userData.username);
							hideOptionsModal();
						}}
					>
						Unfollow
					</span>
				</>
			);
		} else if (userData && !following.includes(userData.username)) {
			return (
				<>
					<span
						onClick={() => {
							props.follow(userData.username);
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
		
		optionsModalSetUserData(setUserDataOptionsModal(userData));
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

