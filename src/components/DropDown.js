import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ava from "../img/ava.jpeg";
import testPic from "../img/test-img.jpg";
import { getUserDataFromUsersArray } from "./PictureCard";

function DropDown(props) {
	const [signedIn, setSignedIn] = useState(false);
    const [data, setData] = useState({username : "", posts: [], followers: [], following: []});
	const user = getAuth().currentUser;

    useEffect(() => {
            if(props.userData) {
                setData(getUserDataFromUsersArray(props.users, props.userData.username));
            }
    },[props.users, props.userData]);


	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	function button() {
		if (signedIn) {
			if (props.userData && user && props.userData.uid === user.uid) {
				return <button className="drop-down-button">Edit Profile</button>;
			} else if (props.userData && !props.following.includes(props.userData.username) && user) {
				return (
					<button onClick={() => props.follow(props.userData.username, props.right)} id="drop-down-button">
						Follow
					</button>
				);
			} else if(props.userData && user) {
				return (
					<>
						<button className="drop-down-button">Message</button>{" "}
						<button
							onClick={() => props.unFollow(props.userData.username)}
							id="drop-down-following-button"
							className="drop-down-button"
						>
							Unfollow
						</button>
					</>
				);
			}
		}
	}

    
        return (
            <div
                onMouseOver={() => keepDropDown()}
                onMouseLeave={() => hideDropDown()}
                className="drop-down"
                id="drop-down"
            >
                <div className="drop-down-inner-first">
                    <img id="drop-down-ava" src={ava} alt="" />
                    <span id="drop-down-username">{data.username}</span>
                </div>
                <div className="drop-down-inner-second">
                    <div className="drop-down-inner-second-inner">
                        <span id="drop-down-num-of-posts">{data.posts.length}</span>
                        <span>posts</span>
                    </div>
                    <div className="drop-down-inner-second-inner">
                        <span id="drop-down-num-of-followers">{data.followers.length}</span>
                        <span>followers</span>
                    </div>
                    <div className="drop-down-inner-second-inner">
                        <span id="drop-down-num-of-following">{data.following.length}</span>
                        <span>following</span>
                    </div>
                </div>
                <div className="drop-down-inner-third">
                    <img src={testPic} alt="" />
                    <img src={testPic} alt="" />
                    <img src={testPic} alt="" />
                </div>
                <div id="drop-down-inner-fourth">{button()}</div>
            </div>
        );

    

	
}

function dropDown(userData, dropDownSetUserData, e, ele, right) {
	if (window.innerWidth > 650) {
		const user = getAuth().currentUser;
		const dropDown = document.getElementById("drop-down");
		const rect = e.target.getBoundingClientRect();


        dropDownSetUserData(userData);

		if (user) {
			document.getElementById("drop-down-inner-fourth").style.display = "flex";
		} else {
			document.getElementById("drop-down-inner-fourth").style.display = "none";
		}

		dropDown.style.display = "flex";
		dropDown.style.left = rect.left + "px";
		dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) + (ele === "avaPic" ? 25 : 18) + "px";
		dropDown.style.position = right ? "fixed" : "absolute";

		if (window.innerHeight - dropDown.getBoundingClientRect().bottom < 0) {
			dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) - (user ? 350 : 290) + "px";
		}

		if (window.innerWidth - dropDown.getBoundingClientRect().left <= 390) {
			dropDown.style.left =
				rect.left - (410 - (window.innerWidth - dropDown.getBoundingClientRect().left)) + "px";
		}
	}
}

function hideDropDown() {
	const dropDown = document.getElementById("drop-down");

	if (dropDown) {
		dropDown.style.display = "none";
	}
}

function keepDropDown() {
	const dropDown = document.getElementById("drop-down");
	dropDown.style.display = "flex";
}

export default DropDown;
export { dropDown, hideDropDown, keepDropDown };
