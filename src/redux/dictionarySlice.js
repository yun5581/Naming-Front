import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "DictionarySlice";

const initialState = {
    option: 0,
    dictionaryId: "", // 사전 고유 번호
};

export const dictionarySlice = createSlice({
  name: name,
  initialState,
  reducers: {
    initDictionary: state => {
      state.option= initialState.option;
      state.dictionaryId = initialState.dictionaryId;
    },
    setOption: (state, action) =>{
      state.option=action.payload.option;
    },
    setDictionaryID: (state, action) => {
      state.dictionaryId = action.payload.dictionaryId;
    }
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setDictionaryID, setOption, initDictionary } = dictionarySlice.actions;

export default dictionarySlice.reducer;