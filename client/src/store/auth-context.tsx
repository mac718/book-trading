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
  const initialToken = localStorage.getItem("token");
  const initialCurrentUser = localStorage.getItem("currentUser");
  const [token, setToken] = useState<string | null>(initialToken);
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(initialCurrentUser as string)
  );

  const isLoggedIn = !!token;

  const logInHandler = (token: string, user: User) => {
    setToken(token);
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logOutHandler = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
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
