import AppRouter from "./Router";
import React, { useState } from "react";

function App() {
  //isLoggedIn 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
