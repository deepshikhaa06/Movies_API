import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios"
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';


const Trending = () => {
    const navigate=useNavigate()
    const [category,setcategory]=useState("all")
    const [duration,setDuration]=useState("day")
    const [trending,setTrending]=useState([])
    document.title="MDM | Trending  " + category.toLocaleUpperCase()+" s"

    const GetTrending = async () => {
        try {
          const { data } = await axios.get(`/trending/${category}/${duration}`);
          setTrending(data.results)
        } catch (e) {
          console.log("ERROR", e);
        }
      };
      console.log("trending",trending);
      useEffect(()=>{
        GetTrending()
      },[category,duration])
  return (
    <>
      <div className='p-[3%] w-screen h-[100vh]  overflow-hidden overflow-y-auto '>
        <div className='flex items-center  justify-center w-full'>
            <h1 className='text-2xl  font-semibold text-zinc-400'>
                <i onClick={()=>navigate(-1)} className='hover:text-[#2510b1e8] mr-2 ri-arrow-left-line'></i>{""}
                Trending
            </h1>
            <div className='flex w-[85%]'>
                <Topnav/>
                <Dropdown title="Category" options={["movie","tv","all","person"]} func={(e)=>setcategory(e.target.value)}/>
                <div className='ml-5 '>
                    <Dropdown title="Duration" options={["week","day"]} func={(e)=>setDuration(e.target.value)}/>
                </div>
            </div>
            </div>
            <InfiniteScroll 
            dataLength={trending.length}
            next={GetTrending}
            hasMore={true}
            loader={<h4>Loading.........</h4>}
            >
            <Cards data={trending} title={category}/>
            </InfiniteScroll>
      </div>
    </>
  )
}

export default Trending
