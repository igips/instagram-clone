import "../styles/App.css";
import Nav from "./Nav.js";
import Home, { shuffleArray } from "./Home.js";
import Modals from "./Modals.js";
import { useEffect, useState } from "react";
import { getDocId, getUserData, getUsers } from "..";
import { arrayRemove, arrayUnion, doc, getFirestore, increment, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DropDown, { hideDropDown } from "./DropDown";

function App() {
	const [signedIn, setSignedIn] = useState(false);
	const [following, setFollowing] = useState([]);
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [firestoreDocId, setfirestoreDocId] = useState("");
	const [notifications, setNotifications] = useState([]);
	const [unReadNoti, setUnReadNoti] = useState(0);
	let unsubscribe;


  //DROPDOWN
  const [userDataDropDown, setUserDataDropDown] = useState();

  function dropDownSetUserData(data) {
      setUserDataDropDown(data);
  }

  //DROPDWON




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
		});
	}, [signedIn]);

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
			<Home dropDownSetUserData={dropDownSetUserData} users={users} following={following} username={username} follow={follow} unFollow={unFollow}></Home>
		</section>
	);
}

export default App;
