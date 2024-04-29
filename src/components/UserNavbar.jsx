import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function UserNavbar() {
  const navigate = useNavigate();

  const [logoutModal, setLogoutModal] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <Link to="/dashboard" className="navbar-brand">
          BOXOFFICE
        </Link>
        <div>
          <Link to="/myBookings" className="">
            My bookings
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => setLogoutModal(true)}
          >
            Logout
          </button>
        </div>
      </nav>
      <ConfirmationModal
        show={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={logout}
        message="Are you sure want to logout ?"
      />
    </>
  );
}

export default UserNavbar;
