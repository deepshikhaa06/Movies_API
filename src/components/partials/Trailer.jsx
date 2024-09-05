import React from 'react'
import { useSelector } from 'react-redux'
import {  useLocation,useNavigate,Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

const Trailer = () => {
    const {pathname}=useLocation()
    const navigate=useNavigate()
    const category=pathname.includes("movie")?"movie":"tv"
    const ytvideo=useSelector((state)=>state[category].info.videos)
    console.log(pathname.includes("movie"),ytvideo);
    
  return ytvideo?(
    <>
      <div className='bg-[rgba(0,0,0,.9)] z-[100] top-0 left-0 absolute w-screen h-screen flex items-center justify-center'>
      <Link
            onClick={() => navigate(-1)}
            className="absolute top-[5%] right-[5%] hover: text-[#6556CD] ri-close-fill"
          ></Link>
        <ReactPlayer
        height={300}
        width={400}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        playing
        controls
        />
    </div>
    </>
  ):<h1>not found</h1>
}

export default Trailer
