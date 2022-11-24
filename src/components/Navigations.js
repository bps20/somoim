import React from "react";
import { Link } from "react-router-dom";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";

const Navigation = ({ userObj }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };

    return (
    <nav>
        <ul>
            <div><BsEmojiSmile/> 환영합니다. {userObj.displayName}님</div>
            <li>
                <Link to="/">공지사항</Link>
            </li>
            <li>
                <Link to="/map">탐방지도</Link>
            </li>
            <li>
                <Link to="/EditProfile">닉네임수정</Link>
            </li>
            <li>
                <Link onClick={ onLogOutClick }>Logout</Link>
            </li>
        </ul>
    </nav>)
}
export default Navigation; 