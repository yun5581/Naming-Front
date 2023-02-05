import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = 'VisitorSlice';

const initialState = {
  nickname: '' // 방문자이름
}

export const visitorSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    initVisitor: state => {
      state.nickname = initialState.nickname;
    },
    setVisitor: (state, action) => {
      state.nickname = action.payload.nickname;
    },
  },
    extraReducers: builder => {
      builder.addCase(PURGE, () => initialState);
    },
});

export const {setVisitor, initVisitor} = visitorSlice.actions;

export default visitorSlice.reducer;