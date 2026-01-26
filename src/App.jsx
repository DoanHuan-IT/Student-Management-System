import React from 'react'
import {useState} from "react";
import {logoutAPI} from "./services/authJWT";
import AppRouter from './AppRouter';

function App() {
  const [user, setUser] = useState(() => {
    const saveUser = localStorage.getItem('user');
    const saveToken = localStorage.getItem('accessToken');

    return (saveUser && saveToken) ? JSON.parse(saveUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
  }

  const handleLogout = () => {
    logoutAPI();
    setUser(null);
  }

  return (
      <AppRouter
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
  )
}

export default App
