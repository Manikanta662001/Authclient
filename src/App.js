import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useUserContext } from "./components/authContext/AuthContext";
function App() {
  const userContext = useUserContext();
  const { currentUser, isLoggedIn } = userContext;
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
