import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		signedIn: false,
		following: [],
		username: "",
		firestoreDocId: "",
		notifications: [],
		unReadMessages: [],
		unReadNoti: 0,
		avatar: "",
		messages: [],

	},
	reducers: {
		setSignedIn: (state, action) => {
			state.signedIn = action.payload;
		},
		setFollowing: (state, action) => {
			state.following = action.payload;
		},
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setFirestoreDocId: (state, action) => {
			state.firestoreDocId = action.payload;
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		},
		setUnReadMessages: (state, action) => {
			state.unReadMessages = action.payload;
		},
		setUnReadNoti: (state, action) => {
			state.unReadNoti = action.payload;
		},
		setAvatar: (state, action) => {
			state.avatar = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload
		}
	},
});

export const {
	setSignedIn,
	setFollowing,
	setUsername,
	setFirestoreDocId,
	setNotifications,
	setUnReadMessages,
	setUnReadNoti,
	setAvatar,
	setMessages
} = userSlice.actions;

export default userSlice.reducer;
