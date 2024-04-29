import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

//admin
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AddMovie from "./pages/addMovie/AddMovie";
import EditMovie from "./pages/editMovie/EditMovie";
//user
import UserDashboard from "./pages/userDashboard/UserDashboard";
import MovieBookingPage from "./pages/movieBookingPage/MovieBookingPage";
import MyBookings from "./pages/myBookings/MyBookings";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const isAuthenticated = () => {
    let user = localStorage.getItem("token");
    return user ? true : false;
  };

  const isAdmin = () => {
    let role = localStorage.getItem("role");
    return role === "admin" ? true : false;
  };

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              isAdmin ? (
                <Navigate to="/adminDashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* admin urls */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/editMovie/:id" element={<EditMovie />} />
        {/* user urls */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/movieBooking/:id" element={<MovieBookingPage />} />
        <Route path="/myBookings" element={<MyBookings />} />
      </Routes>
    </>
  );
}

export default App;
