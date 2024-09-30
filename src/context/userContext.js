 import axios from "axios";
 import { createContext, useEffect, useState ,useContext } from "react";
 import { useNavigate } from "react-router-dom";


export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
     JSON.parse(localStorage.getItem("user") || null)
  //{first_name:"לאה",last_name:"חסן"}
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ firstName,lastName, password }) => {
    const res = await axios.post("http://localhost:3600/api/manager/login", 
        {first_name:firstName,last_name:lastName,password:password}
    );
    setIsAuthenticated(true);
    setCurrentUser(res.data.user);
    setToken(res.data.accessToken);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
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
    <UserContext.Provider value={{ isAuthenticated,currentUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};





// // יצירת הקונטקסט
// //const UserContext = createContext();

// // קריאה למידע על מצב ההתחברות
// export const useUser = () => useContext(UserContext);

// // פונקציית ספק (Provider) לניהול המשתמש
// export const UserContextProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [currentUser, setCurrentUser] = useState(
//           JSON.parse(localStorage.getItem("user") || null)); 
//     const [token, setToken] = useState(localStorage.getItem("token") || null); // דוגמה לניהול מצב חיבור

//     // כאן אפשר לשים לוגיקה לבדיקת התחברות
//     const login = async ({ firstName,lastName, password }) => {
//           const res = await axios.post("http://localhost:3600/api/manager/login", 
//               {first_name:firstName,last_name:lastName,password:password}
//           );
//           setIsAuthenticated(true);
//           setCurrentUser(res.data.user);
//           setToken(res.data.accessToken);
//         };

//       const logout = () => {
//         setCurrentUser(null);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         setToken(null);
//         setIsAuthenticated(false);
//       };

//     return (
//         <UserContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

