import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';

import "./styles/main.css";
import "./styles/App.css";

import { AuthContextProvider } from './AuthContext';
import Header from "./components/Header";
import AppRouter from "./AppRouter";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);


  return (
    <AuthContextProvider isAuth={isAuth} setIsAuth={setIsAuth}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <AppRouter />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;