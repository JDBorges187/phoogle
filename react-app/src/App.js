import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import SideBar from "./components/SideBar"
import SplashPage from "./components/Splash";
import PhotoGrid from "./components/Photos";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import AlbumsList from "./components/Albums";
import Footer from "./components/Footer"
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar user={user} />
      {/* <div className="sidebar"><h1>Left Bar</h1></div> */}
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage user={user}/>
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/albums" exact={true} >
          <SideBar user={user}/> 
          <AlbumsList />
        </ProtectedRoute>
        <ProtectedRoute path="/albums/:albumId" exact={true} >
          <SideBar user={user}/> 
          <PhotoGrid />
        </ProtectedRoute>
        <ProtectedRoute path="/photos" exact={true} >
          <SideBar user={user}/> 
          <PhotoGrid />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} >
          <Redirect to="/photos" />
        </ProtectedRoute>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
