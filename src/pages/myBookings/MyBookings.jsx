import { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingCard from "../../components/BookingCard";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

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
    } else if (role === "user") {
      fetchBookings();
    }
  }, []);

  // write code for fetch booking history
  function fetchBookings() {
    let user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`http://127.0.0.1:8000/boxofficeapi/${user.email}/get_mybookings`)
      .then((res) => {
        console.log(res);
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //
  }

  return (
    <div className="container">
      <UserNavbar />

      <div>
        {bookings?.length > 0 ? (
          <div>
            <h3 className="mb-5">Your booking history</h3>
            <div className="row">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} movie={booking} />
              ))}
            </div>
          </div>
        ) : (
          <div>No bookings found </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
