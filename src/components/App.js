import AppRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); //DB초기화 되었는지 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); //isLoggedIn 로그인 여부

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {setInit ? <AppRouter isLoggedIn={isLoggedIn}/> : "로그인 정보 불러오는 중.." }
      <footer>&copy; {new Date().getFullYear()} 소모임</footer>
    </>
  );
}

export default App;
