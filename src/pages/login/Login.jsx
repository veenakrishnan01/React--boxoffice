/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("token");
    let role = localStorage.getItem("role");

    if (user) {
      if (role === "admin") {
        navigate("/adminDashboard");
      } else if (role === "user") {
        navigate("/dashboard");
      }
    }
  }, []);

  function emailOnChangeHandler(event) {
    setEmail(event.target.value);
  }
  function passwordOnChangeHandler(event) {
    setPassword(event.target.value);
  }
  function submitFormHandler(event) {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your credentials");
      return;
    }

    let formData = {
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:8000/boxofficeapi/login", formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "user") {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.errors);
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
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

        <button className="btn btn-primary mb-3" onClick={submitFormHandler}>
          Login
        </button>

        <br />

        <Link to="/signup"> Don't have an account? Sign Up! </Link>
      </form>
    </div>
  );
}

export default Login;
