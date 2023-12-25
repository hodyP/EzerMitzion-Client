import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
 

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [token, setToken] = useState(localStorage.getItem("token") || "null");

  const login = async ({ firstName,lastName, password }) => {
    const res = await axios.post("http://localhost:3600/api/manager/login", 
        {first_name:firstName,last_name:lastName,password:password}
    );

    setCurrentUser(res.data.user);
    setToken(res.data.accessToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    console.log("User JSON:", userJSON);
    
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <UserContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};