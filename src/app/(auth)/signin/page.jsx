"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SigninMain from "../../../components/signin/SigninMain.jsx";
import Step2 from "../../../components/multistep form/Step2.jsx";
import Step3 from "../../../components/multistep form/Step3.jsx";
import Step4 from "../../../components/multistep form/Step4.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from '../../../../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { incrementSignin, decrementSignin, incrementSigninByAmmount, setCurrentUserData } from "../../../redux/user.js"
import { redirectTo } from "@/utils/ServerFn";


export default function page ({ user }){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const pageindex = useSelector((state) => state.user.signinIndex);
    const [userid, setUserId] = useState(undefined)
    const localUserID = localStorage.getItem('afriTechUserID')
    const userIdFromLocalStorage = localUserID ? JSON.parse(localUserID) : null;


    const userFormEntries = useSelector((state) => state.user.userFormEntries);
    // const currentUserData = useSelector((state) => state.user.currentUserData);
    const dispatch = useDispatch();
    const [data, setData] = useState(userFormEntries)

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

    //Onsubmit function of the multistep form
    async function SignumMultistepApiReq(newData) {
        const docRef = doc(database, "Users", userIdFromLocalStorage);
        console.log(JSON.stringify(docRef, null, 2))
        if (newData.agreeToTerms) {
            try {
                const [image1Url, image2Url] = await Promise.all([uploadProfilePicture(newData.profilePicture), uploadNinImage(newData.ninSlipPicture)])
                newData.profilePicture = image1Url,
                    newData.ninSlipPicture = image2Url
                updateDoc(docRef, newData)
                toast.success(`User SignUp complete ${userIdFromLocalStorage}`, {onOpen: () => redirectTo("/home")});

            } catch (error) {
                console.log(error.message)
            }


        }
    }


    function handleNextStep(newData, final = false) {
        setData(prev => ({ ...prev, ...newData }))
        if (final) {
            SignumMultistepApiReq(newData)
            return;
        }
        dispatch(incrementSignin(final))
    }

    function handlePrevStep(newData) {
        setData(prev => ({ ...prev, ...newData }))
        dispatch(decrementSignin())
    }

    //upload the images from the form to a storage bucket  and get a urn to access said images
    async function uploadNinImage(image) {
        try {
            const imagePath = `${userIdFromLocalStorage}/ninImage`
            console.log(imagePath)
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.log(error.message)
            toast.error(`ninImage image couldnt upload`);

        }
    }

    async function uploadProfilePicture(image) {
        try {
            const imagePath = `${userIdFromLocalStorage}/profilePicture`
            console.log(imagePath)
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, image);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.log(error.message)
            toast.error(`profilePicture image couldnt upload`);


        }
    }



    return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
            {steps[pageindex]}
        </div>
    )
};








