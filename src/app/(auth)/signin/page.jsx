// Import necessary dependencies
"use client"
import React, { useState } from "react";
import { toast } from "react-toastify";
import SigninMain from "../../../components/signin/SigninMain.jsx";
import Step2 from "../../../components/multistep form/Step2.jsx";
import Step3 from "../../../components/multistep form/Step3.jsx";
import Step4 from "../../../components/multistep form/Step4.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from '../../../../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { incrementSignin, decrementSignin } from "../../../redux/user.js"
import { useRouter } from 'next/navigation'

// Define the functional component
export default function Page({ user }) {
    // State variables
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [userid, setUserId] = useState(undefined);

    // Redux state and dispatch
    const pageindex = useSelector((state) => state.user.signinIndex);
    const dispatch = useDispatch();

    // Local storage
    const localUserID = localStorage.getItem('afriTechUserID')
    const userIdFromLocalStorage = localUserID ? JSON.parse(localUserID) : null;

    // Router
    const router = useRouter();

    // Function to redirect
    function redirect(path) {
        router.push(path);
    }

    // Fetch form data from Redux state
    const userFormEntries = useSelector((state) => state.user.userFormEntries);
    const [data, setData] = useState(userFormEntries);

    // Steps for the multi-step form
    const steps = [
        <SigninMain
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            user={user}
        />,
        <Step2 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step3 data={data} next={handleNextStep} prev={handlePrevStep} />,
        <Step4 data={data} next={handleNextStep} prev={handlePrevStep} />
    ];

    // Function to handle form submission
    async function SignumMultistepApiReq(newData) {
        const docRef = doc(database, "Users", userIdFromLocalStorage);
        if (newData.agreeToTerms) {
            try {
                // Upload images
                const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.ninSlipPicture)]);
                newData.profilePicture = image1Url;
                newData.ninSlipPicture = image2Url;
                newData.cart = [""]
                newData.favourites = [""]
                newData.financing = [""]
                newData.reviews = [""]
                newData.paymentCompleted = [""]
                // Update Firestore document
                updateDoc(docRef, newData);
                toast.success(`User SignUp complete ${userIdFromLocalStorage}`, {autoClose: 500  , onOpen: () => redirect("/main/home") });
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    // Function to handle next step
    function handleNextStep(newData, final = false) {
        setData(prev => ({ ...prev, ...newData }));
        if (final) {
            SignumMultistepApiReq(newData);
            return;
        }
        dispatch(incrementSignin(final));
    }

    // Function to handle previous step
    function handlePrevStep(newData) {
        setData(prev => ({ ...prev, ...newData }));
        dispatch(decrementSignin());
    }

    // Function to upload NIN image
    async function uploadNinImage(image) {
        try {
            const imagePath = `${userIdFromLocalStorage}/ninImage`
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.log(error.message);
            toast.error(`ninImage image couldn't upload`);
        }
    }

    // Function to upload profile picture
    async function uploadProfilePicture(image) {
        try {
            const imagePath = `${userIdFromLocalStorage}/profilePicture`
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.log(error.message);
            toast.error(`profilePicture image couldn't upload`);
        }
    }

    // Render component
    return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center  bg-[#695acd]  border">
            {steps[pageindex]}
        </div>
    );
};
