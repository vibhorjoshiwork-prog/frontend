import React, { useState } from "react";
import axios from "axios";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://crowd-trust-backend.onrender.com/api-token-auth/",
        {
          username,
          password,
        }
      );

      console.log("SUCCESS:", res.data);

      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;