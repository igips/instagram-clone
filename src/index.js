import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import "./styles/index.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDft-ERJnOSLsjY01BIvYaXN3BSQFcVvos",
  authDomain: "instagram-clone-33934.firebaseapp.com",
  projectId: "instagram-clone-33934",
  storageBucket: "instagram-clone-33934.appspot.com",
  messagingSenderId: "776008847798",
  appId: "1:776008847798:web:2b67fd832c1478c19ab117"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


