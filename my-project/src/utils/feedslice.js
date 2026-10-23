import { createSlice } from "@reduxjs/toolkit";
const FeedSlice = createSlice({
    name: 'feed',
    initialState:[],
    reducers: { // <-- fixed typo here
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            const newfeed=state.filter(user=>user._id!==action.payload);
            return newfeed;

        }
    }
});
export const { addFeed ,removeUserFromFeed} = FeedSlice.actions;
export default FeedSlice.reducer; // <-- fixed typo here