'use client'
import React, { useEffect, useState } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade } from 'react-slideshow-image';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import Image from 'next/image';
import imagePlaceholder from "../../../public/images/imgplaceholder.jpg"


export default function ImageSlider() {
    const PopularProducts = useSelector((state) => state.user.PopularProducts);
    const data = useSelector((state) => state.user.data);
   

    const divStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '300px',
    }
    // useEffect(() => { console.log("lof of data from image slider ", data)},[])
  
  return (
    //   <div className="slide-container flex-1 shadow-md">
          <Slide >
              {data?.popularProductsArray ? (data.popularProductsArray.map((product, index) => (
                  <div key={index}>
                      <div style={{ ...divStyle, 'backgroundImage': `url(${product.imageGalleryImages[Math.floor(Math.random() * 6)].imageURL})` }}>
                          <Link href={`/popularProduct/${product.id}`}>
                              <span className='font-bold  bg-[#695acd] text-white rounded-xl  text-xs  capitalize px-4 py-[0.55rem] absolute bottom-[1rem] right-[1rem] '>{product.name}</span>
                          </Link>
                      </div>
                  </div>
              ))) : [...new Array(5)].map((product, index) => <ImageSliderLoadingSkeleton index={index}/>)}
          </Slide>
    //   </div>
  )
}

const ImageSliderLoadingSkeleton = ({ index }) => {
    return (
        <div className=''>
            <div key={index} className="relative flex justify-center items-center h-[300px]  w-full ">
                <Image src={imagePlaceholder} className='w-full h-full rounded-sm' />
            </div>
        </div>
    )
}

{/* <div className="slide-container flex-1 shadow-md">
    <Slide >
        {PopularProducts?.map((product, index) => (
            <div key={index}>
                <div style={{ ...divStyle }}>
                    <Image src={`${product.imageGalleryImages[Math.floor(Math.random() * 6)].imageURL}`} fill loading='lazy' />
                    <Link href={`/popularProduct/${product.id}`}>
                        <span className='font-bold  bg-[#695acd] text-white rounded-xl  text-xs  capitalize px-4 py-[0.55rem] absolute bottom-[1rem] right-[1rem] '>{product.name}</span>
                    </Link>
                </div>
            </div>
        ))}
    </Slide>
</div> */}




