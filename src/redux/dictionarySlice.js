import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "DictionarySlice";

const initialState = {
    dictionaryId: "", // 사전 고유 번호
    title: "", // 사전 제목 (유저 이름)
    color: "", // 표지 색
    shadow: "", // 실루엣
    shadowColor: "", // 실루엣 색
    border: "" // 기타 데코
};

export const dictionarySlice = createSlice({
  name: name,
  initialState,
  reducers: {
    initDictionary: state => {
      state.dictionaryId = initialState.dictionaryId;
      state.title = initialState.title;
      state.color = initialState.color;
      state.shadow = initialState.shadow;
      state.shadowColor = initialState.shadowColor;
      state.border = initialState.border;
    },
    setDictionary: (state, action)=> {
      state.title = action.payload.title;
      state.color = action.payload.color;
      state.shadow = action.payload.shadow;
      state.shadowColor = action.payload.shadowColor;
      state.border = action.payload.border;
    },
    setDictionaryID: (state, action) => {
      state.dictionaryId = action.payload.dictionaryId;
    }
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setDictionaryID, initDictionary } = dictionarySlice.actions;

export default dictionarySlice.reducer;