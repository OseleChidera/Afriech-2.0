import React, { useEffect, useState } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade } from 'react-slideshow-image';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';


export default function ImageSlider() {
    const PopularProducts = useSelector((state) => state.user.PopularProducts);
   

    const divStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '300px',
        // backgroundImage: `url(${product.imageGalleryImages[0].imageURL})`,
    }

  
  return (
      <div className="slide-container flex-1 shadow-md">
          <Slide >
              {PopularProducts?.map((product, index) => (
                  <div key={index}>
                      <div style={{ ...divStyle, 'backgroundImage': `url(${product.imageGalleryImages[0].imageURL})` }}>
                          <Link href={`/popularProduct/${product.id}`}>
                              <span className='font-bold  bg-[#695acd] text-white rounded-xl  text-xs  capitalize px-4 py-[0.55rem] absolute bottom-[1rem] right-[1rem] '>{product.name}</span>
                          </Link>
                      </div>
                  </div>
              ))}
          </Slide>
      </div>
  )
}
