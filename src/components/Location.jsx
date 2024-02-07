'use client'
import React, {useState} from 'react'
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

    const [locationSearchIsShown, setLocationSearchIsShown] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [userData , setUserData] = useState(null)
  const userID = useSelector((state) => state.user.userID);
    function showLocationSearchBar (){
        setLocationSearchIsShown(!locationSearchIsShown)
        setShowCart(false)
        // console.log(locationSearchIsShown)
    }
    const [location , setLocation] = useState('Lagos') 
    const textContainer = document.querySelector('#main-location');

    function changeLocation(e){
        const newLocation = e.target.innerText
        setLocation(newLocation)
        setLocationSearchIsShown(!locationSearchIsShown)
    }

    function showCartFn(fetchCartItems) {
        setShowCart(!showCart)
        setLocationSearchIsShown(false)
        console.log(showCart)
      getUserData(userID, setUserData)
      console.log("cartData ", userData)
    }



  // console.log("userData yyyyyyyyyyyyyyyyyyyyy ", userData)

  return (
    <div className='flex items-center justify-between border border-black w-full p-2 sticky z-10 top-0 bg-[#695acd] text-white'>
        <div className="location flex items-center gap-1 relative border border-black ">
            <span className='capitalize'>lagos</span>
            <button onClick={()=>showLocationSearchBar()} className='relative'>
                  <Image src={arrow} width={20} className={`${locationSearchIsShown ? 'rotate' : 'return'}`}/>
            </button>
              <ChangeLocation locationSearchIsShown={locationSearchIsShown} changeLocation={changeLocation}/>
        </div>
          <div id='main-location' className='main-location underline-offset-2 underline'>
             {location}
          </div>
      <Cart showCartFn={showCartFn} showCart={showCart} userData={userData}/>

    </div>
  )
}

export default Location