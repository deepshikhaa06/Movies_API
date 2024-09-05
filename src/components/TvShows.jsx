import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios"
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const TvShows = () => {
    const navigate=useNavigate()
    const [category,setcategory]=useState("airing_today")
    const [shows,setShows]=useState([])
    document.title="MDM | Tv Shows  " + category.toLocaleUpperCase()+" s"

    const GetShows = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}`);
          setShows(data.results)
        } catch (e) {
          console.log("ERROR", e);
        }
      };
      console.log("shows",shows);
      useEffect(()=>{
        GetShows()
      },[category])
  return (
    <>
      <div className='p-[3%] w-screen h-[100vh]  overflow-hidden overflow-y-auto '>
        <div className='flex items-center  justify-center w-full'>
            <h1 className='text-2xl  font-semibold text-zinc-400'>
                <i onClick={()=>navigate(-1)} className='hover:text-[#2510b1e8] mr-2 ri-arrow-left-line'></i>{""}
                Tv Shows 
                <small className='ml-2 text-md text-zinc-600'>({category})</small>
            </h1>
            <div className='flex w-[85%]'>
                <Topnav/>
                <Dropdown title="Category" options={["on_the_air","popular","top_rated","airing_today"]} func={(e)=>setcategory(e.target.value)}/>
                
            </div>
            </div>
            <InfiniteScroll 
            dataLength={shows.length}
            next={GetShows}
            hasMore={true}
            loader={<h4>Loading.........</h4>}
            >
            <Cards data={shows} title="tv"/>
            </InfiniteScroll>
      </div>
    </>
  )
}

export default TvShows
