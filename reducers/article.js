import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { photos: [] },
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (photo) => photo !== action.payload
      );
    },
  },
});

export const { addPhoto, removePhoto } = articleSlice.actions;
export default articleSlice.reducer;
