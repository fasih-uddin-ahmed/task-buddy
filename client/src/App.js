import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//using jwt decode to decode token to get current user info
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/Layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
//import Footer from "./components/Layout/Footer";
import Landing from "./components/Layout/Landing";
import Dashboard from "./components/profileview/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Board from "./components/Main/Board";
import Home from "./components/Main/Home";
import ModalComments from "./components/Main/CardFunctionality/common/comments/ModalComments";

import "./App.css";

//we are writing these lines to check if there is token in localstorage and we are refreshing...so we will keep the token in localstorage..even after refreshing
//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //here we are checking for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      //using provider so we can access global store in our application
      <Provider store={store}>
        <Router>
          
        <ToastContainer />
          <div className="App">
            <Navbar />
            
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/board/:boardID" component={Board} />
            </Switch>
            <div className="container">
              {/* <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/profiles" component={Profiles} /> */}
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/:handle"
                  component={Profile}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/card/:cardID"
                  component={ModalComments}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>

              <Route exact path="/not-found" component={NotFound} />

              {/* <Route exact path="/how-it-works" component={HowItWorks} /> */}
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
