import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios"
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    const navigate=useNavigate()
    const [category,setcategory]=useState("movie")
    const [popular,setPopular]=useState([])
    document.title="MDM | Popular  " + category.toLocaleUpperCase()+" s"


    const GetPopular = async () => {
        try {
          const { data } = await axios.get(`/${category}/popular`);
          setPopular(data.results)
        } catch (e) {
          console.log("ERROR", e);
        }
      };
      console.log("popular",popular);
      useEffect(()=>{
        GetPopular()
      },[category])
  return (
    <>
      <div className='p-[3%] w-screen h-[100vh]  overflow-hidden overflow-y-auto '>
        <div className='flex items-center  justify-center w-full'>
            <h1 className='text-2xl  font-semibold text-zinc-400'>
                <i onClick={()=>navigate(-1)} className='hover:text-[#2510b1e8] mr-2 ri-arrow-left-line'></i>{""}
                Popular
            </h1>
            <div className='flex w-[85%]'>
                <Topnav/>
                <Dropdown title="Category" options={["movie","person","tv"]} func={(e)=>setcategory(e.target.value)}/>
                
            </div>
            </div>
            <InfiniteScroll 
            dataLength={popular.length}
            next={GetPopular}
            hasMore={true}
            loader={<h4>Loading.........</h4>}
            >
            <Cards data={popular} title={category}/>
            </InfiniteScroll>
      </div>
    </>
  )
}

export default Popular
