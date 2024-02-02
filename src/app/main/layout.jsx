'use client'
import Location from '@/components/Location'
import React, { useEffect, useState }from 'react'
import { setupAuthObserver } from "../../../firebaseAuth";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentfirebaseUserInfo, setUserId, setLoading, setAuthCallbackUser, seProductsData } from '../../redux/user'
import {database} from '../../../firebaseConfig';
import { collection, getDocs, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";
const layout = ({children}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [userData, setUserData] = useState(null);
  const loading = useSelector((state) => state.user.loading);

  async function getUserData(userID) {
    console.log("userID: ", userID)

    dispatch(setLoading(true))
    console.log('loading true', loading)

    try {
      const userDocRef = doc(database, 'Users', userID);

      // Fetch initial data
      const initialSnapshot = await getDoc(userDocRef);
      const initialUserData = initialSnapshot.data();

      // Set initial data
      setUserData(initialUserData ? initialUserData.profilePicture || "" : "");
      dispatch(setCurrentfirebaseUserInfo(userData))
      // setTimeout(() => { dispatch(setLoading(false)) }, 3000)}
    setTimeout(() => { dispatch(setLoading(false)) }, 2000)
      console.log('loading false', loading)

      // Set up real-time listener for changes
      const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        const fetchedUserData = snapshot.data();

        console.log("user id from dynamic: ", fetchedUserData)
        setUserData(fetchedUserData);
        dispatch(setCurrentfirebaseUserInfo(fetchedUserData))
      });

      // Cleanup the listener when the component unmounts or as needed
      return () => unsubscribe();
    } catch (error) {
      console.log('Error fetching data:', error, error.code, error.message);
    }
  }
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
        dispatch(seProductsData(dataArray));

        console.log('Array of Document data:', dataArray);
        // Perform any actions with the array of data here
      });

      // Return the unsubscribe function for cleanup
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchMarketplaceData()
    const authCallback = (user) => {
      if (user) {
        getUserData(user.uid)
        dispatch(setUserId(`${user.uid}`))
        dispatch(setAuthCallbackUser(user))
        console.log('User is authenticated in mMMmmMM', user);
      } else {
        console.log('User is not authenticated.mMMmmMM');
      }
    };

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