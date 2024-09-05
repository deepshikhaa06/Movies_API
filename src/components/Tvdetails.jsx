import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "remixicon/fonts/remixicon.css";
import Horizontal_Cards from "./partials/Horizontal_Cards";
import { asyncloadtv } from "../utils/store/actions/tvactions";
import { removetv } from "../utils/store/reducers/tvSlice";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  console.log("info", info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)) ,
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" relative w-full h-[180vh] flex flex-col  pl-[4%] pt-3"
      >
        {/* PART 1 navigatION */}
        <nav className="h-[10vh] w-full text-white  text-xl gap-10 flex  items-center">
          <Link
            onClick={() => navigate(-1)}
            className=" hover: text-[#6556CD] ri-arrow-left-line"
          ></Link>
          <a target="_blank " href={info.detail.homepage}>
            <i class="ri-home-heart-line"></i>
          </a>
          <a
            target="_blank "
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i class="ri-earth-line"></i>
          </a>
          <a
            target="_blank "
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            IMDb
          </a>
        </nav>

        {/* PART 2  POSTER */}
        <div className="w-full flex mt-3">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.backdrop_path ||
              info.detail.poster_path ||
              info.detail.profile_path
            }`}
          />
          <div className="content ml-[5%] text-white">
            <h1 className="text-5xl font-bold text-white">
              {info.detail.title ||
                info.detail.name ||
                info.detail.original_name ||
                info.detail.original_title}
              <small className="text-xs font-bold text-zinc-400 ">
                ({" "}
                {info.detail.release_date ||
                  info.detail.first_air_date.split("-")[0] ||
                  info.detail.last_air_date ||
                  info.detail.original_release_date ||
                  info.detail.original_name}{" "}
                )
              </small>
            </h1>
            <div className="flex text-zinc-200 items-center gap-x-3 text-xl ">
              <span className=" mt-2 rounded-md h-[5vh] w-[10vh] flex justify-center items-center text-xl font-semibold bg-yellow-500">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>{" "}
              </span>
              <h1
              // className="w-[60px] font-semibold text-2xl leading-6 mt-3"
              >
                User Score
              </h1>
              <h1>{info.detail.first_air_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(" , ")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>
            <div>
              <h1 className="text-xl font-semibold italic text-zinc-200 ">
                {info.detail.tagline}{" "}
              </h1>
              <h1 className="text-2xl mt-2 ">Overview</h1>
              <p>{info.detail.overview}</p>
              <h1 className="text-2xl mt-2 ">Translated</h1>
              <p className="mb-8">{info.translations.join(" , ")}</p>
              <Link
                to={`${pathname}/trailer`}
                className="m-90 p-4  bg-[#6556CD] rounded-lg"
              >
                <i class="ri-play-fill"></i>Play Trailer
              </Link>
            </div>
          </div>
        </div>

        {/* PART 3  AVAILABLE PLATFORMS */}
        <div className="absolute top-96 flex flex-col mt-3 gap-3 ">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-3 items-center  text-white">
              <h1>AVAILABLE ON FLATRATE</h1>
              {info.watchproviders.flatrate.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] object-cover rounded-md "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt="image"
                ></img>
              ))}
            </div>
          )}
          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-5 items-center  text-white">
              <h1>AVAILABLE ON RENT</h1>
              {info.watchproviders.rent.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] object-cover rounded-md "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt="image"
                ></img>
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-5 items-center  text-white">
              <h1>AVAILABLE ON BUY</h1>
              {info.watchproviders.buy.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] object-cover rounded-md "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt="image"
                ></img>
              ))}
            </div>
          )}
        </div>

        <hr className="border-none h-[2px] bg-zinc-500 mt-8 mb-4" />

        {/* PART 5  Seasons */}
        <h1 className="text-3xl font-bold mb-4 text-zinc-300">Seasons</h1>
        
        {/* <div className="w-screen flex overflow-y-hidden bg-red-700">
        <div className="flex  bg-sky-700">
          {info.detail.seasons.map((s, i) => (
            <div key={i} className="flex flex-col w-[25vh] h-[30vh] overflow-y-hidden">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded-lg object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                  s.backdrop_path || s.poster_path || s.profile_path
                }`}
              />
              <h1 className="text-xl text-white  font-semibold">{s.name}</h1>
              <p className="text-sm text-white  font-semibold">{s.overview.slice(0, 50)}...
              <span className="text-zinc-300">more</span></p>
            </div>
          ))}
        </div>
        </div> */}

<div className="w-[100%] flex h-[42vh] pb-1 overflow-y-hidden">
{info.detail.seasons.map((s, i) => (
  <div className="min-w-[20%]  rounded-lg bg-zinc-900 mr-5">
    <img
    className="w-full  h-[55%] object-cover  rounded-md "
    src={`https://image.tmdb.org/t/p/original/${s.backdrop_path || s.poster_path || s.profile_path}`} alt={s.title || s.name || s.original_name || "Image"} /><div className="text-white p-3 ">
      <h1 className="text-xl font-semibold ">{s.title || s.name || s.original_name}</h1>
      <p className="mt-1 text-sm"> {s.overview.slice(0, 50)}... <span className="text-zinc-300">more</span>
      </p>
    </div>
    </div>
))}
</div>


        {/* PART 4  RECOMMENDATIONS AND SIMILAR */}

        <h1 className="text-3xl font-bold mb-4 text-zinc-300">
          Recommendation
        </h1>
        <Horizontal_Cards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
    </>
  ) : (
    <h1>Loadingg......</h1>
  );
};

export default Tvdetails;
