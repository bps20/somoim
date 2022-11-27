import AppRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import "components/App.css";

import { doc, getDoc } from "firebase/firestore";

function App() {
  const [init, setInit] = useState(false); //DB초기화 되었는지 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); //isLoggedIn 로그인 여부
  const [userObj, setUserObj] = useState(null); //user정보를 저장
  const [isAcceptUser, setAcceptUser] = useState(false); //유저가 승인되었는지 여부
  const [isSubmitUser, setSubmitUser] = useState(false); //유저 정보가 입력되었는지 여부

  let targetUid;

  useEffect(() => {
    authService.onAuthStateChanged((user) => { //auth가 갱신되면,
      if (user) {
        setIsLoggedIn(true); //로그인상태 표시
        setUserObj(user); //user정보를 저장
        targetUid = user.uid;
        checkAcceptUser(); //user승인여부 체크
        // setTimeout(() => checkAcceptUser(), 1000);
      } else {
        setAcceptUser(false);
        setSubmitUser(false);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); //[]는 렌더링 후 한번만 일어남.

  const checkAcceptUser = async () => {
    const docRef = doc(dbService, "member", targetUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSubmitUser(true);
      if(docSnap.data().accepted){
        console.log(docSnap.data().accepted);
        setAcceptUser(true);
      }
    } else {
    }
  }

  /*
  const checkAcceptUser = async() => {
    const docRef = doc(dbService, "member", targetUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAcceptUser(true);
    } else {
    }
  }*/

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} isAcceptUser={isAcceptUser} isSubmitUser={isSubmitUser}/> : "로그인 정보 불러오는 중.."}
      <footer className="tail">&copy; {new Date().getFullYear()} 맛집탐방 소모임</footer>
    </>
  );
}
export default App