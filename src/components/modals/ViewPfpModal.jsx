import React from 'react'
import p from '../../../public/images/photo4.jpg'
import Image from 'next/image'
import { setModalToshow ,hideModalDispachFn } from '../../redux/user'
import { useSelector, useDispatch } from "react-redux";

export default function ViewPfpModal() {
    const dispatch = useDispatch()
    
  function closeModal() {
    dispatch(hideModalDispachFn())
    dispatch(setModalToshow(''))
  }
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  return (
    <div className='w-screen h-full bg-[#695acd74] fixed top-0 left-0 pointer-events-auto z-[100] flex justify-center items-center'>
          <div id='modal-img' className="h-fit w-4/5 mx-auto border bg-[rgb(105,90,205)] text-white p-6 rounded-xl flex flex-col items-center gap-3 ">
              <div className="w-[200px] max-h-[200px] border border-black ">
          {firebaseUserInfo?.profilePicture && (<Image src={firebaseUserInfo.profilePicture} className='mx-auto' width={200} height={200} />)}
              </div>
              {/* <div className="flex gap-4"> */}
                  {/* <button className="bg-white text-[#695acd] rounded-xl px-4 py-1 font-semibold">No</button> */}
        <button className="bg-white text-[#695acd] rounded-xl px-4 py-1 font-semibold" onClick={() => closeModal()}>Close</button>
              {/* </div> */}
            </div>
    </div>
  )
}
