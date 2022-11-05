import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

const AppProfile = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };
    
    return (
        <>
            <button onClick={ onLogOutClick }>로그아웃</button>
        </>
    );
};

export default AppProfile;
