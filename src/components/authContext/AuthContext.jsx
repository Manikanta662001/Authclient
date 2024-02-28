import React, { createContext, useContext, useEffect, useState } from "react";
import { httpMethods } from "../../api/Service";

const UserContext = createContext(null);

function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const alldata = { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn };
  useEffect(() => {
    httpMethods
      .get("/get-user")
      .then((result) => {
        setCurrentUser(result);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setCurrentUser({});
        setIsLoggedIn(false);
      });
  }, []);
  return (
    <>
      <UserContext.Provider value={alldata}>{children}</UserContext.Provider>
    </>
  );
}
export const useUserContext = () => useContext(UserContext);
export default AuthContext;
