import React from "react";
import "./Box.css";
import { Link } from "react-router-dom";

const Box = (props) => {
  return (
    // <div key={props.id} className="box bg-black">
    // <div className="image  ">
    //     <img  src="https://images6.alphacoders.com/133/1338694.png" alt="imageee" className="w-full h-full" />
    // </div>
    // <div className="texts" >
    //     <h1 className=" font-bold uppercase text-xl  ">{props.title} </h1>
    // </div>
    // </div>

    <div key={props.id} className="table drop-shadow-xl rounded-lg ">
      <div className="image  ">
        <img
          className=" im rounded-t-lg "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71hqFt5cuELZ3ZYUtI9zOZphOlgGunxk_pygdjZ5kUA&s"
          alt={props.img}
        />
      </div>
      <div className="texts flex justify-center">
        <div className=" w-4/5 mt-8 ">
          <h1 className=" font-bold uppercase text-xl  text-customBlue ">
            {props.title}{" "}
          </h1>
          <p>{props.text}</p>
        </div>
      </div>
      <div className=" mt-12 ml-10">
        <Link to={"/blog/" + props.id}>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>

    // <div key={props.id} className="">
    // <h1 className="font-bold uppercase">{props.title}</h1>
    // <p className="blogtext">{props.text}</p>
    // <Link to={'blog/'+props.id}>
    // <button >Read More</button>
    // </Link>
    // </div>
  );
};

export default Box;
