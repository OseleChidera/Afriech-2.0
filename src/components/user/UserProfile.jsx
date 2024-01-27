import React from 'react'
import Image from 'next/image'
import arrow from '../../../public/icons/arrow-white-right.svg'
import p1 from '../../../public/images/photo1.jpeg'

export default function UserProfile() {
  return (
     
      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#695acde4] text-white p-2 sticky top-0 mb-4">
              <div className="w-fit  border border-black ">
                  <Image src={arrow} width={20} className='rotate-180' />
              </div>
              <div className="user-info flex-1 flex items-center justify-between  border border-black">
                  <div className="flex gap-2 border border-black items-center">
                      <div className=" rounded-full overflow-hidden  border border-black w-[70px] h-[70px]">
                          <Image src={p1} width={70} height={70} className='w  ' />
                      </div>
                      <div className="">
                          <h1 className='text-lg font-semibold capitalize'>osele chidera</h1>
                          <h1 className='text-xs underline underline-offset-1 font-semibold '>oselechidera560@gmail.com</h1>
                      </div>
                  </div>
                  <div className="w-fit  border border-black">
                      <Image src={arrow} width={20} className='' />
                  </div>
              </div>

          </div>
  )
}
