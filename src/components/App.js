import AppRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); //DB초기화 되었는지 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); //isLoggedIn 로그인 여부
  const [userObj, setUserObj] = useState(null); //user정보를 저장

  useEffect(() => {
    authService.onAuthStateChanged((user) => { //auth가 갱신되면,
      if(user){
        setIsLoggedIn(true); //로그인상태 표시
        setUserObj(user); //user정보를 저장
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); //[]는 렌더링 후 한번만 일어남.

  return (
    <>
      {setInit ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "로그인 정보 불러오는 중.." }
      <footer>&copy; {new Date().getFullYear()} 소모임</footer>
    </>
  );
}

export default App;
