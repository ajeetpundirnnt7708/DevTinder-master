import './App.css'
import Body from './Body';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './assets/Login';
import Profile from "./assets/Profile"
import {Provider} from "react-redux";
import appstore from './utils/Appstore';
import Feed from './assets/Feed';
import   Connections from './assets/connection';
import Navbar from './navcom';
import Request from '../src/assets/request';

function App() {
  return (
    <div>
      <Provider store={appstore}>
        <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/request" element={<Request/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App