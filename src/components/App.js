import AppRouter from "components/Router";
import React, { useState } from "react";
import { authService } from "fbase";

function App() {
  //isLoggedIn 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
