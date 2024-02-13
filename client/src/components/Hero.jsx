import React from "react";
import image from "../svg/photo.png"

const Hero = ()=>{
    return(
        <div className=" w-full h-screen flex justify-around items-center  ">
            <div className="text  flex-col justify-around  w-1/3 h-2/4 items-center ">
                <h1 className="head font-bold uppercase text-6xl  mb-7 ">Write that changes the world</h1>
                    <span > 
                    Lorem, ipsum dolor sit  amet consectetur adipisicing elit. Odit sapiente iusto ratione voluptas architecto quaerat, labore omnis fugit porro maiores.

                </span>
            </div>
            <div className="photo h-3/4 w-auto ">
            <img  src={image} alt="imageee" className=" w-auto h-full" ></img>
            </div>

        </div>
    )
}

export default Hero;