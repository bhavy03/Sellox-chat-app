import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  myDetail: {
    user: null,
  },
  recieverId: null,
  currentCards: [],
  currentId: {},
  searchField: "",
  selectedConversation: null,
  myChats: [
    {
      _id: null,
      participants: [{}],
    },
  ],
  messages: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setMyDetail: (state, action) => {
      state.myDetail = action.payload;
    },
    setRecieverId: (state, action) => {
      state.recieverId = action.payload;
    },
    setAllCards: (state, action) => {
      state.currentCards = action.payload;
    },
    setCurrentCard: (state, action) => {
      state.currentId = action.payload;
    },
    setSearch: (state, action) => {
      state.searchField = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMyChats: (state, action) => {
      state.myChats = action.payload;
      // console.log(state.myChats)
    },
    setMessages: (state, action) => {
      state.messages = state.messages.concat(action.payload);
      // state.messages = [...state.messages, action.payload];
      // console.log(state.messages);
    },
  },
});

export const {
  setAllCards,
  setCurrentCard,
  setSearch,
  setAuthenticated,
  setMyDetail,
  setRecieverId,
  setSelectedConversation,
  setMyChats,
  setMessages,
} = cardSlice.actions;

export default cardSlice.reducer;
