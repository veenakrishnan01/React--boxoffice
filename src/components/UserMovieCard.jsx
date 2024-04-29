/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function UserMovieCard({ movie }) {
  const navigate = useNavigate();

  function navigateToBooking() {
    if (movie.is_active) {
      navigate(`/movieBooking/${movie.id}`);
    }
  }
  return (
    <div
      className={`col-sm-12 col-md-6 col-lg-4 mb-5 ${
        !movie.is_active ? "opacity-50" : ""
      }`}
      onClick={navigateToBooking}
    >
      <div className="card movie-card">
        <img
          src={movie.imageUrl}
          className="card-img-top movie-image"
          alt={movie.movieName}
        />
        <div className="card-body">
          <h5 className="card-title">{movie.movieName}</h5>
        </div>
      </div>
    </div>
  );
}

export default UserMovieCard;
