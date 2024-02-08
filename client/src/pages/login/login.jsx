import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handelSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        { email: email, password: password },
        { withCredentials: true }
      );
      //   console.log(res);

      if (res.data.success) {
        navigate("/");
      } else {
        alert(res.data.error);
      }
    } catch {}
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handelSumbit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={emailChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={passwordChange}
        />
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Home;
