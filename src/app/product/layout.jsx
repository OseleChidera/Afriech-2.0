'use client'
import Location from '../../components/Location'
import React, { useEffect, useState } from 'react'
import { setupAuthObserver } from "../../../firebaseAuth";
import { useSelector, useDispatch } from "react-redux";
import { setUserId, setAuthCallbackUser } from '../../redux/user'
import Nav from '@/components/Nav';


const layout = ({ children }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(null);
    const [userData, setUserData] = useState(null);
    const loading = useSelector((state) => state.user.loading);


    useEffect(() => {
        const authCallback = (user) => {
            if (user) {
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
            <Location />
            {children}
        </div>
    )
}

export default layout