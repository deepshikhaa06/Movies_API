import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios"
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Outlet } from 'react-router-dom';

const Movies = () => {
    const navigate=useNavigate()
    const [category,setcategory]=useState("now_playing")
    const [movie,setMovie]=useState([])
    document.title="MDM | Movies  " + category.toLocaleUpperCase()+" s"

    const GetMovies = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}`);
          setMovie(data.results)
        } catch (e) {
          console.log("ERROR", e);
        }
      };
      console.log("movies",movie);
      useEffect(()=>{
        GetMovies()
      },[category])
  return (
    <>
      <div className='p-[3%] w-screen h-[100vh]  overflow-hidden overflow-y-auto '>
        <div className='flex items-center  justify-center w-full'>
            <h1 className='text-2xl  font-semibold text-zinc-400'>
                <i onClick={()=>navigate(-1)} className='hover:text-[#2510b1e8] mr-2 ri-arrow-left-line'></i>{""}
                Movies 
                <small className='ml-2 text-md text-zinc-600'>({category})</small>
            </h1>
            <div className='flex w-[85%]'>
                <Topnav/>
                <Dropdown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)}/>
                
            </div>
            </div>
            <InfiniteScroll 
            dataLength={movie.length}
            next={GetMovies}
            hasMore={true}
            loader={<h4>Loading.........</h4>}
            >
            <Cards data={movie} title="movie"/>
            </InfiniteScroll>
      </div>
      <Outlet />

    </>
  )
}

export default Movies
