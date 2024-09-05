import React from "react";
import { Link } from "react-router-dom";

const Horizontal_Cards = ({ data }) => {
  console.log("data",data);
  
  return (
    <>
      

        <div className="w-[100%] flex h-[45vh] pb-1 overflow-y-hidden ">
         {data.length >0 ? data.map((d, i) => (
            <Link to={`/${d.media_type || title.toLowerCase()}/details/${d.id}`} key={i} className="min-w-[20%] rounded-lg bg-zinc-900 pb-3 mr-5">
              <img
                className="w-full h-[55%] object-cover rounded-full"
                src={`https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.poster_path || d.profile_path
                }`}   alt={d.title || d.name || d.original_name || "Image"}
              />
             <div className="text-white p-3 overflow-y-auto ">
             <h1 className="text-xl font-semibold ">
                {d.title || d.name || d.original_name}
              </h1>
              <p className="mt-1 mb-3 ">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-300">more</span>
              </p>
             </div>
            </Link>
          )) : <h1 className="text-white text-2xl text-center p-5">No Data Found </h1>}
        </div>
     
    </>
  );
};

export default Horizontal_Cards;
