import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setdes] = useState("");

  const token = Cookies.get("token"); // Retrieve the token cookie
  useEffect(() => {
    console.log(token);
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/verify",
          {},
          { withCredentials: true }
        );
        console.log("responce is " + response);
        if (response.data.user) {
          setUser(response.data.user.email);
          console.log("welcome");
          // navigate("/");
        } else {
          console.log("error while verifying ");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      }
    };
    verifyToken();
  }, [token, navigate]);

  const Logout = async () => {
    Cookies.remove("token");
    console.log("Logged out");
    await axios.get(
      "http://localhost:4000/user/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const priceChange = (e) => {
    setPrice(e.target.value);
  };
  const desChange = (e) => {
    setdes(e.target.value);
  };

  const handelSumbit = async (e) => {
    e.preventDefault();

    const data = await axios.post(
      "http://localhost:4000/product/add",
      {
        name: name,
        price: price,
        description: des,
      },
      { withCredentials: true }
    );
    console.log(data);
    setName("");
    setPrice("");
    setdes("");
  };

  return (
    <div>
      <div>
        hello {user}
        <button onClick={Logout}>LogOut</button>
      </div>
      <div>
        <form onSubmit={handelSumbit}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter product's name"
            onChange={nameChange}
          />
          <input
            type="number"
            name="price"
            value={price}
            placeholder="Enter product's price"
            onChange={priceChange}
          />
          <input
            type="text"
            name="des"
            value={des}
            placeholder="Enter product's des"
            onChange={desChange}
          />
          <button type="sumbit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
