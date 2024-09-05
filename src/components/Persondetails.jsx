import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../utils/store/actions/personactions";
import { removeperson } from "../utils/store/reducers/personSlice";
import "remixicon/fonts/remixicon.css";
import Horizontal_Cards from "./partials/Horizontal_Cards";
import Dropdown from "./partials/Dropdown";

const Persondetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [category, setCategory] = useState("movie");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  console.log("info", info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <>
      <div className=" p-3 w-screen h-[250vh] bg-[#1F1E24]">
        {/* FOR ARROW */}
        <nav className="h-[6vh] w-full text-white  text-xl flex  items-center">
          <Link
            onClick={() => navigate(-1)}
            className=" hover: text-[#6556CD] ri-arrow-left-line"
          ></Link>
        </nav>
        {/* POSTER */}
        <div className="w-full flex ">
          <div className="w-[20%] pl-7 pt-4">
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            />
            <hr className="border-none h-[2px] bg-zinc-500 mt-6 w-[90%] mb-2" />
            {/* SOCIAL INFO */}
            <div className="text-white text-2xl gap-x-6 flex">
              <a
                target="_blank "
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i class="ri-earth-line"></i>
              </a>
              <a
                target="_blank "
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              >
                <i class="ri-facebook-fill"></i>
              </a>
              <a
                target="_blank "
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              >
                <i class="ri-instagram-line"></i>
              </a>
              <a
                target="_blank "
                href={`https://twitter.com/${info.externalid.twitter_id}`}
              >
                <i class="ri-twitter-x-fill"></i>
              </a>
            </div>
            {/* PERSONAL INFORMATION */}
            <div className="text-white my-5">
              <h1 className="text-2xl text-zinc-300 font-semibold ">
                Person Info
              </h1>
              <h1 className="text-lg text-zinc-400 font-medium mt-3 ">
                Known For
              </h1>
              <h1>{info.detail.known_for_department}</h1>
              <h1 className="text-lg text-zinc-400 font-medium mt-3 ">
                Birthday
              </h1>
              <h1>{info.detail.birthday}</h1>
              <h1 className="text-lg text-zinc-400 font-medium mt-3 ">
                Gender
              </h1>
              <h1>{info.detail.gender === 2 ? "Male" : "Female"}</h1>
              <h1 className="text-lg text-zinc-400 font-medium mt-3 ">
                Also Know As
              </h1>
              <h1>{info.detail.also_known_as.join(", ")}</h1>
              <h1 className="text-lg text-zinc-400 font-medium mt-3 ">
                Place of Birth
              </h1>
              <h1>{info.detail.place_of_birth}</h1>
            </div>
          </div>
          {/* RIGTH DETAILS  */}
          <div className="w-[80%]  ml-[5%]">
            <h1 className="text-6xl text-zinc-400 font-black my-5">
              {info.detail.name}
            </h1>
            <h1 className="text-xl text-zinc-500 font-semibold mb-2">
              {" "}
              Biography
            </h1>
            <p className="text-sm italic text-zinc-500">
              {info.detail.biography}
            </p>
            <h1 className="text-xl m-2 text-zinc-500 font-semibold">
              Known For
            </h1>
            <Horizontal_Cards data={info.combinedCredits.cast} />
            <div className="w-full flex justify-between mt-4">
              <h1 className="text-2xl text-zinc-500 font-semibold">Acting</h1>
              <Dropdown
                title="Catgory"
                options={["tv", "movie"]}
                func={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-lg shadow-white border-2 border-zinc-500 p-5 ">
              {info[category + "Credits"].cast.map((c, i) => (
                <li
                  key={i}
                  className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-500 cursor-pointer"
                >
                  <Link to={`/${category}/details/${c.id}`}>
                    <span>
                      {c.name ||
                        c.title ||
                        c.original_name ||
                        c.original_title ||
                        "Unnamed"}
                    </span>
                    <span className="block">
                      {c.character || "Unknown Character"}
                    </span>
                  </Link>
                </li>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>loading....</h1>
  );
};

export default Persondetails;
