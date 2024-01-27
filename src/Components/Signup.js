import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const[success,setSuccess]=useState("");
  const[err,setErr]=useState("");
  const[token,setToken]=useState("");

  const { name, email, password, confirmPassword } = user;

  function handleInput(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  }

  async function implementSignUp(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      console.log("success",response.data)
      setSuccess(response.data.message);
      setToken(response.data.data.token);
      setErr("")
      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

    } 
    catch(err) {
       console.log("failure",err); 
       setErr(err.response.data.message)
       setSuccess("")
    }
  }
  return (
    <div>
        {
            success && <h2>{success}</h2>
        }
        {
            err && <h2>{err}</h2> 
        }
      <form onSubmit={implementSignUp}>
        <input
          type="text"
          placeholder="enter name"
          name="name"
          value={name}
          onChange={handleInput}
        />
        
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
       
        <input
          type="password"
          placeholder="enter your confirm password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInput}
        />
       
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
