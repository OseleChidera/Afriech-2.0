'use client'
import React, {useEffect, useState} from 'react'
import cartIcin from '../../public/icons/shopping-cart-active.svg'
import cartInactive from '../../public/icons/shopping-cart-inactive.svg'
import Image from 'next/image'
import arrow from '../../public/icons/arrow-white.svg'
import { gsap, Power3, TimelineLite } from 'gsap';
import Cart from './cartItem/Cart'
import ChangeLocation from './LoactionIsland/ChangeLocation'
import { useSelector } from 'react-redux'
import { getUserData } from '@/utils/helperFunctions' 



const Location = () => {
    const tl = gsap.timeline();

    // const [locationSearchIsShown, setLocationSearchIsShown] = useState(false)
    const [showCart, setShowCart] = useState(false)
    // const [userData , setUserData] = useState(null)
  const userID = useSelector((state) => state.user.userID);
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const data = useSelector((state) => state.user.data);
    function showLocationSearchBar (){
        setLocationSearchIsShown(!locationSearchIsShown)
        setShowCart(false)
        // console.log(locationSearchIsShown)
    }
  const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState([]);

    function showCartFn(fetchCartItems) {
        setShowCart(!showCart)
        // setLocationSearchIsShown(false)
        console.log(showCart)
      // getUserData(userID, setUserData)
      console.log("cartData ", data.userData.cart)
    }


useEffect(()=>{
  setArrayWithoutEmptyStrings(data?.userData?.cart?.filter(arrayItem => typeof arrayItem === "object" && arrayItem !== null) || []);
},[])


  // console.log("arrayWithoutEmptyStrings: " + JSON.stringify(arrayWithoutEmptyStrings))
  return (
    <div className='flex items-center justify-between border border-black w-full p-2 py-4 sticky z-10 top-0 bg-[#695acd] text-white'>
        <div className="location flex items-center gap-1 relative ">
        <span className='capitalize underline underline-offset-1'>{data?.userData?.locationOption}</span>
        </div>
          
      <Cart showCartFn={showCartFn} showCart={showCart} userData={data.userData} userIDString={userID}/>
    </div>
  )
}

export default Location