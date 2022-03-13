import React, { FC, useState } from "react";

type AuthContextProps = {
  token: string | null;
  isLoggedIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  token: "",
  isLoggedIn: false,
  logIn: (token: string) => {},
  logOut: () => {},
});

export const AuthContextProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const isLoggedIn = !!token;

  const logInHandler = (token: string) => {
    setToken(token);
  };

  const logOutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
