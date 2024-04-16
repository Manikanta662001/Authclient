import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useUserContext } from "./components/authContext/AuthContext";
import Errorpage from "./pages/Errorpage";
function App() {
  const userContext = useUserContext();
  const { isLoggedIn } = userContext;
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
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}

export default App;
