import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";

function EditMovie() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieInputs, setMovieInputs] = useState({
    movieName: "",
    language: "",
    actors: "",
    director: "",
    description: "",
    imageUrl: "",
    is_active: true,
    startDate: "",
    endDate: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let role = localStorage.getItem("role");

    if (role === "user") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/boxofficeapi/${id}/get_movie`) // Fetch movie data using the ID
      .then((response) => {
        setMovieInputs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
      });
  }, [id]); // Fetch movie data whenever the ID changes

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieInputs((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !movieInputs.movieName ||
      !movieInputs.language ||
      !movieInputs.actors ||
      !movieInputs.director ||
      !movieInputs.description ||
      !movieInputs.imageUrl ||
      !movieInputs.startDate ||
      !movieInputs.endDate
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .put(`http://127.0.0.1:8000/boxofficeapi/${id}/update_movie`, movieInputs) // Update movie data using the ID
      .then((response) => {
        console.log(response.data);
        toast.success("Movie details updated successfully");
        navigate("/adminDashboard"); // Redirect to admin dashboard after successful update
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };

  return (
    <div className="container">
      <AdminNavbar />
      <h1>Edit Movie</h1>
      <form>
        {/* Render form inputs with initial values */}
        <div className="mb-1">
          <label htmlFor="inputMovieName" className="form-label">
            Movie Name
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            name="movieName"
            id="inputMovieName"
            value={movieInputs.movieName}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="inputLanguage" className="form-label">
            Language
          </label>
          <select
            name="language"
            value={movieInputs.language}
            onChange={handleChange}
            className="form-control"
          >
            <option value="" disabled>
              select language
            </option>
            <option value="Malayalam">Malayalam</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-1">
          <label htmlFor="inputactors" className="form-label">
            Actors
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            name="actors"
            id="inputactors"
            value={movieInputs.actors}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="inputdirector" className="form-label">
            Director
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            name="director"
            id="inputdirector"
            value={movieInputs.director}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="inputdescription" className="form-label">
            Description
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            name="description"
            id="inputdescription"
            value={movieInputs.description}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="inputimage" className="form-label">
            Image URL
          </label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            name="imageUrl"
            id="inputimage"
            value={movieInputs.imageUrl}
            required
          />
        </div>

        <div className="mb-2 row">
          <div className="col-6">
            <label htmlFor="inputStartDate" className="form-label">
              Start date
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              type="date"
              name="startDate"
              id="inputStartDate"
              value={movieInputs.startDate}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="inputEndDate" className="form-label">
              End date
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              type="date"
              name="endDate"
              id="inputEndDate"
              value={movieInputs.endDate}
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <Link to="/adminDashboard" className="btn btn-danger me-2">
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMovie;
