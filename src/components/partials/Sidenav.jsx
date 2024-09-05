import React from "react";
import 'remixicon/fonts/remixicon.css';

import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <>
      <div className="w-[17%] h-full border border-r-1 pt-6 pl-6">
        <h1 className="text-2xl font-bold text-white ">
        <i className=" text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className="text-2xl">MDM</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-2">
            <h1 className="text-white font-semibold text-xl mt-8 mb-2">New Feeds</h1>
            <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 ">
            <i className="ri-fire-fill mr-2"></i> Trending
            </Link>
            <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-bard-fill"></i>   Popular
            </Link>
            <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-movie-2-fill"></i>  Movies
            </Link>
            <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-tv-2-fill"></i>  Tv Shows
            </Link>
            <Link to="/person" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-team-fill"></i>   People
            </Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400 ml-2 mr-7"></hr>
        <nav className="flex flex-col text-zinc-400 text-xl gap-2">
            <h1 className="text-white font-semibold text-xl mt-8 mb-2">Website Information</h1>
            <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-information-line"></i>   About
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
            <i className="ri-phone-fill"></i>   Contact
            </Link>
            
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
