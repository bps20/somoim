import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigations";
import TourHistoryMap from "routes/HistoryMap";
import EditProfile from "routes/EditProfile";

const AppRouter = ({ isLoggedIn, userObj }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (//Login여부확인
                    <>
                        <Route exact path="/" element={<Home userObj={userObj} />} />
                        <Route exact path="/map" element={<TourHistoryMap userObj={userObj} />} />
                        <Route exact path="/EditProfile" element={<EditProfile userObj={userObj}/>} />} />
                    </>) : (
                    <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;