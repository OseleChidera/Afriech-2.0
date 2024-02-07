'use client'
import React , {useEffect, useState}from 'react'
import Nav from '@/components/Nav'
import UserDetail from '@/components/user/UserDetail'
import { useSelector, useDispatch } from "react-redux";
import UserProfile from '@/components/user/UserProfile';
import SyncLoader from "react-spinners/ClipLoader";
import UserInfoModal from '@/components/user/UserInfoModal';
// ... (import statements)
import Modal from '@/components/user/Modal';

export default function Page() {
  const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.firebaseUserInfo);
    const loading = useSelector((state) => state.user.loading);
    const authCallbackUser = useSelector((state) => state.user.authCallbackUser);

    const userInfoArray = [
        {   
            index: 0,
            title: "Change your profile picture",
            action: 'changePfp',
            actionToPerfom: true,
        },
        {
            index: 1,
            title: "Change your NinSlip picture",
            action: 'changeNinSlip',
            actionToPerfom: userInfo?.reuploadNin
        },
        ,
        {
            index: 2,
            title: "Send email verification link",
            action: 'verifyEmail',
            actionToPerfom: !authCallbackUser?.emailVerified
        },
        ,
        {
            index: 3,
            title: "Change your account email",
            action: 'changeEmail',
            actionToPerfom: authCallbackUser?.emailVerified
        },
      
    ]


    // console.log(authCallbackUser)
    // console.table(userInfoArray)
    const showModal = useSelector((state) => state.user.showModal);
  return (
    <>
          {showModal && <Modal />}
          <div className="w-full relative h-fit border border-red-600 overflow-y-auto">
              <div className="p-[20px] flex flex-col gap-4">
                  <UserProfile />
                  <div className="flex flex-col gap-4 items-center border border-red-600 overflow-y-auto hide-scrollbar h-[55vh]">
                      {userInfo && ([
                          {
                              name: "fullname",
                              value: userInfo?.fullname,
                          },
                          {
                              name: "address",
                              value: userInfo?.address,
                          },
                          {
                              name: "phone",
                              value: userInfo?.phone,
                          },
                          {
                              name: "bvnnumber",
                              value: userInfo?.bvnnumber,
                          },
                          {
                              name: "ninnumber",
                              value: userInfo?.ninnumber,
                          },
                      ].map((userDetail, index) => (
                          <UserDetail name={userDetail.name} value={userDetail.value} index={index} />
                      )))}

                      {
                          userInfoArray.map((info, index) => {
                              if (info.actionToPerfom == false) {
                                  return;
                              }

                              return <UserInfoModal index={info.index} title={info.title} action={info.action} />
                          })
                      }
                  </div>
              </div>
              <Nav />
          </div>
    </>
  );
}

