'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDocn } from "firebase/firestore";
import { database, storage } from '../../../firebaseConfig';
import { toast } from "react-toastify";
import { showModalDispachFn, setModalToshow } from '../../redux/user'
import { auth } from '../../../firebaseAuth'
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function UserInfoModal({ title, action, index }) {
    // const [isEditing, setIsEditing] = useState(false);
    const authCallbackUser = useSelector((state) => state.user.authCallbackUser);
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch();


    function showModal(modalToShow) {
        console.log("changePfp: ",modalToShow)
        dispatch(showModalDispachFn())
        dispatch(setModalToshow(modalToShow))
    } 

    // function resendUserVerificationEmail(authCallbackUser) {
    //     if (authCallbackUser) {
    //         // Send the verification email
    //         sendEmailVerification(authCallbackUser)
    //             .then(() => {
    //                 // Email sent successfully
    //                 console.log("Verification email sent successfully!");
    //                 toast.success(`Verification email sent successfully!`);
    //             })
    //             .catch((error) => {
    //                 // Handle errors
    //                 console.error("Error sending verification email:", error);
    //             });
    //     } else {
    //         // User is not signed in
    //         console.error("User is not signed in.");
    //     }
    // }
    const sendVerificationEmail = () => {
        const user = auth.currentUser;

        if (authCallbackUser) {
            authCallbackUser.sendEmailVerification()
                .then(() => {
                    console.log('Email verification sent successfully.');
                })
                .catch((error) => {
                    console.error('Error sending email verification:', error.message);
                });
        } else {
            console.error('No user signed in.');
        }
    };


    function resendUserVerificationEmail(user) {
        if (user) {
            // Send the verification email
            sendEmailVerification(user)
                .then(() => {
                    // Email sent successfully
                    console.log("Verification email sent successfully!");
                    toast.success(`Verification email sent successfully!`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Error sending verification email:", error);
                });
        } else {
            // User is not signed in
            console.error("User is not signed in.");
        }
    }
    return (
      <div
        className="flex justify-between items-center w-full p-2 rounded-lg  bg-[#695acd]"
        key={index}
        onClick={() =>
          action == "verifyEmail"
            ? resendUserVerificationEmail(authCallbackUser)
            : showModal(action)
        }
      >
        <div id="left" className="flex flex-col  w-full ">
          <h5 className="text-bold capitalize text-white text-base font-semibold">
            {title}
          </h5>
        </div>
      </div>
    );
}
