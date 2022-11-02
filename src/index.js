import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from "./firebase";
console.log(firebase); //firebase 접속 체크용

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);