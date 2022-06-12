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
import { HashRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import Inbox from "./Inbox";
import { useDispatch, useSelector } from "react-redux";
import {
	setSignedIn,
	setFollowing,
	setUsername,
	setFirestoreDocId,
	setNotifications,
	setUnReadMessages,
	setUnReadNoti,
	setAvatar,
	setMessages,
} from "../features/userSlice";
import { setPosts, setUsers } from "../features/usersAndPostsSlice";

function App() {
	const dispatch = useDispatch();
	const signedIn = useSelector((state) => state.user.signedIn);
	const following = useSelector((state) => state.user.following);
	const username = useSelector((state) => state.user.username);
	const firestoreDocId = useSelector((state) => state.user.firestoreDocId);
	const unReadNoti = useSelector((state) => state.user.unReadNoti);
	const avatar = useSelector((state) => state.user.avatar);
	const messages = useSelector((state) => state.user.messages);
	const users = useSelector((state) => state.usersAndPosts.users);
	const posts = useSelector((state) => state.usersAndPosts.posts);

	const [messagesHelp, setMessagesHelp] = useState([]);

	let unsubscribe;

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			dispatch(setSignedIn(true));
		} else {
			dispatch(setSignedIn(false));
			dispatch(setUsername(""));
			dispatch(setUnReadNoti(0));
			dispatch(setAvatar(""));
			if (unsubscribe) {
				unsubscribe();
			}
		}
	});

	useEffect(() => {
		if (messagesHelp.length >= messages.length) {
			let mes = messagesHelp.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});

			dispatch(setMessages(mes));
		}
	}, [messagesHelp]);

	useEffect(() => {
		if (signedIn && following.length === 0) {
			document.getElementById("discover-modal").style.display = "flex";
		} else {
			document.getElementById("discover-modal").style.display = "none";
		}
	}, [following]);

	useEffect(() => {
		const user = getAuth().currentUser;

		if (signedIn) {
			getUserData(user.uid).then((user) => {
				dispatch(setFirestoreDocId(user.id));
				dispatch(setUsername(user.data().username));
				dispatch(setFollowing(user.data().following));
				dispatch(setNotifications(user.data().notifications));
				dispatch(setUnReadNoti(user.data().unReadNoti));
				dispatch(setAvatar(user.data().avatar));
				dispatch(setMessages(user.data().messages));

				//eslint-disable-next-line react-hooks/exhaustive-deps
				unsubscribe = onSnapshot(doc(getFirestore(), "usernames", user.id), (docu) => {
					dispatch(setNotifications(user.data().notifications));
					if (docu.data().avatar !== avatar) {
						dispatch(setAvatar(user.data().avatar));
					}

					dispatch(setUnReadMessages(docu.data().unReadMessages));

					setMessagesHelp(docu.data().messages);

					if (
						document.getElementById("notification-div").style.display === "flex" ||
						document.getElementById("notification-modal-container").style.display === "flex"
					) {
						updateDoc(doc(getFirestore(), "usernames", user.id), { unReadNoti: 0 });
					} else {
						dispatch(setUnReadNoti(docu.data().unReadNoti));
					}
				});
			});
		} else {
			dispatch(setFirestoreDocId(""));
		}
		getUsers().then((users) => {
			shuffleArray(users);
			dispatch(setUsers(users));
			initialSetPosts(users);
		});
	}, [signedIn]);

	function updateUsers() {
		getUsers().then((users) => {
			shuffleArray(users);
			dispatch(setUsers(users));
		});
	}

	useEffect(() => {
		setTimeout(updateUsers(), 600);
	}, [avatar]);

	function initialSetPosts(data) {
		const posts2 = [];

		data.forEach((u) => {
			u.posts.forEach((p) => {
				posts2.push(p);
			});
		});

		posts2.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		dispatch(setPosts(posts2));
	}

	function addPost(post) {
		dispatch(setPosts([post, ...posts]));
	}

	function removePost(id) {
		const storage = getStorage();

		for (let p of posts) {
			if (p.id === id) {
				deleteObject(ref(storage, "images/" + p.id));
				updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { posts: arrayRemove(p) });
				break;
			}
		}
		updateUsers();

		const newPosts = posts.filter((post) => post.id !== id);
		dispatch(setPosts(newPosts));

	}

	function removeComment(postId, commentId) {
		const newPosts = posts.map((post) => {
			if (post.id === postId) {
				const newP = { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) };
				getDocId(post.username).then(async (id) => {
					await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayRemove(post) });
					await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
					updateUsers();
				});
				return newP;
			}
			return post;
		});
		dispatch(setPosts(newPosts));
	}

	function addComment(comment, id) {
		const newPosts = posts.map((post) => {
			if (post.id === id) {
				const newP = { ...post, comments: [...post.comments, comment] };
				getDocId(post.username).then(async (id) => {
					await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayRemove(post) });
					await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
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
					updateUsers();
				});
				return newP;
			}
			return post;
		});
		dispatch(setPosts(newPosts))
	}

	function likeComment(postId, commentId) {
		const newPosts = posts.map((post) => {
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
					await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
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
					updateUsers();
				});

				return newP;
			}
			return post;
		});
		dispatch(setPosts(newPosts));

	}

	function likePicture(id) {
		const newPosts = posts.map((post) => {
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
					await updateDoc(doc(getFirestore(), "usernames", id), { posts: arrayUnion(newP) });
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
					updateUsers();
				});
				return newP;
			}

			return post;
		});
		dispatch(setPosts(newPosts));

	
	}

	function clearNotifications() {
		if (unReadNoti !== 0) {
			updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { unReadNoti: 0 });
			dispatch(setUnReadNoti(0));
		}
	}

	function follow(who, right) {
		dispatch(setFollowing([...following, who]));

		const newUsers = users.map((user) => {
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

		dispatch(setUsers(newUsers));

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
		const newFollowing = following.filter((name) => name !== who);
		dispatch(setFollowing(newFollowing));

		const newUsers = users.map((user) => {
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

		dispatch(setUsers(newUsers));

		getDocId(who).then((id) =>
			updateDoc(doc(getFirestore(), "usernames", id), { followers: arrayRemove(username) })
		);
		updateDoc(doc(getFirestore(), "usernames", firestoreDocId), { following: arrayRemove(who) });
	}

	return (
		<section id="top-section">
			<HashRouter>
				<DropDown
					follow={follow}
					unFollow={unFollow}					
				/>
				<Modals
					follow={follow}
					unFollow={unFollow}															
					likeComment={likeComment}
					removeComment={removeComment}
					likePicture={likePicture}
					addComment={addComment}
					addPost={addPost}
					removePost={removePost}	
					updateUsers={updateUsers}
				></Modals>
				<Nav
					clearNotifications={clearNotifications}
					follow={follow}
					unFollow={unFollow}
				></Nav>
				<Routes>
					<Route
						path="/"
						element={
							<Home								
								follow={follow}
								unFollow={unFollow}
								likePicture={likePicture}
								addComment={addComment}
								likeComment={likeComment}
							/>
						}
					/>
					<Route
						path="/profile/:username"
						element={
							<ProfilePage
								follow={follow}
								unFollow={unFollow}								
							/>
						}
					/>
					<Route path="/inbox" element={<Inbox />} />
				</Routes>
			</HashRouter>
		</section>
	);
}

export default App;
