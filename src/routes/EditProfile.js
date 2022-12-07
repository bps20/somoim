import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, dbService } from "fbase";
import "routes/EditProfile.css";
import { Link, Navigate } from "react-router-dom";
import { FaUserTag } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { doc, updateDoc } from "firebase/firestore";

const EditProfile = ({ userObj }) => {

    const userID = userObj.uid;

    const [userName, setUserName] = useState("");
    const [stateMsg, setStateMsg] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if ((userName.length >= 1)) { //닉네임 길이가 1이상
                if (userName !== userObj.displayName) {
                    await updateProfile(userObj, { displayName: userName });
                    await updateDoc(doc(dbService,"member", userID),{nickname: userName});
                    setStateMsg("별명이 성공적으로 변경되었습니다. 새로고침시 반영됩니다.")
                } else { setStateMsg("별명은 기존 별명과 달라야 합니다.") }
            } else { setStateMsg("별명의 길이는 1글자 ~ 10글자이어야 합니다.") }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const onChange = (event) => {
        const { target: { value },
        } = event;
        setUserName(value);
    };

    const onLogOutClick = () => {
        authService.signOut();
        //window.location.reload('/');
        setTimeout(() => Navigate('/'), 1000);
        
    };

    return (
        <div id="profile_wrap">
            <ul id="profile_menu_bar">
                <div id="profile_menu_contents">
                    <li className="content"><Link style={{ color: 'black', textDecorationLine: 'none' }}><FaUserTag size="37" /><div>별명 변경</div></Link></li>
                    <li className="content"><Link style={{ color: 'black', textDecorationLine: 'none' }} onClick={onLogOutClick} to="/"><GiExitDoor size="37" /><div>로그아웃</div></Link></li>
                </div>
            </ul>
            <div id="edit_name_wrap">
                <div id="edit_name_logo">별명 변경</div>
                <div className="edit_name_text">별명은 탐방모임 신청 및 탐방기록에 반영됩니다.</div>
                <div className="edit_name_text2">되도록 개인 구분이 가능한 별명으로 부탁드립니다.</div>
                <div className="edit_name_text2">별명은 1~6글자로 설정할 수 있습니다.</div>
                <div style={{paddingTop:'50px'}}>
                    <form className="edit_name_form" onSubmit={onSubmit}>
                        <div className="edit_name_container">
                            <input className="edit_name_input" value={userName} onChange={onChange} type="text" placeholder="변경할 이름" maxLength={6} />
                            <input type="submit" value="&rarr;" className="edit_name_arrow" />
                        </div>
                        <div id="edit_name_msg">{stateMsg}</div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default EditProfile;