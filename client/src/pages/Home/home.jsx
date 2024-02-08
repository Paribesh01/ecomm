import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve the token cookie
    console.log(token);
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await axios.post(
          "http://localhost:4000/verify",
          {},
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.user) {
          setUser(response.data.user.email);
          console.log("welcome");
        } else {
          console.log("error while verifying ");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };
    verifyToken();
  }, [navigate]);

  return <div>hello {user}</div>;
};

export default Home;
