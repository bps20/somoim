import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import NeedAccept from "../routes/NeedAccept";
import Navigation from "components/Navigations";
import TourHistoryMap from "routes/HistoryMap";
import EditProfile from "routes/EditProfile";

const AppRouter = ({ isLoggedIn, userObj, isAcceptUser, isSubmitUser }) => {

    return (
        <Router>
            {isLoggedIn && isAcceptUser && isSubmitUser &&<Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (//Login여부확인
                    <>{(isAcceptUser && isSubmitUser)? (
                        <>
                            <Route exact path="/" element={<Home userObj={userObj} />} />
                            <Route exact path="/map" element={<TourHistoryMap userObj={userObj} />} />
                            <Route exact path="/EditProfile" element={<EditProfile userObj={userObj} />} />
                        </>) : (
                        <>
                            <Route exact path="/" element={<NeedAccept userObj={userObj} isSubmitUser={isSubmitUser}/>} />
                            <Route exact path="/map" element={<NeedAccept userObj={userObj} isSubmitUser={isSubmitUser}/>} />
                            <Route exact path="/EditProfile" element={<NeedAccept userObj={userObj} isSubmitUser={isSubmitUser}/>} />
                        </>)}

                    </>) : (
                    <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;