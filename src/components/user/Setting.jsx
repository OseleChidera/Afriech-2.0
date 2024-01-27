'use client'
import React from 'react'
import Image from 'next/image'
import arrow from '../../../public/icons/arrow-white-right.svg'
import p1 from '../../../public/images/photo1.jpeg'
import { redirectToNested } from '@/utils/ServerFn'

export default function Setting({ icon, title, description, action }) {
   function showModal(doc) {
        console.log('showModal ', doc)
    }

    function settingAction(action) {
        action == 'redirectTo' ? redirectToNested(`/user/${title}`) : showModal(title)
    }
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#695acde4] text-white p-2" onClick={() => settingAction(action)}>
            <div className="user-info flex-1 flex items-center justify-between  border border-black">
                <div className="flex gap-2 border border-black items-center">
                    <div className="flex items-center justify-center rounded-full  border border-black w-[35px] h-[35px]">
                        <Image src={icon} width={35} height={35} className='w  ' />
                    </div>
                    <div className="">
                        <h1 className='text-lg font-semibold capitalize'>{title}</h1>
                        <h1 className='text-xs font-semibold '>{description}</h1>
                    </div>
                </div>
                <div className="w-fit  border border-black">
                    <Image src={arrow} width={20} className='' />
                </div>
            </div>

        </div>
    )
}
