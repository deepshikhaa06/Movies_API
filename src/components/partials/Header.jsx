import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Header = ({ data }) => {
  // console.log(data);

  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)) ,
          url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.poster_path || data.profile_path
          }`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="w-full h-[60vh] flex flex-col justify-end  p-[4%]"
      >
        <h1 className="w-[70%] text-5xl font-bold text-white mb-3">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="w-[70%] text-white ">
          {data.overview.slice(0, 200)}...
          <Link to={`/${data.media_type || title.toLowerCase()}/details/${data.id}`} className="text-blue-400">more</Link>
        </p>
        <p className="text-white">
          <i className="text-yellow-300 ri-megaphone-line mr-1"></i>
          {data.release_date ||"Coming soon..."}
          <i className="text-yellow-300 ri-album-fill ml-2 mr-1"></i>
          {data.media_type.toUpperCase()}
        </p>
        <Link className="text-white rounded-md font-semibold mt-5 p-4 w-[13vw]  bg-[#6556CD]">
          Watch Trailer
        </Link>
      </div>
    </>
  );
};

export default Header;
