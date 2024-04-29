import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

function AdminNavbar() {
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
        <Link to="/adminDashboard" className="navbar-brand">
          BOXOFFICE
        </Link>
        <div>
          <Link to="/addMovie" className="btn btn-outline-success mx-2">
            Add Movie
          </Link>
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            type="button"
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

export default AdminNavbar;
