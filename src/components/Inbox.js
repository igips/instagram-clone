import "../styles/Inbox.css";
import { NewMessageIcon } from "./Icons/MessageIcon";
import ava from "../img/ava.jpeg";
import ReactTimeAgo from "react-time-ago";
import trash from "../img/trash.png";
import { EmojiiIcon } from "./Icons/EmojiiIcon";
import { useEffect, useState } from "react";
import ReactDOM, { render } from "react-dom";
import Picker from "emoji-picker-react";
import { getUserDataFromUsersArray } from "./Home";
import uniqid from "uniqid";
import { getDocId } from "..";
import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { showShareModal } from "./Modals/ShareModal";
import { BackArrow } from "./Icons/ArrowIcons";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../features/userSlice";

function Inbox() {
	const dispatch = useDispatch();
	const [messageValue, setMessageValue] = useState("");
	const [activeMessage, setActiveMessage] = useState({ conversation: [] });
	const [activeMessageUser, setActiveMessageUser] = useState({ avatar: "", username: "" });
	const [messageSent, setMessageSent] = useState(false);

	const signedIn = useSelector((state) => state.user.signedIn);
	const yourUsername = useSelector((state) => state.user.username);
	const firestoreDocId = useSelector((state) => state.user.firestoreDocId);
	const unReadMessages = useSelector((state) => state.user.unReadMessages);
	const messages = useSelector((state) => state.user.messages);
	const users = useSelector((state) => state.usersAndPosts.users);



	useEffect(() => {
		if (messageSent) {
			getDocId(activeMessageUser.username).then(async (id) => {
				await updateDoc(doc(getFirestore(), "usernames", id), {
					unReadMessages: arrayUnion(yourUsername),
					messages: arrayUnion(activeMessage),
				});
				await updateDoc(doc(getFirestore(), "usernames", firestoreDocId), {
					messages: arrayUnion(activeMessage),
				});
				setMessageSent(false);
			});
		}
	}, [messageSent]);

	useEffect(() => {
		for (let m of messages) {
			if (m.username === activeMessageUser.username || m.username2 === activeMessageUser.username) {
				setActiveMessage(m);
				break;
			}
		}
	}, [messages]);

	useEffect(() => {
		const div = document.getElementById("inbox-send-message-info");
		const conversation = document.getElementById("inbox-right-conversation");

		if (signedIn) {
			if (activeMessage.conversation.length > 0) {
				div.style.display = "none";
				conversation.style.display = "flex";

				const scroll = document.getElementById("inbox-right-conversation-area");
				scroll.scrollTop = scroll.scrollHeight;
			} else {
				conversation.style.display = "none";
				div.style.display = "flex";
			}
		}
	}, [activeMessage]);

	useEffect(() => {
		const conv = Array.from(document.querySelectorAll(".conversation-div"));

		conv.forEach((c) => {
			if (c.childNodes[1].childNodes[0].textContent === activeMessageUser.username && window.innerWidth > 650) {
				c.style.background = "#efefef";
			} else {
				c.style.background = "none";
			}

			if (unReadMessages.includes(c.childNodes[1].childNodes[0].textContent)) {
				c.style.fontWeight = 600;
			} else {
				c.style.fontWeight = 400;
			}
		});

		if (unReadMessages.includes(activeMessageUser.username)) {
			updateDoc(doc(getFirestore(), "usernames", firestoreDocId), {
				unReadMessages: arrayRemove(activeMessageUser.username),
			});
		}
	});

	function deleteConversation() {
		updateDoc(doc(getFirestore(), "usernames", firestoreDocId), {
			messages: arrayRemove(activeMessage),
		});
		setActiveMessage({ conversation: [] });

		const newMessages = messages.filter(
			(mes) => mes.username !== activeMessageUser.username && mes.username2 !== activeMessageUser.username
		);
		dispatch(setMessages(newMessages));
		setActiveMessageUser({ avatar: "", username: "" });
	}

	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById("inbox-button");

		getDocId(activeMessageUser.username).then(async (id) => {
			const db = getFirestore();
			updateDoc(doc(db, "usernames", id), { messages: arrayRemove(activeMessage) });
			updateDoc(doc(db, "usernames", firestoreDocId), { messages: arrayRemove(activeMessage) });

			setActiveMessage({
				...activeMessage,
				conversation: [
					...activeMessage.conversation,
					{ date: Date.now(), username: yourUsername, text: messageValue },
				],
				date: Date.now(),
			});

			setMessageSent(true);
		});

		if (button.classList.contains("post-div-active")) {
			setMessageValue("");
			button.classList.remove("post-div-active");
			button.disabled = true;
		}
	}

	function showEmojiiPicker(e) {
		function hideEmojiiPicker(e) {
			let found = false;

			e.path.forEach((ele) => {
				if (ele.id === "inbox-emo" || ele.id === "inbox-emosvg" || ele.id === "inbox-emopath") {
					found = true;
				}
			});

			if (!found) {
				ReactDOM.unmountComponentAtNode(document.getElementById("inbox-emo"));
				window.removeEventListener("click", hideEmojiiPicker);
			}
		}

		if (!document.getElementById("inbox-emo").firstChild) {
			render(
				<Picker
					natvie={true}
					disableSearchBar={true}
					pickerStyle={{ position: "absolute", bottom: "35px", left: "0px" }}
					onEmojiClick={(e, emojiObject) => handleCommentEmoji(e, emojiObject)}
				/>,
				document.getElementById("inbox-emo")
			);

			window.addEventListener("click", hideEmojiiPicker);
		} else if (e.target.tagName === "svg" || e.target.tagName === "path") {
			ReactDOM.unmountComponentAtNode(document.getElementById("inbox-emo"));
		}
	}

	function handleCommentEmoji(e, emojiObject) {
		const textarea = document.getElementById("inbox-text");
		setMessageValue(textarea.value + emojiObject.emoji);

		const button = document.getElementById("inbox-button");

		if (!button.classList.contains("post-div-active")) {
			button.classList.add("post-div-active");
			button.disabled = false;
		}
	}

	function handleMessageTextAreaChange(e) {
		setMessageValue(e.target.value);

		const button = document.getElementById("inbox-button");

		if (e.target.value !== "" && !button.classList.contains("post-div-active")) {
			button.classList.add("post-div-active");
			button.disabled = false;
		} else if (e.target.value === "") {
			button.classList.remove("post-div-active");
			button.disabled = true;
		}
	}

	function writeMessage() {
		return (
			<section id="add-message-section" className="add-comment-section">
				<div className="add-comment-section-inner">
					<form
						onKeyDown={(e) => {
							if (e.key === "Enter") submitComment(e);
						}}
						onSubmit={(e) => submitComment(e)}
						className="comment-form"
					>
						<div onClick={(e) => showEmojiiPicker(e)} className="emoji-div">
							<div id="inbox-emo"></div>
							{EmojiiIcon("inbox-emo")}
						</div>
						<textarea
							id={"inbox-text"}
							value={messageValue}
							onChange={(e) => handleMessageTextAreaChange(e)}
							placeholder="Write a message…"
							className="add-comment-text-area"
							autoComplete="off"
						></textarea>
						<button id={"inbox-button"} className="post-div" disabled>
							Send
						</button>
					</form>
				</div>
			</section>
		);
	}

    function mobile() {
        if (window.innerWidth < 650) {
            document.getElementById("inbox-left").style.display = "none";
            document.getElementById("inbox-right").style.display = "flex";
        }
    }

    function mobileBack() {
       
        if (window.innerWidth < 650) {
            document.getElementById("inbox-right").style.display = "none";
            document.getElementById("inbox-left").style.display = "block";
        }
    }

	if (signedIn) {
		return (
			<main>
				<section id="inbox-section">
					<div id="inbox-left">
						<div id="inbox-left-header">
							<span>{yourUsername}</span>
							<span onClick={() => showShareModal()} id="new-message-icon-span">
								{NewMessageIcon()}
							</span>
						</div>
						<div id="inbox-message-list">
							{messages.map((message) => {
								const userData = getUserDataFromUsersArray(
									users,
									message.username === yourUsername ? message.username2 : message.username
								);
								const avatar = userData.avatar;

								return (
									<div
										onClick={() => {
											setActiveMessage(message);
											setActiveMessageUser(userData);
											updateDoc(doc(getFirestore(), "usernames", firestoreDocId), {
												unReadMessages: arrayRemove(userData.username),
											});
                                            mobile();

										}}
										key={uniqid()}
										className="conversation-div"
									>
										<img src={avatar ? avatar : ava} alt="" />
										<div className="conversation-div-info">
											<div className="conversation-div-username">
												{message.username === yourUsername
													? message.username2
													: message.username}
											</div>
											<div className="conversation-div-message">
												{message.conversation[message.conversation.length - 1].text}
											</div>
										</div>
										<ReactTimeAgo
											timeStyle="mini-minute"
											date={message.conversation[message.conversation.length - 1].date}
											locale="en-US"
										/>
									</div>
								);
							})}
						</div>
					</div>
					<div id="inbox-right">
						<div id="inbox-send-message-info">
							<span>Your Messages</span>
							<button onClick={() => showShareModal()}>Send Message</button>
						</div>

						<div id="inbox-right-conversation">
							<div id="inbox-right-conversation-header">
                                <div onClick={() => mobileBack()} id="go-back-inbox-mobile">{BackArrow()}</div>
								<Link style={{ display: "flex" }} to={`/profile/${activeMessageUser.username}`}>
									<img
										id="conversation-header-avatar"
										src={activeMessageUser.avatar ? activeMessageUser.avatar : ava}
										alt=""
									/>
								</Link>
								<Link to={`/profile/${activeMessageUser.username}`}>
									<div id="conversation-header-username">{activeMessageUser.username}</div>
								</Link>
								<img
									onClick={() => {deleteConversation(); mobileBack()}}
									id="conversation-header-delete"
									src={trash}
									alt=""
								/>
							</div>
							<div id="inbox-right-conversation-area">
								{activeMessage.conversation.map((conv) => {
									if (conv.username === yourUsername) {
										return (
											<div key={uniqid()} className="conversation-row">
												<div className="conversation-cloud-right">{conv.text}</div>
											</div>
										);
									} else {
										return (
											<div key={uniqid()} className="conversation-row">
												<Link
													style={{ display: "flex", cursor: "default" }}
													to={`/profile/${activeMessageUser.username}`}
												>
													<img
														src={activeMessageUser.avatar ? activeMessageUser.avatar : ava}
														alt=""
														className="messages-avatars"
													/>
												</Link>
												<div className="conversation-cloud-left">{conv.text}</div>
											</div>
										);
									}
								})}
                                
							</div>
                            <div id="inbox-right-add-message">{writeMessage()}</div>
						</div>
                        
					</div>
                    
                    
				</section>
                
			</main>
		);
	} else {
		return <></>;
	}
}

export default Inbox;
