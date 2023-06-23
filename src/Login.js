import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null); // Individual error states
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjkwNzZhYzZlYzYwNjZiYzIzNzQwNDI3YThjNjUzMSIsInN1YiI6IjY0NzY0ZDU0YjMzOTAzMDBjMWVhYWIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FcBflcpWbgtPUzwZvmuoJkgotC0djBkYCmUT6a65yXc",
      Accept: "application/json"
    }
  });
  const API_KEY = "269076ac6ec6066bc23740427a8c6531";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameError(null); // Clear error states when user submits form
    setPasswordError(null);

    if (!username) {
      setUsernameError("Username cannot be empty");
    }
    if (!password) {
      setPasswordError("Password cannot be empty");
    }
    if (!username || !password) return;
    try {
      // Call /authentication/token/new
      const requestTokenResponse = await client.get(
        "/authentication/token/new"
      );
      const request_token = requestTokenResponse.data.request_token;

      // Call /authentication/token/validate_with_login
      const sessionValidationResponse = await client.post(
        "/authentication/token/validate_with_login",
        {
          username,
          password,
          request_token
        }
      );

      if (!sessionValidationResponse.data.success) {
        throw new Error("Unable to validate session.");
      }

      // Call /authentication/session/new
      const sessionResponse = await client.post("/authentication/session/new", {
        request_token
      });
      const session_id = sessionResponse.data.session_id;

      // Call /account
      const accountResponse = await client.get(
        `/account?api_key=${API_KEY}&session_id=${session_id}`
      );
      const account_id = accountResponse.data.id;

      // Call the handleLogin function passed as prop
      handleLogin(session_id, account_id, username);
      navigate("/");
    } catch (err) {
      console.error(err);
      // setUsernameError('Failed to log in');
      setPasswordError("Failed to log in");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className={`apple-style-input ${
              usernameError ? "input-error" : ""
            }`}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`apple-style-input ${
              passwordError ? "input-error" : ""
            }`}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </label>
        <input type="submit" value="Submit" className="apple-style-button" />
      </form>
    </div>
  );
}

export default Login;
