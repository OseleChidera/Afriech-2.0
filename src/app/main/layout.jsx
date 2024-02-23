'use client'
import Location from '@/components/Location'
import React, { useEffect, useState }from 'react'
import { setupAuthObserver } from "../../../firebaseAuth";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentfirebaseUserInfo, setUserId, setLoading, setAuthCallbackUser, setProductsData, setPopularProductsData, setuserCartData, setuserFavouritesData, setuserFinancingData, setData } from '../../redux/user'
import {database} from '../../../firebaseConfig';
import { collection, getDocs, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";

import { getUserData, fetchProductsData, getUserFinancingData,  } from '@/utils/helperFunctions';
import Nav from '@/components/Nav';
import { useRouter, usePathname } from "next/navigation";


const layout = ({children}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [userData, setUserData] = useState(null);
  const loading = useSelector((state) => state.user.loading);
  const pathName = usePathname();
const [fetchedData , setFetchedData] = useState({
  userData: null,
  productsArray: null,
  popularProductsArray: null,
  favouritesArray: null,
  cartArray: null , 
  paymentArray: null,
  paymentCompleteArray: null
})

  

  // dispatch(setProductsData(fetchedData.productsArray));
  // dispatch(setPopularProductsData(fetchedData.popularProductsArray));
  dispatch(setCurrentfirebaseUserInfo(fetchedData.userData));
  // dispatch(setuserFavouritesData(fetchedData.favouritesArray));
  // dispatch(setuserCartData(fetchedData.cartArray));
  // dispatch(setuserFinancingData(fetchedData.paymentArray));



  dispatch(setData(fetchedData))
  useEffect(() => {
    fetchProductsData(setFetchedData, 'Products', 'productsArray')
    fetchProductsData(setFetchedData, 'PopularProducts', 'popularProductsArray')
    const authCallback = (user) => {
      if (user) {
        getUserData(user.uid, setUserData, setFetchedData)
        
        
        dispatch(setUserId(`${user.uid}`))
        dispatch(setAuthCallbackUser(user))
        console.log('User is authenticated in mMMmmMM', user.uid);
      } else {
        console.log('User is not authenticated.mMMmmMM');
      }
    };

    setupAuthObserver(authCallback);

    return () => {
      // Clean up the observer when the component is unmounted
    };
  }, [pathName]);


  
  return (
    <div className='w-full min-h-screen max-h-fit bg-[#ffffff] relative shadow-2xl'>
        <Location/>
        {children}
    </div>
  )
}

export default layout