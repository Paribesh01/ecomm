import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "../../components/Box";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [des, setdes] = useState("");
  const [blogs, setBlogs] = useState([]);

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

    // featching product for the user

    const showBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/blog/showall", {
          withCredentials: true,
        });
        if (response) {
          console.log(response.data);
          setBlogs(response.data);
        }
      } catch {
        console.log("Error while fetching products");
      }
    };
    showBlogs();
  }, [token, navigate, blogs]);

  const Logout = async () => {
    // Send request to server to logout
    try {
      await axios.get("http://localhost:4000/user/logout", {
        withCredentials: true,
      });
      console.log("Logged out");
      // Redirect to login page or any other appropriate action after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const desChange = (e) => {
    setdes(e.target.value);
  };

  const handelSumbit = async (e) => {
    e.preventDefault();

    const data = await axios.post(
      "http://localhost:4000/product/add",
      {
        title: name,
        description: des,
      },
      { withCredentials: true }
    );
    console.log(data);
    setName("");
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
            type="text"
            name="des"
            value={des}
            placeholder="Enter product's des"
            onChange={desChange}
          />
          <button type="sumbit">Add</button>
        </form>
      </div>
      <div>
        <h1>Products:</h1>
        <ul className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {blogs.map((blog, index) => (
            <Box id={index} title={blog.title} text={blog.description} />

            // <li key={index}>
            //   <h3>{product.name}</h3>
            //   <p>Price: {product.price}</p>
            //   <p>Description: {product.description}</p>
            // </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
