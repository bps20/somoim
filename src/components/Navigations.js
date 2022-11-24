import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSmileWink } from "react-icons/fa";
import { HiMenu, HiUserCircle } from "react-icons/hi";

import "components/Navigations.css";

const Navigation = ({ userObj }) => {
    const navigate = useNavigate();


    return (
        <nav id="nav_wrap">
            <ul id="menu_contents">
                <li className="content">
                    <Link to="/map" id="nav_menu" style={{color:'#d6d6d6'}}><HiMenu size="24" /></Link>
                </li>
                <li className="content" style={{height:'0'}}>
                    <Link to="/" id="nav_logo" style={{color:'#d6d6d6'}}><FaSmileWink size="24" /></Link>
                </li>
                <li className="content">
                    <Link to="/EditProfile" style={{color:'#d6d6d6'}}><div id="nav_profile"><div id="nav_name">{userObj.displayName}님</div><HiUserCircle size="24" /></div></Link>
                </li>
            </ul>
        </nav>)
}
export default Navigation; 
