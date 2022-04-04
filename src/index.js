import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "./styles/index.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const firebaseConfig = {
	apiKey: "AIzaSyDft-ERJnOSLsjY01BIvYaXN3BSQFcVvos",
	authDomain: "instagram-clone-33934.firebaseapp.com",
	projectId: "instagram-clone-33934",
	storageBucket: "instagram-clone-33934.appspot.com",
	messagingSenderId: "776008847798",
	appId: "1:776008847798:web:2b67fd832c1478c19ab117",
};

const app = initializeApp(firebaseConfig);


async function getUsername(id) {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	let userName;

  	data.forEach((doc) => {
		if (doc.data().uid === id) {
			userName = doc.data().username;
		}
	});

	return userName;
}

async function getFollowing(id) {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	let following;

	data.forEach((doc) => {
		if (doc.data().uid === id) {
			following = doc.data().following;
		}
	});

	return following;

}

async function getUsers() {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	let users = [];

	data.forEach((doc) => {
		users.push(doc.data().username);
	});

	return users;
}



onAuthStateChanged(getAuth(), (user) => {
	const rightButtons = document.getElementById("right-div-for-buttons");
	const leftButtons = document.getElementById("home-left-button-div");
	const suggestionsLeft = document.getElementById("suggestions-left-div");
	const profileInfoRight = document.getElementById("home-right-profile-inner");
	const suggestionsRight = document.getElementById("suggestions-div-right");
	const rightUserName = document.getElementById("right-login-div-top-span");

	if (user) {
		const uid = user.uid;

		getUsername(uid).then((user) => {
			leftButtons.classList.add("mobile-not-vissible");
			rightButtons.classList.add("buttons-not-vissible");
			suggestionsLeft.classList.add("mobile");
			profileInfoRight.classList.add("visible");
			suggestionsRight.classList.add("visible");
      		rightUserName.textContent = user;
		});

	} else {
		leftButtons.classList.remove("mobile-not-vissible");
		rightButtons.classList.remove("buttons-not-vissible");
		suggestionsLeft.classList.remove("mobile");
		profileInfoRight.classList.remove("visible");
		suggestionsRight.classList.remove("visible"); 
		// User is signed out
	}
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

export {getUsername, getUsers, getFollowing}
