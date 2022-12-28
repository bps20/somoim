import { authService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthErrorCodes } from "firebase/auth";
import "routes/Auth.css";
import { FaSmileWink } from "react-icons/fa";

/* 로그인 화면 */
const Auth = () => {
    const [email, setEmail] = useState(""); //email 체크
    const [password, setPassword] = useState(""); //password 체크
    const [guest, setGuest] = useState(true); //Guest mode
    const [newAccount, setNewAccount] = useState(false); //아이디 생성여부 체크
    const [error, setError] = useState(""); //에러 체크

    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault(); //기본행위 실행방지
        try {
            let data;
            if (newAccount) {//Account 생성
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else { //login
                data = await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }

    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const toggleGuest = () => setGuest((prev) => !prev);

    const guestLogin = async (event) => {
        event.preventDefault();
        try {
            let data;
            data = await signInWithEmailAndPassword(authService, 'guest@guest.com', 'guestguest');
        } catch (error) {
            setError(error.message);
        }
    }



    /*구글 로그인 현재 사용하지 않음*/
    const onSocialClick = async (event) => {
        const { target: { name } } = event; //ev6
        let provider;
        try {
            if (name === "google") {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
                //const credential = GoogleAuthProvider.credentialFromResult(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="login_wrap">
            <div style={{ height: '5vh', padding: '0 50%' }}></div>
            <div>
                <img name="google" className="mainlogo" onClick={guestLogin} src={require("img/mainlogo.jpeg")} />
            </div>
            {guest ? (
                <div style={{ paddingBottom: '10vh', color: 'gray'}}>로고를 클릭하면 소모임원으로 로그인됩니다.</div>
            ) : (
                <div id="login_box">
                    <form className="login_box_form" onSubmit={onSubmit}>
                        <div className="login_box_container">
                            <input className="login_box_input" name="email" type="email" placeholder="이메일"
                                required value={email} onChange={onChange} />
                            <input className="login_box_input" name="password" type="password" placeholder="암호"
                                required value={password} onChange={onChange} />
                            <input className="login_box_submit" type="submit" value="&rarr;" />
                        </div>
                        <div>
                            {error}
                        </div>
                    </form>
                    <div>
                        <img name="google" className="login_other_button" onClick={() => alert("사이트 관리자가 Google 로그인을 허용하지 않은 상태입니다.")} src={require("img/google_login.png")} />
                    </div>
                </div>
            )}
            <button onClick={toggleGuest}>
                {guest ? "사이트 관리자로 접속" : "소모임원으로 접속"}
            </button>



        </div>
    )
};
export default Auth;