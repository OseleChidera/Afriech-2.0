'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { setModalToshow, hideModalDispachFn } from '../../redux/user'
import { useSelector, useDispatch } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage, auth, firestore } from '../../../firebaseConfig';
import { toast } from 'react-toastify';
import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";
import { useRouter } from 'next/navigation';


export default function ChangeEmailModal() {
    const [newEmail, setNewEmail] = useState(null);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false);
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch()
    const authCallbackUser = useSelector((state) => state.user.authCallbackUser);

    const router = useRouter()

    function closeModal() {
        dispatch(hideModalDispachFn())
        dispatch(setModalToshow(''))
    }

    async function ChangeEmailFn() {
        console.log(newEmail)
        const userDocRef = doc(database, "Users", `${userID}`);
        const confirmationAlert = window.confirm("Are you really sure you want to logout ?")
        if (confirmationAlert) {
            try {
                // Update the email in Firebase Authentication
                await updateEmail(authCallbackUser, newEmail);
                // Update the email in Firestore
                await updateDoc(userDocRef, { email: newEmail });
                closeModal()
                toast.success('Email updated successfully.');
                await sendEmailVerification(authCallbackUser);
                await auth.signOut();
                localStorage.removeItem('afriTechUserID')
                router.push("/signin");
            } catch (error) {
                console.log(error.code);
                if (error.code == 'auth/requires-recent-login') {
                    await auth.signOut();
                    localStorage.removeItem('afriTechUserID')
                    closeModal()
                    router.push("/signin");
                    toast.error('requires-recent-login');
                }
            }
        }
        else {
            toast.error('logout unsuccessful');
        }

    }

   

    return (
        <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
            <div id='modal-img' className="h-fit w-4/5 max-w-[90%] mx-auto  border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
                <div className="w-[90%] border border-black flex flex-col gap-4">
                    <input
                        type="email"
                        name="Profile-Photo"
                        disabled={!hasPermission}
                        placeholder='Enter your new email address'
                        value={null}
                        onChange={(event) => {
                            setNewEmail(event.target.value);
                        }}
                        className='w-full p-2 px-5 rounded-xl text-black'
                    />
                </div>
                <div className="flex gap-4">
                    <button className="font-bold  bg-white text-[#695acd] rounded-xl  text-base  capitalize px-4 py-[0.55rem]" onClick={() => closeModal()}>Cancel</button>
                    {newEmail && (<button disabled={disableUploadBtn} className=" font-bold  bg-white text-[#695acd] rounded-xl  text-base  capitalize px-4 py-[0.55rem] " onClick={() => ChangeEmailFn()}>Change Email</button>)}

                </div>
            </div>
        </div>
    )
}
