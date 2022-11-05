import { authService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState(""); //email 체크
    const [password, setPassword] = useState(""); //password 체크
    const [newAccount, setNewAccount] = useState(false); //아이디 생성여부 체크
    const [error, setError] = useState(""); //에러 체크

    const onChange = (event) => {
        const {
            target: { name, value },
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
            if (newAccount) {
                //create Account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                //login
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }

    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    
    const onSocialClick = async (event) =>{
        const {target:{name}} = event; //ev6
        let provider;
        try{
            if(name === "google"){
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
                //const credential = GoogleAuthProvider.credentialFromResult(result);
            }
        } catch(error){
            console.log(error);
        }
        
        console.log(event.target.name);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="이메일"
                    required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="암호"
                    required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Login"} />
                <div>
                    {error}
                </div>
            </form>
            <button onClick={toggleAccount}>
                {newAccount ? "로그인 모드" : "회원가입 모드"}
            </button>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
            </div>
        </div>
    )
}
    ;

export default Auth;