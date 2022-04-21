import ReactTimeAgo from "react-time-ago";
import { followButtonForNoti } from "../Nav";
import uniqid from "uniqid";
import ava from "../../img/ava.jpeg";
import { useEffect } from "react";
import { closeModal } from "../Modals";
import { Link } from "react-router-dom";
import { homeIcon } from "../Icons/HomeIcon";
import { notificationIconNotClicked } from "../Icons/NotificationIcon";
import { getUserDataFromUsersArray } from "../Home";

function NotificationModal(props) {
	useEffect(() => {
		if (props.notifications.length === 0) {
			document.getElementById("no-notifications-modal").style.display = "flex";
		} else {
			document.getElementById("no-notifications-modal").style.display = "none";
		}
	}, [props.notifications]);

	function hideNotificationsModal() {
		const modal = document.getElementById("notification-modal-container");
		modal.style.display = "none";
		notificationIconNotClicked();
		window.history.back();
	}

	return (
		<div id="notification-modal-container">
			<div id="notification-modal-header">
				<span>Notifications</span>
				{closeModal(hideNotificationsModal)}
			</div>
			<div id="notifications-modal-noti">
				<div id="no-notifications-modal">No notifications</div>
				{props.notifications
					.slice(0)
					.reverse()
					.map((result) => {
						const userData = getUserDataFromUsersArray(props.users, result.username);
						return (
							<div key={uniqid()} className="noti-modal-single-result-mobile">
								<Link
									className="link-like-modal"
									onClick={() => {
										window.history.pushState("/", "Title", "/");
										document.getElementById("notification-modal-container").style.display = "none";
										if(result.username !== props.username) {
											homeIcon();
										}
									}}
									to={`/profile/${result.username}`}
								>
									<img src={userData.avatar ? userData.avatar : ava} alt="" />
									<div>
										<span className="noti-mobile-user-span">{result.username + " "}</span>
										{result.content + " "}
										<span className="noti-date-mobile">
											<ReactTimeAgo
												timeStyle="mini-minute-now"
												date={new Date(result.date)}
												locale="en-US"
											/>
										</span>
									</div>
								</Link>
								{followButtonForNoti(
									result.username,
									props.following,
									props.username,
									props.follow,
									props.unFollow
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default NotificationModal;
