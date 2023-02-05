import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = 'VisitorSlice';

const initialState = {
  nickname: '',// 방문자이름
  visit_dicName: '', // 방문한 사전이름
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
    setVisit_dicName: (state, action) => {
      state.visit_dicName = action.payload.visit_dicName;
    },
  },
    extraReducers: builder => {
      builder.addCase(PURGE, () => initialState);
    },
});

export const {setVisitor, initVisitor, setVisit_dicName} = visitorSlice.actions;

export default visitorSlice.reducer;
