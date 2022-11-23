import React, { useState } from "react";
import { updateProfile } from "firebase/auth";

const EditProfile = ({ isLoggedIn, userObj}) => {

    const [userName, setUserName] = useState(userObj.displayName);
    const [stateMsg, setStateMsg] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if ((userName.length >= 1)) { //닉네임 길이가 1이상
                if(userName !==userObj.displayName){
                    await updateProfile(userObj, {displayName: userName});
                    setStateMsg("이름이 성공적으로 변경되었습니다. 새로고침시 반영됩니다.")
                } else { setStateMsg("이름은 기존 이름과 달라야 합니다.")}
            } else { setStateMsg("이름의 길이는 1글자 ~ 10글자여야 합니다.")}
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const onChange = (event) => {
        const { target: { value },
        } = event;
        setUserName(value);
    };

    return (
        <>
        <h4>닉네임 수정</h4>
            <form onSubmit={onSubmit}>닉네임 : 
                <input value={userName} onChange={onChange} type="text" placeholder={userName} maxLength={10} />
                <input type="submit" value="변경" />
                <div>{stateMsg}</div>
            </form>
        </>
    );
};

export default EditProfile;