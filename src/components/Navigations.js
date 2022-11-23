import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => <nav>
    <ul>
        <li>
            <Link to="/">공지사항</Link>
        </li>
        <li>
            <Link to="/profile">탐방지도</Link>
        </li>
    </ul>
</nav>
export default Navigation; 