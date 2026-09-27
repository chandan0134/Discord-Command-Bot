import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken")
  );

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard
      token={token}
      onLogout={handleLogout}
    />
  );
}

export default App;