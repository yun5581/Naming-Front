import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "DictionarySlice";

const initialState = {
    option: 0,
    dictionaryId: "", // 사전 고유 번호
    Bcolor: "",
    shape: 0,
    Scolor: 0,
    deco: 0,
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
      state.Bcolor = action.payload.Bcolor;
      state.shape = action.payload.shape;
      state.Scolor = action.payload.Scolor;
      state.deco = action.payload.deco;
    }
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setDictionaryID, setOption, initDictionary, setDictionary } = dictionarySlice.actions;

export default dictionarySlice.reducer;