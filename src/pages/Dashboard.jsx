import React, { useEffect } from "react";
import { fetchWithAccessToken, httpMethods } from "../api/Service";
import { useUserContext } from "../components/authContext/AuthContext";
import { BE_URL } from "../utils/Constatnts";

function Dashboard() {
  const userContext = useUserContext();
  const { setCurrentUser, setIsLoggedIn, currentUser } = userContext;
  const handleUserClick = (e) => {
    e.preventDefault();
    fetchWithAccessToken("get", BE_URL + "/userData")
      .then((resp) => {
        console.log("USER:::", resp);
      })
      .catch((err) => {
        setCurrentUser({});
        setIsLoggedIn(false);
      });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome Mr. {currentUser?.name}</h1>
      <div style={{ width: "15%", margin: "auto" }}>
        <img
          src={`/profile-imgs/${currentUser.profileimg}`}
          alt="img"
          style={{ width: "200px" }}
        />
        <button onClick={(e) => handleUserClick(e)}>get User Data</button>
      </div>
    </div>
  );
}

export default Dashboard;
