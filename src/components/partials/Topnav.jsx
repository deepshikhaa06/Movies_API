import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearchResults(data.results);
    //   console.log("dataaa", data.results);
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <>
      <div className="w-full h-[8vh]  relative flex justify-center items-center">
        <i className="ri-search-line text-zinc-400 text-3xl"></i>
        <input
          className="w-[50%] text-zinc-400 mx-10 p-5 text-xl outline-none border-none bg-transparent"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        {/* <i className="ri-close-fill text-zinc-400 text-3xl"></i> */}
        <div className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto">
          {searchResults.map((s, i) => (
            <Link to={`/${s.media_type || title.toLowerCase()}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vw] h-[10vh] object-cover rounded mr-5"
                src={`https://image.tmdb.org/t/p/original/${
                  s.backdrop_path || s.poster_path || s.profile_path
                }`}
              />
              <span>
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topnav;
