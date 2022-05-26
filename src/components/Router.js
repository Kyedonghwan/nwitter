import React from "react";
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/navigation";

const AppRouter =  ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route element={<Home userObj={userObj}/>} exact path="/" />
                    <Route element={<Profile />} path="/profile" />
                </> : <Route element={<Auth />} path="/" />
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;