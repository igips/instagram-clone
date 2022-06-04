import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "./styles/index.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { homeIcon } from "./components/Icons/HomeIcon.js";

TimeAgo.addDefaultLocale(en);


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


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

export { getUserData, getUsers, getDocId, searchFunction };
