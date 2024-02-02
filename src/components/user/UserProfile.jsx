'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import arrow from '../../../public/icons/arrow-white-right.svg'
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setModalToshow, hideModalDispachFn, showModalDispachFn } from '@/redux/user'
import Link from 'next/link';



export default function UserProfile() {
    const pathName = usePathname();
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const authCallbackUser = useSelector((state) => state.user.authCallbackUser);
    // const isPathNameActive = pathName.includes(`/main/${buttonName}`) 
    const [isUserPathNameActive, setIsUserPathNameActive] = useState(pathName.includes(`/main/user`))

    const dispatch = useDispatch();

    function showModal(title) {
        dispatch(showModalDispachFn())
        dispatch(setModalToshow(title))
    } 

    useEffect(() => {
        console.log("firebaseUserInfo ", firebaseUserInfo)
    }, []);
  return (
     
      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#695acde4] text-white p-2 sticky top-0 mb-4">
          <div className="user-info flex-1 flex items-center justify-between  border border-black" >
                  <div className="flex gap-2  items-center">
                  <div className=" rounded-full overflow-hidden  border border-black w-[70px] h-[70px]" onClick={() => showModal('viewePfp')}>
                      {firebaseUserInfo?.profilePicture && (<Image src={firebaseUserInfo?.profilePicture} width={70} height={70} className='w  ' />)}
                      </div>
                      <div className="">
                      <h1 className='text-lg font-semibold capitalize'>{firebaseUserInfo?.fullname}</h1>
                      <h1 className='text-xs underline underline-offset-1 font-semibold '>{firebaseUserInfo?.email}</h1>
                      {authCallbackUser?.emailVerified ? (<span className='text-xs underline underline-offset-2  '>Verified</span>) : (<span className='text-xs underline underline-offset-2 text-white '>Unverified</span>)}
                      </div>
                  </div>
              {/* <div className="w-fit  border border-black" onClick={() => showModal('changePfp')}> */}
              <Link href={`/main/user/user-info`}>
                    <div className="w-fit  border border-black" >
                        <Image src={arrow} width={20} className='' />
                    </div>
                  </Link>
              </div>

          </div>
  )
}
