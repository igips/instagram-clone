import "../styles/App.css";
import Nav from "./Nav.js";
import Home, { shuffleArray } from "./Home.js";
import Modals from "./Modals.js";
import { useEffect, useState } from "react";
import { getDocId, getUserData, getUsers } from "..";
import { arrayRemove, arrayUnion, doc, getFirestore, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DropDown, { hideDropDown } from "./DropDown";
import { deleteObject, getStorage, ref } from "firebase/storage";

function App() {
	const [signedIn, setSignedIn] = useState(false);
	const [following, setFollowing] = useState([]);
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [firestoreDocId, setfirestoreDocId] = useState("");
	const [notifications, setNotifications] = useState([]);
	const [unReadNoti, setUnReadNoti] = useState(0);
	const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState({num: 0, id: ""});

	let unsubscribe;

	//DROPDOWN//
	const [userDataDropDown, setUserDataDropDown] = useState();

	function dropDownSetUserData(data) {
		setUserDataDropDown(data);
	}
	//DROPDWON//

	//LIKESMODAL//
	const [likesForLikesModal, setLikesForLikesModal] = useState([]);

	function likesModalSetLikes(data) {
		setLikesForLikesModal(data);
	}
	//LIKESMODAL//

	//OPTIONSMODAL//
	const [userDataOptionsModal, setUserDataOptionsModal] = useState();
	const [postIdOptionsModal, setpostIdOptionsModal] = useState();

	function optionsModalSetUserData(data) {
		setUserDataOptionsModal(data);
	}

	//OPTIONSMODAL//

	//COMMENTSMODAL//
	const [commModalPostId, setCommModalPostId] = useState();

	function commModalSetPostId(data) {
		setCommModalPostId(data);
	}
	//COMMENTSMODAL//

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
			setUsername("");
			setUnReadNoti(0);
			if (unsubscribe) {
				unsubscribe();
			}
		}
	});

	useEffect(() => {
		const user = getAuth().currentUser;

		if (signedIn) {
			getUserData(user.uid).then((user) => {
				setfirestoreDocId(user.id);
				setUsername(user.data().username);
				setFollowing(user.data().following);
				setNotifications(user.data().notifications);
				setUnReadNoti(user.data().unReadNoti);

				//eslint-disable-next-line react-hooks/exhaustive-deps
				unsubscribe = onSnapshot(doc(getFirestore(), "usernames", user.id), (docu) => {
					setNotifications(docu.data().notifications);
					if (
						document.getElementById("notification-div").style.display === "flex" ||
						document.getElementById("notification-modal-container").style.display === "flex"
					) {
						updateDoc(doc(getFirestore(), "usernames", user.id), { unReadNoti: 0 });
					} else {
						setUnReadNoti(docu.data().unReadNoti);
					}
				});
			});
		} else {
			setfirestoreDocId("");
		}
		getUsers().then((users) => {
			shuffleArray(users);
			setUsers(users);
			initialSetPosts(users);
		});
	}, [signedIn]);

	function initialSetPosts(data) {
		const posts2 = [];

		data.forEach((u) => {
			u.posts.forEach((p) => {
				posts2.push(p);
			});
		});

    posts2.sort((a,b) => {
      return new Date(b.date) - new Date(a.date);
    });

		setPosts(posts2);
	}

	function addPost(post) {
		setPosts([post, ...posts]);
	}

	function removePost(id) {
		const storage = getStorage();

		for (let p of posts) {
			if (p.id === id) {
				p.pic.forEach((picture) => {
					deleteObject(ref(storage, "images/" + picture.id));
				});
				updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { posts: arrayRemove(p) });
				break;
			}
		}

		setPosts((oldPosts) => {
			const newPosts = oldPosts.filter((post) => post.id !== id);
			return newPosts;
		});
	}

	function removeComment(postId, commentId) {
		setPosts((prevPosts) => {
			const newPosts = prevPosts.map((post) => {
				if (post.id === postId) {
					const newP = { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) };
					getDocId(post.username).then(async (id) => {
						await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayRemove(post) });
						updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
					});
					return newP;
				}
				return post;
			});
			return newPosts;
		});
	}

	function addComment(comment, id) {
		setPosts((prevPosts) => {
			const newPosts = prevPosts.map((post) => {
				if (post.id === id) {
					const newP = { ...post, comments: [...post.comments, comment] };
					getDocId(post.username).then(async (id) => {
						await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayRemove(post) });
						updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
						if (post.username !== username) {
							updateDoc(doc(getFirestore(), "usernames", id), {
								notifications: arrayUnion({
									username: username,
									content: "commented your post.",
									postID: post.id,
									date: Date.now(),
								}),
								unReadNoti: increment(1),
							});
						}
					});
					return newP;
				}
				return post;
			});

			return newPosts;
		});
	}

	function likeComment(postId, commentId) {
		setPosts((prevPosts) => {
			const newPosts = prevPosts.map((post) => {
				if (post.id === postId) {
          let newLike = false;
          let commentUsername;
					const newP = {
						...post,
						comments: post.comments.map((comment) => {
							if (comment.id === commentId) {
								if (!comment.likes.users.includes(username)) {
                  commentUsername = comment.username;
                  newLike = true;
									return {
										...comment,
										likes: {
											num: comment.likes.num + 1,
											users: [...comment.likes.users, username],
										},
									};
								} else {
									return {
										...comment,
										likes: {
											num: comment.likes.num - 1,
											users: comment.likes.users.filter((user) => user !== username),
										},
									};
								}
							}
							return comment;
						}),
					};

          getDocId(post.username).then(async (id) => {
						await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayRemove(post) });
						updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
						if (newLike && commentUsername !== username) {
							updateDoc(doc(getFirestore(), "usernames", id), {
								notifications: arrayUnion({
									username: username,
									content: "liked your comment.",
									postID: post.id,
									date: Date.now(),
								}),
								unReadNoti: increment(1),
							});
						}
					});

					return newP;
				}
				return post;
			});
			return newPosts;
		});
	}

	function likePicture(id) {
		setPosts((prevPosts) => {
			const newPosts = prevPosts.map((post) => {
				if (post.id === id) {
					let newP;
					let newLike = false;
					if (!post.likes.users.includes(username)) {
						newP = { ...post, likes: { num: post.likes.num + 1, users: [...post.likes.users, username] } };
						newLike = true;
					} else {
						newP = {
							...post,
							likes: {
								num: post.likes.num - 1,
								users: post.likes.users.filter((user) => user !== username),
							},
						};
					}
					getDocId(post.username).then(async (id) => {
						await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayRemove(post) });
						updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
						if (newLike && post.username !== username) {
							updateDoc(doc(getFirestore(), "usernames", id), {
								notifications: arrayUnion({
									username: username,
									content: "liked your post.",
									postID: post.id,
									date: Date.now(),
								}),
								unReadNoti: increment(1),
							});
						}
					});
					return newP;
				}

				return post;
			});
			return newPosts;
		});
	}

	function clearNotifications() {
		if (unReadNoti !== 0) {
			updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { unReadNoti: 0 });
			setUnReadNoti(0);
		}
	}

	function follow(who, right) {
		setFollowing([...following, who]);
		setUsers((oldUsers) => {
			const newUsers = oldUsers.map((user) => {
				if (user.username === who) {
					return {
						...user,
						followers: [...user.followers, username],
					};
				} else if (user.username === username) {
					return {
						...user,
						following: [...user.following, who],
					};
				} else {
					return user;
				}
			});
			return newUsers;
		});

		getDocId(who).then((id) =>
			updateDoc(doc(getFirestore(), "usernames", id), {
				followers: arrayUnion(username),
				notifications: arrayUnion({ username: username, content: "started following you.", date: Date.now() }),
				unReadNoti: increment(1),
			})
		);
		updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { following: arrayUnion(who) });

		if (right && document.getElementById("likes-modal").style.display !== "flex") {
			hideDropDown();
		}
	}

	function unFollow(who) {
		setFollowing((oldFollowing) => {
			const newFollowing = oldFollowing.filter((name) => name !== who);
			return newFollowing;
		});
		setUsers((oldUsers) => {
			const newUsers = oldUsers.map((user) => {
				if (user.username === who) {
					return {
						...user,
						followers: user.followers.filter((name) => name !== username),
					};
				} else if (user.username === username) {
					return {
						...user,
						following: user.following.filter((name) => name !== who),
					};
				} else {
					return user;
				}
			});
			return newUsers;
		});
		getDocId(who).then((id) =>
			updateDoc(doc(getFirestore(), "usernames", id), { followers: arrayRemove(username) })
		);
		updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { following: arrayRemove(who) });
	}

	return (
		<section id="top-section">
			<DropDown
				following={following}
				follow={follow}
				unFollow={unFollow}
				userData={userDataDropDown}
				users={users}
			/>
			<Modals
				notifications={notifications}
				following={following}
				username={username}
				follow={follow}
				unFollow={unFollow}
				users={users}
				dropDownSetUserData={dropDownSetUserData}
				likesForLikesModal={likesForLikesModal}
				userDataOptionsModal={userDataOptionsModal}
				optionsModalSetUserData={optionsModalSetUserData}
				setpostIdOptionsModal={setpostIdOptionsModal}
				posts={posts}
				commModalPostId={commModalPostId}
				signedIn={signedIn}
				likesModalSetLikes={likesModalSetLikes}
				likeComment={likeComment}
				removeComment={removeComment}
				likePicture={likePicture}
				addComment={addComment}
				addPost={addPost}
				firestoreDocId={firestoreDocId}
				removePost={removePost}
				postIdOptionsModal={postIdOptionsModal}
				commModalSetPostId={commModalSetPostId}
			></Modals>
			<Nav
				clearNotifications={clearNotifications}
				unReadNoti={unReadNoti}
				notifications={notifications}
				users={users}
				following={following}
				username={username}
				follow={follow}
				unFollow={unFollow}
			></Nav>
			<Home
				setpostIdOptionsModal={setpostIdOptionsModal}
				optionsModalSetUserData={optionsModalSetUserData}
				likesModalSetLikes={likesModalSetLikes}
				dropDownSetUserData={dropDownSetUserData}
				users={users}
				following={following}
				username={username}
				follow={follow}
				unFollow={unFollow}
				posts={posts}
				likePicture={likePicture}
				signedIn={signedIn}
				addComment={addComment}
				likeComment={likeComment}
				commModalSetPostId={commModalSetPostId}
        index={index}
        setIndex={setIndex}
			></Home>
		</section>
	);
}

export default App;
