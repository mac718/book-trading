import React, { FC, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  password: string;
};

type AuthContextProps = {
  token: string | null;
  currentUser: User | null;
  isLoggedIn: boolean;
  logIn: (token: string, user: User) => void;
  logOut: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  token: "",
  currentUser: null,
  isLoggedIn: false,
  logIn: (token: string) => {},
  logOut: () => {},
});

export const AuthContextProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  console.log("token", token);

  const isLoggedIn = !!token;

  const logInHandler = (token: string, user: User) => {
    setToken(token);
    setCurrentUser(user);
  };

  const logOutHandler = () => {
    setToken(null);
    setCurrentUser(null);
  };

  const contextValue = {
    token: token,
    currentUser: currentUser,
    isLoggedIn: isLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
