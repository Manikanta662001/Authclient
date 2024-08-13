import React, { useEffect } from "react";
import { httpMethods } from "../api/Service";
import { useUserContext } from "../components/authContext/AuthContext";
import { BE_URL } from "../utils/Constatnts";

function Dashboard() {
  const userContext = useUserContext();
  const { setCurrentUser, setIsLoggedIn, currentUser } = userContext;
  useEffect(() => {
    httpMethods
      .get(BE_URL + "/get-user")
      .then((result) => {
        setCurrentUser(result);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome Mr. {currentUser?.name}</h1>
      <div style={{ width: "15%", margin: "auto" }}>
        <img
          src={`/profile-imgs/${currentUser.profileimg}`}
          alt="img"
          style={{ width: "200px" }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
