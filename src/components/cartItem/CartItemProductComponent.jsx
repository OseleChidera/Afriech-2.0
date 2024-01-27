'use client'
import Image from "next/image";
import React, { useState } from "react";
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg";
import addIcon from '../../../public/icons/add.svg'
import favourite from '../../../public/icons/favourite.svg'
import trashIcon from '../../../public/icons/trashIcon.svg'
import { usePathname } from "next/navigation";

const CartItemProductComponent = () => {
    const pathName = usePathname();
    // const isPathNameActive = pathName.includes(`/main/${buttonName}`) 
    const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/main/payment`))
  return (
      <div className="product  relative rounded-lg flex flex-1 gap-2 bg-white overflow-hidden p-1">
          <div className=" w-fit  h-fit rounded-xl  shadow-2xl bg-whie overflow-hidden">
              <Image src={phone} className="aspect-auto object-cover " width={70} />
          </div>
          <div className="info p-2 text-black">
              <h2 className="text-xs font-semibold">Samsung note 9</h2>
              <h3 className="text-xs ">$1000</h3>
          </div>
          {!isPathNameActive ?
              (<div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]">
                  <Image src={addIcon} width={20} />
              </div>)
              : (<div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]">
                  <Image src={trashIcon} width={20} />
              </div>)}
        
      </div>
  )
}

export default CartItemProductComponent