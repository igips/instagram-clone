import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "./styles/index.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDft-ERJnOSLsjY01BIvYaXN3BSQFcVvos",
	authDomain: "instagram-clone-33934.firebaseapp.com",
	projectId: "instagram-clone-33934",
	storageBucket: "instagram-clone-33934.appspot.com",
	messagingSenderId: "776008847798",
	appId: "1:776008847798:web:2b67fd832c1478c19ab117",
};

const app = initializeApp(firebaseConfig);

onAuthStateChanged(getAuth(), (user) => {
  const rightButtons = document.getElementById("right-div-for-buttons");
  const leftButtons = document.getElementById("home-left-button-div");
  const suggestionsLeft = document.getElementById("suggestions-left-div");
  const profileInfoRight = document.getElementById("home-right-profile-inner"); 
  const suggestionsRight = document.getElementById("suggestions-div-right");
  const homeIcon = document.getElementById("home-icon");

	if (user) {
		const uid = user.uid;
    
		leftButtons.classList.add("mobile-not-vissible");
		rightButtons.classList.add("buttons-not-vissible");
    suggestionsLeft.classList.add("mobile");
    profileInfoRight.classList.add("visible");
		suggestionsRight.classList.add("visible");
   
		

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
