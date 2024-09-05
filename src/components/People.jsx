import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios"
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    const navigate=useNavigate()
    const [category,setcategory]=useState("popular")
    const [person,setPerson]=useState([])
    document.title="MDM | People  " + category.toLocaleUpperCase()+" s"

    const GetPerson = async () => {
        try {
          const { data } = await axios.get(`/person/${category}`);
          setPerson(data.results)
        } catch (e) {
          console.log("ERROR", e);
        }
      };
      console.log("person",person);
      useEffect(()=>{
        GetPerson()
      },[category])
  return (
    <>
      <div className='p-[3%] w-screen h-[100vh]  overflow-hidden overflow-y-auto '>
        <div className='flex items-center  justify-center w-full'>
            <h1 className='text-2xl  font-semibold text-zinc-400'>
                <i onClick={()=>navigate(-1)} className='hover:text-[#2510b1e8] mr-2 ri-arrow-left-line'></i>{""}
                People 
                <small className='ml-2 text-md text-zinc-600'>({category})</small>
            </h1>
            <div className='flex w-[85%]'>
                <Topnav/>
                
            </div>
            </div>
            <InfiniteScroll 
            dataLength={person.length}
            next={GetPerson}
            hasMore={true}
            loader={<h4>Loading.........</h4>}
            >
            <Cards data={person} title="person"/>
            </InfiniteScroll>
      </div>
    </>
  )
}

export default People
