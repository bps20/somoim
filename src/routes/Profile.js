import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";
import Map from "components/Map"

const AppProfile = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };
    
    return (
        <>
            <button onClick={ onLogOutClick }>로그아웃</button>
            <Map />
        </>
    );
};

export default AppProfile;
