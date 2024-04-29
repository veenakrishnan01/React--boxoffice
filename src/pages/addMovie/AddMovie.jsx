import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddMovie() {
  let navigate = useNavigate();

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
  const todayDate = new Date().toISOString().split("T")[0];

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  console.log(movieInputs);

  function handleSubmit(event) {
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
      .post("http://127.0.0.1:8000/boxofficeapi/add_movie", movieInputs)
      .then((response) => {
        console.log(response.data);
        toast.success("Movie added successfully");
        navigate("/adminDashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Movie not added");
      });
  }

  return (
    <div className="container">
      <AdminNavbar />
      <h1>Add Movie</h1>
      <form>
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
            min={todayDate}
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
            className="btn btn-primary ml-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
