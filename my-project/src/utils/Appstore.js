 import {configureStore} from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import FeedReducer from './feedslice'
import connectionReducer from './connectionslise'
import requestReducer from "./requestslice"
 const appstore=configureStore({
    reducer:{
        user:userReducer,
        feed:FeedReducer,
        connections:connectionReducer,
        request:requestReducer

    },


})
export default appstore;