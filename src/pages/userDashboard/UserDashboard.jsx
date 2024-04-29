import { useState, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserMovieCard from "../../components/UserMovieCard";

function UserDashboard() {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let role = localStorage.getItem("role");
    if (role === "user") {
      fetchMovies();
    } else if (role === "admin") {
      navigate("/adminDashboard");
    }
  }, []);

  function fetchMovies() {
    axios
      .get("http://127.0.0.1:8000/boxofficeapi/list_movie")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
      });
  }

  return (
    <div className="container">
      <UserNavbar />
      <p>Welcome to the world of cinematic magic!</p>
      <h1>BoxOffice Premiers</h1>
      <div className="container mt-5 row">
        {shows.length > 0 ? (
          shows.map((movie) => <UserMovieCard key={movie.id} movie={movie} />)
        ) : (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
