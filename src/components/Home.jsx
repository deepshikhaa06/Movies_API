import React, {useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import Horizontal_Cards from "./partials/Horizontal_Cards";
import Dropdown from "./partials/Dropdown";



const Home = () => {
  document.title="MDM | Homepage"
  const [wall,setWall]=useState(null)
  const [trending,setTrending]=useState([])
  const [category,setcategory]=useState("all")
  const GetHeaderWall = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomwall=data.results[(Math.random()*data.results.length).toFixed()]
      setWall(randomwall);
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results)
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  useEffect(() => {
    !wall && GetHeaderWall()
     GetTrending()
  }, [category]);
  console.log("trending",trending);
  
  return wall  && trending ? (
    <>
      <Sidenav />
      <div className="w-[83%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wall}/>
        {/* <div className="w-full h-[40vh] p-5"> */}
        <div className="mb-2 flex justify-between p-3 pb-1">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown title="Filter" options={["tv","movie","all"]} func={(e)=>setcategory(e.target.value)}/>
        </div>
        {/* </div> */}
        <Horizontal_Cards data={trending} Category={setcategory}/>
      </div>
    </>
  ):(<h1>Loading....</h1>);
};

export default Home;
