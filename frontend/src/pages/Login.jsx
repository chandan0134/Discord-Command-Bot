import { useState } from "react";
import { loginAdmin } from "../services/api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const data = await loginAdmin(username, password);

      localStorage.setItem("adminToken", data.token);

      onLogin(data.token);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed."
      );
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-card"
        onSubmit={handleSubmit}
      >
        <h1>Discord Bot Admin</h1>

        <p>Sign in to access the dashboard.</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;