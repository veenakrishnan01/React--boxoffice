/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MovieCard({ movie, fetchMovies }) {
  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const handleEditClick = () => {
    navigate(`/editMovie/${movie.id}`); // Navigate to the edit page with movie ID as a parameter
  };

  function disableMovie() {
    axios
      .get(`http://127.0.0.1:8000/boxofficeapi/${movie.id}/deactivate_movie`)
      .then((response) => {
        console.log(response.data);
        toast.success("Movie disabled successfully");
        setshowModal(false);
        fetchMovies();
      })
      .catch((error) => {
        console.error("Error disabling movie:", error);
      });
  }
  function enableMovie() {
    axios
      .get(`http://127.0.0.1:8000/boxofficeapi/${movie.id}/activate_movie`)
      .then((response) => {
        console.log(response.data);
        toast.success("Movie enabled successfully");
        setshowModal(false);
        fetchMovies();
      })
      .catch((error) => {
        console.error("Error enabling movie:", error);
      });
  }
  function deleteMovie() {
    axios
      .delete(`http://127.0.0.1:8000/boxofficeapi/${movie.id}/delete_movie`)
      .then((response) => {
        console.log(response.data);
        toast.success("Movie deleted successfully");
        setdeleteModal(false);
        fetchMovies();
      });
  }

  return (
    <>
      <div className="card m-3 shadow" style={{ width: "18rem" }}>
        <img
          className="card-img-top mx-auto mt-3"
          src={movie.imageUrl}
          alt={movie.movieName}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{movie.movieName}</h5>
          <p className="card-text">{movie.description}</p>
          <div>Director: {movie.director}</div>
          <div className="mt-2">Actors: {movie.actors}</div>
          <div className="mt-3">
            <button
              className="btn btn-outline-info mr-2"
              onClick={handleEditClick}
            >
              Edit
            </button>{" "}
            {/* Add onClick handler to navigate to edit page */}
            {movie.is_active ? (
              <button
                className="btn btn-outline-warning mx-2"
                onClick={() => setshowModal(true)}
              >
                Disable
              </button>
            ) : (
              <button
                className="btn btn-outline-success mx-2"
                onClick={() => setshowModal(true)}
              >
                Enable
              </button>
            )}
            <button
              className="btn btn-outline-danger"
              onClick={() => setdeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onClose={() => setshowModal(false)}
        message={`Are you sure want to ${
          movie.is_active ? "disable" : "enable"
        } ${movie.movieName}?`}
        onConfirm={movie.is_active ? disableMovie : enableMovie}
      />
      <ConfirmationModal
        show={deleteModal}
        onClose={() => setdeleteModal(false)}
        message={`Are you sure want to delete ${movie.movieName}?`}
        onConfirm={deleteMovie}
      />
    </>
  );
}

export default MovieCard;
