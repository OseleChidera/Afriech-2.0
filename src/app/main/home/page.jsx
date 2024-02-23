'use client'
import React, {useState} from 'react'
import Nav from '@/components/Nav'
import Location from '@/components/Location'
import SearchBar from '@/components/searchbar/SearchBar'
import BrandOptions from '@/components/brandOptions/BrandOptions'
import PopularItems from '@/components/PopularItems/PopularIems'
import ImageSlider from '@/components/imageslider/ImageSlider'
import { useSelector, useDispatch } from "react-redux";


const page = () => {
   const productsData = useSelector((state) => state.user.productsData);
  return (
    <div className='w-full relative min-h-screen max-h-fit border border-red-600   overflow-y-auto'>
      <div className="pt-8 pb-[120px] flex flex-col gap-4">
        {/* <div className="min-h-[300px] max-h-fit w-full h-fit border-[5px] border-black shadow-md"> */}
          <ImageSlider />
        {/* </div>  */}
        <PopularItems />
    </div>

    <Nav/>
    </div>
  )
}

export default page

