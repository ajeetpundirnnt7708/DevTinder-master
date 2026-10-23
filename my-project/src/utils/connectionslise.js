import { createSlice } from "@reduxjs/toolkit";
const connectionSlice=createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addconnections:(state ,action)=>action.payload,
        removeconnection:()=>null,
    },

});
export const {addconnections,removeconnection}=connectionSlice.actions;
export default connectionSlice.reducer;