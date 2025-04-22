import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState,
	reducers: {
		updateBookmark: (state, action) => {
			state.value = action.payload;
		},
		addBookmark: (state, action) => {
			state.value.push(action.payload);
		},
		removeBookmark: (state, action) => {
			state.value = state.value.filter((bookmark) => bookmark !== action.payload);
		},
	},
});

export const { updateBookmark, addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
