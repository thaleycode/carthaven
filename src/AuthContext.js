import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// create AuthProvider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // handle login
  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  // Provide the authentication state and functions to children components
  const value = {
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
  };

return (
    <AuthContext.Provider value={{ isLoggedIn, username, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}