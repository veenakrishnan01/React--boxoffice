import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import { toast } from "react-toastify";

function MovieBookingPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [bookingDetails, setBookingDetails] = useState({
    movieId: id,
    movieName: "",
    date: "",
    time: "",
    seat_row: "",
    seat_number: "",
    price: 120,
    userName: "",
    email: "",
    name: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let role = localStorage.getItem("role");

    if (role === "admin") {
      navigate("/");
    }
  }, []);

  const minDate =
    movie?.startDate &&
    new Date(
      Math.max(new Date().getTime(), new Date(movie?.startDate)?.getTime())
    )
      ?.toISOString()
      ?.split("T")?.[0];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  function bookTicket(event) {
    event.preventDefault();

    if (
      !bookingDetails.date ||
      !bookingDetails.seat_number ||
      !bookingDetails.seat_row
    ) {
      return toast.error("Please fill all the fields");
    }

    let user = JSON.parse(localStorage.getItem("user"));
    bookingDetails.email = user.email;
    bookingDetails.userName = user.username;
    bookingDetails.name = user.name;
    bookingDetails.movieName = movie.movieName;
    bookingDetails.price = bookingDetails.price * bookingDetails.seat_number;

    // wtite code for book movie ticket
    var options = {
      key: "rzp_test_ybPAS0eOLwaMDC",
      key_secret: "6YHhNL96KUW2HjisBiGj3577",
      amount: bookingDetails.price * 100,
      currency: "INR",
      name: "Movie booking project",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        if (response?.razorpay_payment_id) {
          saveTicket();
        }
      },
      prefill: {
        name: "Veena",
        email: "veenagkrishna01@gmail.com",
        contact: "8289948040",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }

  function saveTicket() {
    axios
      .post("http://127.0.0.1:8000/boxofficeapi/book_ticket", bookingDetails)
      .then((res) => {
        console.log(res);
        navigate("/myBookings");
        toast.success("Ticket Booked Successfully,pls check youremail!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/boxofficeapi/${id}/get_movie`)
      .then((response) => {
        console.log(response);
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <UserNavbar />
      <div className=" my-5">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <img
                src={movie?.imageUrl}
                className="card-img-top"
                alt={movie?.movieName}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-8">
            <h2 className="mb-4">{movie?.movieName}</h2>
            <p>{movie?.description}</p>
            <p>Director: {movie?.director}</p>
            <p>Actors: {movie?.actors}</p>
            <p>Price: RS.120.00</p>
            <div className="row">
              <div className="form-group col-md-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={bookingDetails.date}
                  name="date"
                  onChange={handleChange}
                  min={minDate}
                  max={movie?.endDate}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="time">Time</label>
                <select
                  className="form-control"
                  id="time"
                  value={bookingDetails.time}
                  name="time"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    select time
                  </option>
                  <option value="11:30:00">11.30 AM</option>
                  <option value="14.30:00">02.30 PM</option>
                  <option value="18:30:00">05.30 PM</option>
                  <option value="22:30:00">08.30 PM</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="row">Row</label>
                <select
                  className="form-control"
                  id="row"
                  name="seat_row"
                  onChange={handleChange}
                  value={bookingDetails.seat_row}
                >
                  <option value="" disabled>
                    select seat row
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="seatNo">No of seats</label>
                <select
                  className="form-control"
                  id="seatNo"
                  name="seat_number"
                  onChange={handleChange}
                  value={bookingDetails.seat_number}
                >
                  <option value="" disabled>
                    select no of seats
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
            {bookingDetails.seat_number && (
              <div className="mt-3">
                Total price : RS.{bookingDetails.seat_number * 120}
              </div>
            )}

            <button className="btn btn-danger mt-3" onClick={bookTicket}>
              Book ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBookingPage;
