import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import Users from "./Users";
import Post from "./Post";
import UserProfile from "./UserProfile";
import { getUser, removeUser } from "../data/repository";
import MessageContext from "../contexts/MessageContext";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [message, setMessage] = useState(null);

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };
  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);


  const updateUser = () =>{
    setUser(getUser())
  } 
  return (
    <div className="d-flex flex-column min-vh-100">
      <MessageContext.Provider value={{ message, setMessage }}>
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Switch>
              <Route path="/login">
                <Login loginUser={loginUser} />
              </Route>
              <Route path="/register">
                <Register loginUser={loginUser} />
              </Route>
              <Route path="/profile">
                <MyProfile user={user} logoutUser={logoutUser} />
              </Route>
              <Route path="/users">
                <Users user={user}/>
              </Route>
              <Route path="/user-profile/:username">
                <UserProfile user={user}/>
              </Route>
              <Route path="/edit-profile">
                <EditProfile user={user} updateUser={updateUser}/>
              </Route>
              <Route path="/post">
                <Post user={user} />
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
      </Router>
      </MessageContext.Provider>
    </div>
  );
}
