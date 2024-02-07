'use client'
import Nav from '@/components/Nav'
import React, {useEffect , useState} from 'react'
import SearchBar from '@/components/searchbar/SearchBar'
import Product from '@/components/product/Product'
import { useSelector, useDispatch } from "react-redux";
import {getUserData} from '../../../utils/helperFunctions'


export default function page() {
  
  
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const [userData, setUserData] = useState(firebaseUserInfo ? firebaseUserInfo?.favourites : null);



  console.log("userData from favourites ", userData)
  console.log("firebaseUserInfo from favourites ", firebaseUserInfo)
  return (
    <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
      <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
        <SearchBar />
        <div className="grid-container ">
          {/* {
            firebaseUserInfo?.favourites.map((product) => (<Product name={product.name} price={product.price} id={product.id} />))
          } */}
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
      <Nav />
    </div>
  )
}
