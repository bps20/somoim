import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSmileWink } from "react-icons/fa";
import { HiMenu, HiUserCircle } from "react-icons/hi";

import "components/Navigations.css";

const Navigation = ({ userObj }) => {
    const navigate = useNavigate();

    const [isMenuOpen, setMenuOpen] = useState(false);  // 메뉴의 초기값을 false로 설정

    const toggleMenu = () => {
        setMenuOpen(isOpen => !isOpen); // on,off 개념 boolean
    }

    const offMenu = () => {
        setMenuOpen(false);
    }

    return (
        <div id="nav_wrap">
            <nav id="nav_bar_wrap">
                <ul id="menu_contents">
                    <li className="content">
                        <div id="nav_menu" onClick={toggleMenu} style={{ color: '#d6d6d6' }}><HiMenu size="24" />
                        </div>
                    </li>
                    <li className="content" style={{ height: '0' }}>
                        <Link to="/" id="nav_logo" style={{ color: '#d6d6d6' }} onClick={offMenu}><img style={{height: '28px'}} src={require("img/navlogo.png")} /></Link>
                    </li>
                    <li className="content">
                        <Link to="/editProfile" style={{ color: '#d6d6d6' }} onClick={offMenu}>
                            <div id="nav_profile"><div id="nav_name">{userObj.displayName}님</div><HiUserCircle size="24" /></div>
                        </Link>
                    </li>
                </ul>
            </nav>
            {isMenuOpen ? (
                <div id="nav_menu_wrap">
                    <hr style={{width:'100%', border:'1px solid', color:'#1b1b1c', margin:'0'}}/>
                    <div className="nav_menu_content">
                        <Link to="/map" className="nav_menu_link" onClick={offMenu}><div>탐방 지도</div></Link>
                    </div>
                    
                    <div className="nav_menu_content">
                        <Link to="/list" className="nav_menu_link" onClick={offMenu}>맛집 탐방 후기</Link>
                    </div>
                </div>) : (
                <div></div>
            )
            }
        </div>
    )
}
export default Navigation; 
