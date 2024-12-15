import React, { useEffect, useState } from 'react'
import './intro.css'
import axios from 'axios'

function IntroductionProduct() {
    const [video,setVideo] = useState([])
    const handleFetchVideo = async () => {
        try {
            const {data} = await axios.get('http://localhost:7000/api/v1/get-all-video')
            setVideo(data.data)
            // console.log("data",data.data)
        } catch (error) {
            console.log("Internal server error",error)
        }
    }
    console.log("video",video)
    useEffect(()=>{
        handleFetchVideo();
    },[])
    return (
        <div className='indro-section'>
            <div className="into-container">
                <div className="heading">
                    <h2>Introduction of Our Products</h2>
                </div>
                <div className="row g-4">
                    {/* {
                        video && video.map((item,index) => (
                    <div key={index} className=' col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                        <div className='video-box'>
                            <iframe src="https://www.youtube.com/embed/akmkXzMf_IY?si=GDgAamPmPvFSJEJo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            {item?.url}
                        </div>
                    </div>  
                        ))
                    } */}
                    <div className=' col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                        <div className='video-box'>
                            <iframe src="https://www.youtube.com/embed/akmkXzMf_IY?si=GDgAamPmPvFSJEJo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className=' col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                        <div className='video-box'>
                            <iframe src="https://www.youtube.com/embed/akmkXzMf_IY?si=GDgAamPmPvFSJEJo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroductionProduct