import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import fbase from "firebase/compat/app"; //이거 한번 체크해봐야함.
console.log(fbase); //firebase 접속 체크용

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);