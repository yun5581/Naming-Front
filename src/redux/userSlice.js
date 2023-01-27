import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "UserSlice";

const initialState = {
    userId: "", // 유저 고유 번호
    name: "", // 유저 이름
    ID: "",
    PW:""
};

export const userSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    initUser: state => {
      state.userId = initialState.userId;
      state.name = initialState.firstname;
    },
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.ID  = action.payload.ID;
      state.PW = action.payload.PW;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUser,initUser } = userSlice.actions;

export default userSlice.reducer;