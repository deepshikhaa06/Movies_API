import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  console.log("title", title);
  console.log("data", data);

  return (
    <>
      <div className="flex flex-wrap w-[full] ">
        {data.map((c, i) => (
          <Link
            to={`/${c.media_type || title.toLowerCase()}/details/${c.id}`}
            className="relative w-[25vw] mr-[5%] mt-3 "
            key={i}
          >
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                c.backdrop_path || c.poster_path || c.profile_path
              }`}
            />
            <h1 className="text-1xl text-zinc-300 mt-3 mb-3 font-semibold">
              {c.title || c.name || c.original_name}
            </h1>
            {c.vote_average && (
              <div className="absolute right-[-10%] bottom-[30%] rounded-md h-[5vh] w-[10vh] flex justify-center items-center text-xl font-semibold bg-yellow-500">
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cards;
