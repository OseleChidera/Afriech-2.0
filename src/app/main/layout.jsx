'use client'
import Location from '@/components/Location'
import React, { useEffect, useState }from 'react'
import { setupAuthObserver } from "../../../firebaseAuth";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentfirebaseUserInfo, setUserId, setLoading, setAuthCallbackUser, setProductsData, setPopularProductsData, setuserCartData, setuserFavouritesData, setuserFinancingData } from '../../redux/user'
import {database} from '../../../firebaseConfig';
import { collection, getDocs, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";

import { getUserData, fetchPopularProductsData, getUserFinancingData } from '@/utils/helperFunctions';




const layout = ({children}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [financingData, setFinancingData] = useState(null);
  const [popularProducts, setPopularProducts] = useState([])
  const loading = useSelector((state) => state.user.loading);

  
  async function fetchMarketplaceData() {
    try {
      // Reference to your Firestore collection
      const dataCollection = collection(database, 'Products');

      // Using onSnapshot to listen for real-time updates
      const unsubscribe = onSnapshot(dataCollection, (querySnapshot) => {
        // This callback will be triggered whenever the data in the collection changes

        // Extract data from each document in the collection
        const dataArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Include the ID in the object
          return { id: doc.id, ...data };
        });

        // Dispatch the array of data to your Redux store
        dispatch(setProductsData(dataArray));
        // console.table(dataArray)

        // console.log('Array of Document data:', dataArray);
        // Perform any actions with the array of data here
      });

      // Return the unsubscribe function for cleanup
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


 
  dispatch(setPopularProductsData(popularProducts));
  dispatch(setCurrentfirebaseUserInfo(userData));
  dispatch(setuserFavouritesData(favourites));
  dispatch(setuserCartData(cart));
  dispatch(setuserFinancingData(financingData));

  useEffect(() => {
    fetchPopularProductsData(setPopularProducts)
  }, [])

  useEffect(() => {
    // fetchPopularProductsData(setPopularProducts)
    //  console.log(popularProducts)
    
    fetchMarketplaceData()
    const authCallback = (user) => {
      if (user) {
        getUserData(user.uid, setUserData, setCart, setFavourites, setFinancingData)
        dispatch(setUserId(`${user.uid}`))
        dispatch(setAuthCallbackUser(user))
        console.log('User is authenticated in mMMmmMM', user.uid);
      } else {
        // console.log('User is not authenticated.mMMmmMM');
      }
    };


    // console.log("popularProducts OUTSIDE USEEFFECT", popularProducts)
    // Set up the auth observer
    setupAuthObserver(authCallback);

    return () => {
      // Clean up the observer when the component is unmounted
    };
  }, []);

  return (
    <div className='w-full min-h-screen max-h-fit bg-[#ffffff] relative shadow-2xl'>
        <Location/>
        {children}
    </div>
  )
}

export default layout