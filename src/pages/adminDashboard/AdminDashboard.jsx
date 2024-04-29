import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import MovieCard from "../../components/MovieCard";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [shows, setShows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let role = localStorage.getItem("role");

    if (role === "admin") {
      fetchMovies();
    } else if (role === "user") {
      navigate("/dashboard");
    }
  }, []);

  function fetchMovies() {
    axios
      .get("http://127.0.0.1:8000/boxofficeapi/list_movie")
      .then((response) => {
        console.log(response.data);

        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
      });
  }

  return (
    <div className="container">
      <AdminNavbar />
      <h1>Manage Movies</h1>
      <div className="row">
        {shows?.length > 0 ? (
          shows.map((show) => (
            <div key={show.id} className="col-sm-12 col-md-6 col-lg-4">
              <MovieCard movie={show} fetchMovies={fetchMovies} />
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
