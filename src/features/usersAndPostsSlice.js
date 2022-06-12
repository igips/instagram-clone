import { createSlice } from "@reduxjs/toolkit";

export const usersAndPostsSlice = createSlice({
	name: "usersAndPosts",
	initialState: {
		users: [],
		posts: [],
	},
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
	},
});

export const { setUsers, setPosts } = usersAndPostsSlice.actions;

export default usersAndPostsSlice.reducer;
