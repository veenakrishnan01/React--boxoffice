import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("token");
    if (user) {
      navigate("/adminDashboard");
    }
  }, []);

  function firstNameOnChangeHandler(event) {
    setFirstName(event.target.value);
  }

  function lastNameOnChangeHandler(event) {
    setLastName(event.target.value);
  }

  function emailOnChangeHandler(event) {
    setEmail(event.target.value);
  }
  function passwordOnChangeHandler(event) {
    setPassword(event.target.value);
  }
  function confirmPasswordOnChangeHandler(event) {
    setConfirmPassword(event.target.value);
  }
  function submitFormHandler(event) {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmpassword) {
      toast.error("Please fill all the fields !", {
        position: "top-right",
      });
      return;
    }
    if (password.length < 8) {
      toast.error(
        "This password is too short. It must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match !");
      return;
    }

    let formData = {
      first_name: firstName,
      last_name: lastName,
      username: email,
      email: email,
      password1: password,
      password2: confirmpassword,
    };

    axios
      .post("http://127.0.0.1:8000/boxofficeapi/signup", formData)
      .then((response) => {
        console.log(response);
        toast.success("Registration succesful ! Please login");

        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.password2?.[0]);
      });
  }
  return (
    <div>
      <h1>SignUp</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            className="form-control"
            onChange={firstNameOnChangeHandler}
            type="text"
            name="first_name"
            id="inputFirstName"
            value={firstName}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            className="form-control"
            onChange={lastNameOnChangeHandler}
            type="text"
            name="last_name"
            id="inputLastName"
            value={lastName}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            className="form-control"
            onChange={emailOnChangeHandler}
            type="email"
            name="email"
            id="inputEmail"
            value={email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            onChange={passwordOnChangeHandler}
            type="password"
            name="password"
            id="inputPassword"
            value={password}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            className="form-control"
            onChange={confirmPasswordOnChangeHandler}
            type="password"
            name="confirmpassword"
            id="inputConfirmPassword"
            value={confirmpassword}
            required={true}
          />
        </div>
        <br />
        <button className="btn btn-primary mb-3" onClick={submitFormHandler}>
          Register
        </button>

        <br />
        <Link to="/login"> Already have an account? Login ! </Link>
      </form>
    </div>
  );
}

export default SignUp;
