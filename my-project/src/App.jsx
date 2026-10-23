import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import "./App.css";

import appstore from "./utils/Appstore";
import Body from "./Body";
import Home from "./assets/Home";
import Login from "./assets/Login";
import Profile from "./assets/Profile";
import Feed from "./assets/Feed";
import Connections from "./assets/connection";
import Request from "./assets/request";
import NotFound from "./assets/NotFound";

const RequireAuth = ({ children }) => {
  const user = useSelector((store) => store.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Provider store={appstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route
              path="feed"
              element={
                <RequireAuth>
                  <Feed />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="connections"
              element={
                <RequireAuth>
                  <Connections />
                </RequireAuth>
              }
            />
            <Route
              path="request"
              element={
                <RequireAuth>
                  <Request />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
