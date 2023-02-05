import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "DictionarySlice";

const initialState = {
    option: 0,
    dictionaryId: "", // 사전 고유 번호
    colors: "",
    shapeNums: 0,
    shapeColors: 0,
    decoNums: 0,
    visit_dictionaryId: "", // 방문한 사전 고유 번호
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
    },
    setDictionary: (state,action) =>{
      state.colors = action.payload.colors;
      state.shapeNums = action.payload.shapeNums;
      state.shapeColors = action.payload.shapeColors;
      state.decoNums = action.payload.decoNums;
    },
    setVisit_dictionaryID: (state, action) => {
      state.visit_dictionaryId = action.payload.visit_dictionaryId;
    }
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setDictionaryID, setOption, initDictionary, setDictionary, setVisit_dictionaryID } = dictionarySlice.actions;

export default dictionarySlice.reducer;