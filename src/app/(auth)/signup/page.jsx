'use client'
import React, { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage } from '../../../../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Step1 from "../../../components/multistep form/Step1.jsx";
import Step2 from "../../../components/multistep form/Step2.jsx";
import Step3 from "../../../components/multistep form/Step3.jsx";
import Step4 from "../../../components/multistep form/Step4.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, updateUserFormEntries, fetchDataByUserId, userData, setUserData, incrementAnimationCounter, decrementAnimationCounter } from '../../../redux/user'
import { useRouter } from 'next/navigation'

export default function Multistep() {
  // Redux state management
  const pageindex = useSelector((state) => state.user.signupIndex);
  const userFormEntries = useSelector((state) => state.user.userFormEntries);
  const userIdFromLocalStorage = localStorage.getItem('afriTechUserID') ? JSON.parse(localStorage.getItem('afriTechUserID')) : null;
  const userDataVariable = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  // Local state
  const [data, setData] = useState(userFormEntries);
  const [animationCounter, setAnimationCounter] = useState(0);

  // Function to upload NIN image to Firebase storage
  async function uploadNinImage(image) {
    // Construct the image path
    const imagePath = `${userIdFromLocalStorage}/ninImage`;
    try {
      // Upload image to Firebase storage
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      // Return the download URL
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log(error.message)
      toast.error('ninImage image couldnt upload')
    }
  }

  // Function to upload profile picture to Firebase storage
  async function uploadProfilePicture(image) {
    // Construct the image path
    const imagePath = `${userIdFromLocalStorage}/profilePicture`;
    try {
      // Upload image to Firebase storage
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, image);
      // Return the download URL
      return getDownloadURL(storageRef);
    } catch (error) {
      console.log(error.message)
      toast.error('profilePicture image couldnt upload')
    }
  }

  // Function to redirect to a different page
  const router = useRouter()
  function redirect(path) {
    router.push(path);
  }

  // Array of steps for the multi-step form
  const steps = [
    <Step1 data={data} next={handleNextStep} setData={setData} />,
    <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
    <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
    <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />
  ];

  // Function to create a new firestore document for the user
  async function ApiReq(newData) {
    const docRef = doc(database, "Users", `${userIdFromLocalStorage}`);
    if (newData.agreeToTerms) {
      try {
        const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.ninSlipPicture)]);
        newData.profilePicture = image1Url;
        newData.ninSlipPicture = image2Url;
        delete newData.confirm_password;
        delete newData.password;
        newData.dateOfBirth = newData.dateOfBirth.getTime();
        dispatch(updateUserFormEntries(JSON.stringify(newData, null, 2)));

        await updateDoc(docRef, newData);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setUserData(docSnap.data()));
          toast.success('User SignUp complete');
          redirect("/signin");
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  // Function to handle moving to the next step in the form
  function handleNextStep(newData, final = false) {
    setData(prev => ({ ...prev, ...newData }));
    if (final) {
      ApiReq(newData);
      return;
    }
    dispatch(incrementAnimationCounter());
    dispatch(incrementSignup(final));
  }

  // Function to handle moving to the previous step in the form
  function handlePrevStep(newData) {
    setData(prev => ({ ...prev, ...newData }));
    dispatch(decrementAnimationCounter());
    dispatch(decrementSignup());
  }

  return (
    <div className="flex min-h-screen max-h-fit max-w-full flex-col items-center justify-center bg-[#695acd] border">
      {steps[pageindex]}
    </div>
  );
};
