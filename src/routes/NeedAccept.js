import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import "routes/NeedAccept.css";

import { GiExitDoor } from "react-icons/gi";
import { doc, setDoc } from "firebase/firestore";

const NeedAccept = ({ userObj, isSubmitUser }) => {
    const userID = userObj.uid;
    const userNick = userObj.displayName;
    const memberObj = doc(dbService, "member", `${userID}`); //멤버정보 매칭

    const [userName, setUserName] = useState("");
    const [userSection, setUserSection] = useState("");
    const [stateMsg, setStateMsg] = useState("");
    const [submitState, setSubmitState] = useState(isSubmitUser);


    const onLogOutClick = () => {
        authService.signOut();
        setTimeout(() => Navigate('/'), 1000);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if ((userName.length >= 1)) { //닉네임 길이가 1이상
                if (userSection === "default") { //직렬이 기본선택이면 거절
                    setStateMsg("직렬을 선택해주십시오.")
                } else {
                    await setDoc(memberObj, {
                        name: userName,
                        section: userSection,
                        accepted: false,
                        nickname: userNick
                    });
                    setSubmitState(true);
                    setStateMsg("성공적으로 제출되었습니다.")
                }

            } else { setStateMsg("이름의 길이는 1글자 ~ 10글자이어야 합니다.") }
        } catch (error) {
            console.error("Error ", error);
        }
    };

    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name === "nameInput") {
            setUserName(value);
        }
    };

    const handleChange = (event) => {
        const { target: { value },
        } = event;
        setUserSection(value);
    };

    return (
        <div id="NA_wrap">
            <ul id="NA_menu">
                <div> 관리자의 승인이 필요합니다.</div>
                <li id="NA_logout"><Link style={{ color: 'black', textDecorationLine: 'none' }} onClick={onLogOutClick} to="/"><GiExitDoor size="37" /><div>로그아웃</div></Link></li>
                {(!isSubmitUser || submitState) ? (
                    <div id="NA_info_wrap">
                        <div className="edit_name_text">이름은 1인 1아이디 제한으로 인해 소모임 가입 과정에서만 확인됩니다.</div>
                        <div className="edit_name_text2">실명으로 부탁드립니다. 승인과 동시에 데이터베이스에서 삭제됩니다.</div>
                        <div className="edit_name_text2">동의하시면 성함과 직렬을 입력하시고 진행하십시오.</div>
                        <div className="edit_name_text2">이름은 1~10글자로 설정할 수 있습니다.</div>
                        <div style={{ paddingTop: '50px' }}>
                            <form className="edit_name_form" onSubmit={onSubmit}>
                                <div className="edit_name_container">
                                    <input name="nameInput" className="edit_name_input" value={userName} onChange={onChange} type="text" placeholder="성함" maxLength={10} />
                                    <input type="submit" value="&rarr;" className="edit_name_arrow" />
                                </div>
                                <select onChange={handleChange}>
                                    {options.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <div id="edit_name_msg">{stateMsg}</div>
                            </form>
                        </div>
                    </div>) : (<div className="edit_name_text"><div>성공적으로 제출되었습니다.</div> <div>빠른 승인을 원하시면 연락부탁드립니다.</div></div>)}

            </ul>
        </div>
    )
}

const options = [
    { value: "default", name: "직렬선택" },
    { value: "일반행정", name: "일반행정" },
    { value: "재경", name: "재경" },
    { value: "인사조직", name: "인사조직" },
    { value: "법무행정", name: "법무행정" },
    { value: "국제통상", name: "국제통상" },
    { value: "교육행정", name: "교육행정" },
    { value: "사회복지", name: "사회복지" },
    { value: "교정", name: "교정" },
    { value: "보호", name: "보호" },
    { value: "검찰", name: "검찰" },
    { value: "출입국관리", name: "출입국관리" },
    { value: "일반기계", name: "일반기계" },
    { value: "전기", name: "전기" },
    { value: "화공", name: "화공" },
    { value: "일반농업", name: "일반농업" },
    { value: "산림자원", name: "산림자원" },
    { value: "일반수산", name: "일반수산" },
    { value: "일반환경", name: "일반환경" },
    { value: "기상", name: "기상" },
    { value: "일반토목", name: "일반토목" },
    { value: "건축", name: "건축" },
    { value: "시설조경", name: "시설조경" },
    { value: "방재안전", name: "방재안전" },
    { value: "전산개발", name: "전산개발" },
    { value: "정보보호", name: "정보보호" },
    { value: "통신기술", name: "통신기술" },
];

export default NeedAccept;