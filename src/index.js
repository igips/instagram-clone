import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "./styles/index.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { homeIcon } from "./components/Icons/HomeIcon.js";

TimeAgo.addDefaultLocale(en);

window.addEventListener("load", () => {
	if (window.location.href !== "http://localhost:3000/") {
		window.history.pushState("/", "Title", "/");
		homeIcon();
	}
})

window.addEventListener("popstate", (e) => {
	const likesModal = document.getElementById("likes-modal");
	const commsModal = document.getElementById("comments-modal");
	const shareModal = document.getElementById("share-modal");
	const optionsModal = document.getElementById("unfollow-modal");
	const signInModal = document.getElementById("login-modal");
	const signUpModal = document.getElementById("register-modal");
	const searchModal = document.getElementById("search-modal-container");
	const notiModal = document.getElementById("notification-modal-container");
	const user = getAuth().currentUser;

	if (
		(likesModal.style.display === "flex" && commsModal.style.display === "flex") ||
		likesModal.style.display === "flex"
	) {
		likesModal.style.display = "none";
	} else if (
		(shareModal.style.display === "flex" && commsModal.style.display === "flex") ||
		shareModal.style.display === "flex"
	) {
		shareModal.style.display = "none";
	} else if (
		(optionsModal.style.display === "flex" && commsModal.style.display === "flex") ||
		optionsModal.style.display === "flex"
	) {
		optionsModal.style.display = "none";
	} else if (
		(signInModal.style.display === "flex" && commsModal.style.display === "flex") ||
		signInModal.style.display === "flex"
	) {
		signInModal.style.display = "none";
	} else if (
		(signUpModal.style.display === "flex" && commsModal.style.display === "flex") ||
		signUpModal.style.display === "flex"
	) {
		signUpModal.style.display = "none";
	} else if (commsModal.style.display === "flex") {
		commsModal.style.display = "none";
	} else if (searchModal.style.display === "flex") {
		searchModal.style.display = "none";

	} else if(notiModal.style.display === "flex") {
		notiModal.style.display = "none";
	}

	if (window.location.href.includes("signUpM") && user) {
		signUpModal.style.display = "none";
		window.history.pushState("/", "Title", "/");
	} else if (window.location.href.includes("signInM") && user) {
		signInModal.style.display = "none";
		window.history.pushState("/", "Title", "/");
	} else if (window.location.href.includes("signUpM") && !user) {
		signUpModal.style.display = "flex";
	} else if (window.location.href.includes("signInM") && !user) {
		signInModal.style.display = "flex";
	} else if (window.location.href.includes("shareM") && !user) {
		shareModal.style.display = "none";
		window.history.pushState("/", "Title", "/");
	} else if (window.location.href.includes("shareM") && user) {
		shareModal.style.display = "flex";
	} else if (window.location.href.includes("commentsM")) {
		commsModal.style.display = "flex";
	} else if (window.location.href.includes("likesM")) {
		likesModal.style.display = "flex";
	} else if (window.location.href.includes("optionsM") && !user) {
		optionsModal.style.display = "none";
		window.history.pushState("/", "Title", "/");
	} else if (window.location.href.includes("optionsM") && user) {
		optionsModal.style.display = "flex";
	} else if (window.location.href.includes("searchM")) {
		searchModal.style.display = "flex";

	} else if(window.location.href.includes("notiM")) {
		notiModal.style.display = "flex";
	}

	if (window.location.href === "http://localhost:3000/") {
		likesModal.style.display = "none";
		shareModal.style.display = "none";
		optionsModal.style.display = "none";
		commsModal.style.display = "none";
		signInModal.style.display = "none";
		signUpModal.style.display = "none";
		searchModal.style.display = "none";
		notiModal.style.display = "none";
		homeIcon();
	}
});


const firebaseConfig = {
	apiKey: "AIzaSyDft-ERJnOSLsjY01BIvYaXN3BSQFcVvos",
	authDomain: "instagram-clone-33934.firebaseapp.com",
	projectId: "instagram-clone-33934",
	storageBucket: "instagram-clone-33934.appspot.com",
	messagingSenderId: "776008847798",
	appId: "1:776008847798:web:2b67fd832c1478c19ab117",
};

const app = initializeApp(firebaseConfig);


async function getUserData(id) {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	let userData;

	data.forEach((doc) => {
		if (id.length > 15) {
			if (doc.data().uid === id) {
				userData = doc;
			}
		} else {
			if (doc.data().username === id) {
				userData = doc;
			}
		}
	});

	return userData;
}

async function getUsers() {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	const user = getAuth().currentUser;
	let users = [];

	data.forEach((doc) => {
		users.push(doc.data());
	});

	return users;
}

async function getDocId(username) {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	let docId;

	data.forEach((doc) => {
		if (doc.data().username === username) {
			docId = doc.id;
		}
	});

	return docId;
}

async function searchFunction(value) {
	const data = await getDocs(collection(getFirestore(), "usernames"));
	const results = [];

	data.forEach((doc) => {
		if (doc.data().username.toLowerCase().includes(value.toLowerCase())) {
			results.push(doc.data().username);
		}
	});

	return results;
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

		getUserData(uid).then((user) => {
			leftButtons.classList.add("mobile-not-vissible");
			rightButtons.classList.add("buttons-not-vissible");
			suggestionsLeft.classList.add("mobile");
			profileInfoRight.classList.add("visible");
			suggestionsRight.classList.add("visible");
			rightUserName.textContent = user.data().username;
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

export { getUserData, getUsers, getDocId, searchFunction };
