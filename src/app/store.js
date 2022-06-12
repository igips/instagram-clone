import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import usersPostsReducer from "../features/usersAndPostsSlice";
import modalsReducer from "../features/modalsSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		usersAndPosts: usersPostsReducer,
		modals: modalsReducer,
		
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	})
});
