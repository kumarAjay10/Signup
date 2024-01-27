import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");

  const { email, password } = user;

  function handleInput(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  }

  async function implementLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("success", response.data);
      setSuccess(response.data.message);
      setToken(response.data.data.token);
      setErr("");
      setUser({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("failure", err);
      setErr(err.response.data.message);
      setSuccess("");
    }
  }
  return (
    <div>
        <h1>Login</h1>
      {success && <h2>{success}</h2>}
      {err && <h2>{err}</h2>}
      <form onSubmit={implementLogin}>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          value={email}
          onChange={handleInput}
        />

        <input
          type="password"
          placeholder="enter your password"
          name="password"
          value={password}
          onChange={handleInput}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
