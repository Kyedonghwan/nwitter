import React from "react";
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/navigation";

const AppRouter =  ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route element={<Home userObj={userObj}/>} exact path="/" />
                    <Route element={<Profile refreshUser={refreshUser} userObj={userObj}/>} path="/profile" />
                </> : <Route element={<Auth />} path="/" />
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;